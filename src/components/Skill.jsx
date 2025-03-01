import SkillCard from "./SkillCard";


const Skill = ()=>{
    const skillItem = [
        {
          imgSrc: './src/assets/images/figma.svg',
          label: 'Figma',
          desc: 'Design tool'
        },
        {
          imgSrc: './src/assets/images/css3.svg',
          label: 'CSS',
          desc: 'User Interface'
        },
        {
          imgSrc: './src/assets/images/javascript.svg',
          label: 'JavaScript',
          desc: 'Interaction'
        },
        {
          imgSrc: './src/assets/images/nodejs.svg',
          label: 'NodeJS',
          desc: 'Web Server'
        },
        {
          imgSrc: './src/assets/images/expressjs.svg',
          label: 'ExpressJS',
          desc: 'Node Framework'
        },
        {
          imgSrc: './src/assets/images/mongodb.svg',
          label: 'MongoDB',
          desc: 'Database'
        },
        {
          imgSrc: './src/assets/images/react.svg',
          label: 'React',
          desc: 'Framework'
        },
        {
          imgSrc: './src/assets/images/tailwindcss.svg',
          label: 'TailwindCSS',
          desc: 'User Interface'
        },
      ];

      return (
        <>
          <div className="section">
            <div className="container-2">
                    <div className="mb-8"> 
                        <div className="flex flex-col reveal-up">
                        <h2 className="headline-2">Essential Tools I use</h2>
                        <p className="text-zinc-400 mt-3 max-w-[50ch] reveal-up">
                            Discover the powerful tools and technologies I use to create exceptional, high-performing websites & applications.
                        </p>
                        </div>
                    </div>
                    <div className="grid gap-3 grid-cols-[repeat(auto-fill,_minmax(250px,_1fr))] max-w-6xl mx-auto">
                        {skillItem.map(({ imgSrc, label, desc }, key) => (
                        <SkillCard imgSrc={imgSrc} label={label} desc={desc} key={key} classess="reveal-up" />
                        ))}
                    </div>
            </div>
          </div>
        </>
      );

    
}

export default Skill;