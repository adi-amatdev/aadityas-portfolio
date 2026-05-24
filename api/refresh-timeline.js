const allowedMethods = new Set(["GET", "POST"]);

export default async function handler(request, response) {
  if (!allowedMethods.has(request.method)) {
    response.setHeader("Allow", "GET, POST");
    return response.status(405).json({ error: "Method not allowed." });
  }

  const configuredSecret = globalThis.process?.env?.CRON_SECRET;
  if (configuredSecret) {
    const authorization = request.headers.authorization ?? "";
    if (authorization !== `Bearer ${configuredSecret}`) {
      return response.status(401).json({ error: "Unauthorized request." });
    }
  }

  const deployHookUrl = globalThis.process?.env?.VERCEL_DEPLOY_HOOK_URL;
  if (!deployHookUrl) {
    return response.status(500).json({
      error:
        "Missing VERCEL_DEPLOY_HOOK_URL. Add your Vercel deploy hook URL to environment variables.",
    });
  }

  try {
    const hookResponse = await fetch(deployHookUrl, { method: "POST" });
    if (!hookResponse.ok) {
      const hookBody = await hookResponse.text();
      return response.status(502).json({
        error: "Deploy hook failed.",
        status: hookResponse.status,
        details: hookBody,
      });
    }

    return response.status(202).json({
      ok: true,
      message:
        "Deployment triggered. The timeline will refresh during build via npm run sync:timeline.",
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown deploy hook error.";
    return response.status(500).json({
      error: "Unable to trigger deployment.",
      details: message,
    });
  }
}
