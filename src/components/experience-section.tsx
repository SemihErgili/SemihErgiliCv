import { Briefcase, Laptop2, Code } from "lucide-react";
import type { LucideProps } from "lucide-react";
import { Card } from "./ui/card";
import { getExperienceContent } from "@/lib/content-manager";

const iconMap: { [key: string]: React.FC<LucideProps> } = {
  Briefcase,
  Laptop2,
  Code,
};

function DynamicIcon({ name }: { name: string }) {
  const Icon = iconMap[name];
  if (!Icon) return <Briefcase className="text-white" />; // Fallback icon
  return <Icon className="text-white" />;
}

export async function ExperienceSection() {
  const experiences = await getExperienceContent();

  return (
    <section id="experience" className="bg-slate-50/80 backdrop-blur-md py-20">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Kariyer Yolculuğum</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto"></div>
        </div>
        
        <div className="relative">
          <div className="hidden md:block absolute left-1/2 h-full w-1 bg-gradient-to-b from-blue-400 to-green-400 transform -translate-x-1/2"></div>
          
          <div className="space-y-8 md:space-y-16">
            {experiences.map((exp, index) => (
              <div key={exp.id} className={`relative md:flex justify-between items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                <div className={`md:w-5/12 mb-6 md:mb-0 ${index % 2 === 1 ? 'md:text-left' : 'md:text-right'}`}>
                  <h3 className="text-xl font-semibold text-gray-800">{exp.title}</h3>
                  <p className="text-primary mb-2">{exp.company}</p>
                  <p className="text-gray-500">{exp.date}</p>
                </div>
                <div className="hidden md:block w-2/12 flex justify-center">
                  <div className="h-8 w-8 rounded-full bg-primary border-4 border-white shadow-lg flex items-center justify-center">
                    <DynamicIcon name={exp.icon} />
                  </div>
                </div>
                <div className="md:w-5/12 timeline-item">
                  <Card className="p-6 card-hover">
                    <p className="text-muted-foreground">{exp.description}</p>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
