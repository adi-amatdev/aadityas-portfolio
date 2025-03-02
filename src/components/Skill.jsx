import SkillCard from "./SkillCard";
import {skillHeading, skillDesc, skillItem} from '../constants'

const Skill = ()=>{

      return (
        <>
          <div className="section">
            <div className="container-2">
                    <div className="mb-8"> 
                        <div className="flex flex-col reveal-up">
                        <h2 className="headline-2">{skillHeading}</h2>
                        <p className="text-zinc-400 mt-3 max-w-[50ch] reveal-up">
                            {skillDesc}
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