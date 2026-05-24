import { existsSync } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";

const LINKEDIN_PROFILE_URL = "https://www.linkedin.com/in/aaditya-acharya";
const SOURCE_URL = "https://r.jina.ai/http://www.linkedin.com/in/aaditya-acharya";
const OUTPUT_PATH = resolve(process.cwd(), "src/data/workTimeline.json");

const stripMarkdownLinks = (value) =>
  value.replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1").trim();

const slugify = (value) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const parseHeading = (line) => {
  const heading = line.replace(/^###\s+/, "").trim();
  const current = /\(Current\)$/.test(heading);
  const normalizedHeading = heading.replace(/\s+\(Current\)$/, "");

  const companyMatch = normalizedHeading.match(/ at \[([^\]]+)\]\(([^)]+)\)/);
  const company = companyMatch?.[1] ?? "";
  const companyUrl = companyMatch?.[2] ?? "";

  const plainHeading = stripMarkdownLinks(normalizedHeading);
  const [title] = plainHeading.split(/\s+at\s+/);

  return {
    title: title?.trim() ?? plainHeading,
    company: company.trim(),
    companyUrl,
    current,
  };
};

const parseDateLine = (line) => {
  const rawLine = stripMarkdownLinks(line);
  const durationMatch = rawLine.match(/\(([^)]+)\)/);
  const duration = durationMatch ? durationMatch[1].trim() : "";

  const locationSplitter = " in ";
  const locationIndex = rawLine.lastIndexOf(locationSplitter);
  const hasLocation = locationIndex > -1;

  const dateRange = hasLocation
    ? rawLine.slice(0, locationIndex).trim()
    : rawLine.trim();
  const location = hasLocation
    ? rawLine.slice(locationIndex + locationSplitter.length).trim()
    : "";

  return { dateRange, duration, location };
};

const parseExperienceEntries = (markdownText) => {
  const sectionMatch = markdownText.match(
    /## Experience([\s\S]*?)(?:\n##\s+|\n#\s+|$)/
  );

  if (!sectionMatch?.[1]) {
    throw new Error("Could not locate an Experience section in the source.");
  }

  const lines = sectionMatch[1].split("\n");
  const entries = [];

  let currentEntry = null;
  let hasParsedDateLine = false;

  const flush = () => {
    if (!currentEntry) return;
    entries.push({
      ...currentEntry,
      skills: currentEntry.skills ?? [],
      summary: currentEntry.summary ?? "",
      department: currentEntry.department ?? "",
    });
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) continue;

    if (line.startsWith("### ")) {
      flush();
      currentEntry = {
        ...parseHeading(line),
        dateRange: "",
        duration: "",
        location: "",
        skills: [],
        department: "",
        summary: "",
      };
      hasParsedDateLine = false;
      continue;
    }

    if (!currentEntry) continue;

    if (!hasParsedDateLine) {
      const { dateRange, duration, location } = parseDateLine(line);
      currentEntry.dateRange = dateRange;
      currentEntry.duration = duration;
      currentEntry.location = location;
      hasParsedDateLine = true;
      continue;
    }

    if (!currentEntry.skills.length && line.includes("|") && !line.startsWith("Department:")) {
      currentEntry.skills = line
        .split("|")
        .map((skill) => skill.trim())
        .filter(Boolean);
      continue;
    }

    if (line.startsWith("Department:")) {
      currentEntry.department = line.replace("Department:", "").trim();
      continue;
    }

    if (!currentEntry.summary) {
      currentEntry.summary = stripMarkdownLinks(line);
    }
  }

  flush();

  return entries
    .filter((entry) => entry.title && entry.company)
    .map((entry, index) => ({
      id: `${slugify(entry.title)}-${slugify(entry.company)}-${index + 1}`,
      ...entry,
    }));
};

const syncTimeline = async () => {
  const response = await fetch(SOURCE_URL);
  if (!response.ok) {
    throw new Error(`Failed to fetch source. HTTP ${response.status}`);
  }

  const markdown = await response.text();
  const entries = parseExperienceEntries(markdown);

  if (!entries.length) {
    throw new Error("No work timeline entries were parsed from the source.");
  }

  let previousEntries = [];
  if (existsSync(OUTPUT_PATH)) {
    const previousRaw = await readFile(OUTPUT_PATH, "utf8");
    const previous = JSON.parse(previousRaw);
    previousEntries = previous.entries ?? [];
  }

  const output = {
    profileUrl: LINKEDIN_PROFILE_URL,
    sourceUrl: SOURCE_URL,
    fetchedAt: new Date().toISOString(),
    entryCount: entries.length,
    entries,
    previousEntryCount: previousEntries.length,
  };

  await mkdir(dirname(OUTPUT_PATH), { recursive: true });
  await writeFile(OUTPUT_PATH, `${JSON.stringify(output, null, 2)}\n`, "utf8");
  console.log(`Synced ${entries.length} timeline entries to src/data/workTimeline.json`);
};

try {
  await syncTimeline();
} catch (error) {
  const message = error instanceof Error ? error.message : "Unknown sync error.";
  if (existsSync(OUTPUT_PATH)) {
    console.warn(`Timeline sync warning: ${message}`);
    console.warn("Keeping existing src/data/workTimeline.json and continuing.");
    process.exit(0);
  }

  console.error(`Timeline sync failed: ${message}`);
  process.exit(1);
}
