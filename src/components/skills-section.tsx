"use client";

import { useEffect, useRef, useState } from "react";
import { Card } from "./ui/card";
import { getSkillsContent } from "@/lib/content-manager";

type SkillsContentData = {
  technical: { id: string; name: string; level: number }[];
  professional: { id: string; name: string; level: number }[];
  technologies: { id: string; name: string; icon: string }[];
};

const TechIconMap: Record<string, React.ReactNode> = {
    react: <svg className="h-10 w-10 text-blue-500" fill="currentColor" viewBox="0 0 32 32"><path d="M30.1,14.3a1,1,0,0,0-1-1.1H23.5a1,1,0,0,0-1,1.1,1.1,1.1,0,0,0,1,1H29a1.1,1.1,0,0,0,1.1-1Zm-1,5.2a1,1,0,0,0-1.4.4,10.6,10.6,0,0,1-3.5,4.3,1.1,1.1,0,0,0-.5,1.5,1,1,0,0,0,1.5.5,12.6,12.6,0,0,0,4.2-5.1A1,1,0,0,0,29.1,19.5Zm-8.4-15a1,1,0,0,0-1.1,1V22a1,1,0,1,0,2.1,0V5.5A1.1,1.1,0,0,0,20.7,4.5Zm-9.1,0a1.1,1.1,0,0,0-1.1,1V22a1,1,0,0,0,2.1,0V5.5A1,1,0,0,0,11.6,4.5Zm-9.3,9.8a1,1,0,0,0-1-1.1H1.8a1.1,1.1,0,0,0,0,2.1H7.2A1.1,1.1,0,0,0,8.2,15.4,1,1,0,0,0,7.3,14.3ZM2,19.5a1,1,0,0,0,.7,1,12.6,12.6,0,0,0,4.2,5.1,1,1,0,0,0,1.5-.5,1.1,1.1,0,0,0-.5-1.5A10.6,10.6,0,0,1,4.4,19.9a1,1,0,0,0-1.4-.4Zm23-8.4a1,1,0,0,0-1.4-.4,10.6,10.6,0,0,1-7,0,1,1,0,0,0-1.4.4,1.1,1.1,0,0,0,.4,1.4,12.9,12.9,0,0,0,8.4,0,1.1,1.1,0,0,0,.4-1.4Z"/></svg>,
    nodejs: <svg className="h-10 w-10 text-green-500" fill="currentColor" viewBox="0 0 32 32"><path d="M16.4,2.9,3.1,10.2v14L16.4,31.5,29.7,24.2v-14Zm0,2.8,10.4,6L16.4,18,6,11.7ZM4.8,13.2l11,6.3v10.9L4.8,24.1Zm23.1,0-11,6.3v10.9l11-6.3Z"/></svg>,
    javascript: <svg className="h-10 w-10 text-yellow-500" fill="currentColor" viewBox="0 0 32 32"><path d="M26,3H6A3,3,0,0,0,3,6V26a3,3,0,0,0,3,3H26a3,3,0,0,0,3-3V6A3,3,0,0,0,26,3Zm-4.9,19.7a2.5,2.5,0,0,1-2.1,1.2,3.3,3.3,0,0,1-3.3-3.2,3.2,3.2,0,0,1,3.1-3.3,2.9,2.9,0,0,1,2.5,1.3l-1.6,1a1.2,1.2,0,0,0-1-.6,1.4,1.4,0,0,0-1.5,1.5,1.4,1.4,0,0,0,1.5,1.5,1.2,1.2,0,0,0,1.1-.7ZM15.5,24H13.6V16.7h1.9Z"/></svg>,
    typescript: <svg className="h-10 w-10 text-blue-600" fill="currentColor" viewBox="0 0 32 32"><path d="M26,3H6A3,3,0,0,0,3,6V26a3,3,0,0,0,3,3H26a3,3,0,0,0,3-3V6A3,3,0,0,0,26,3ZM15.4,21.5h-4V16.8h1.2v3.8h2.8Zm6.4,0h-1.2l-2-2.5-2.1,2.5H15.3l3-3.7-3-3.7h1.2l2.1,2.6,2.1-2.6h1.2l-3,3.7Z"/></svg>,
    html5: <svg className="h-10 w-10 text-orange-500" fill="currentColor" viewBox="0 0 32 32"><path d="m4.8,25.2,1.9-21.3H26.1l-1.9,21.3L15.4,28.5Zm3.3-3.1,6.3,2.1,6.3-2.1,1.3-14.5H8.6Zm2.4-8.1h8.5l.3-3.4H10.2Z"/></svg>,
    git: <svg className="h-10 w-10 text-red-500" fill="currentColor" viewBox="0 0 32 32"><path d="M29.5,14.6,18.1,3.2a2.1,2.1,0,0,0-3,0L10.4,8H6.1a2.1,2.1,0,0,0,0,4.2h2.8l3,3V22a2.1,2.1,0,1,0,4.2,0V15.2l3-3h2.8a2.1,2.1,0,1,0,0-4.2h-2.3l2.5-2.5,7.8,7.8-7.8,7.8-1.1-1.1a2.1,2.1,0,1,0-3,3l1.1,1.1,9.3-9.3A2.1,2.1,0,0,0,29.5,14.6ZM8.2,25.1a3.2,3.2,0,1,1-3.2-3.2A3.2,3.2,0,0,1,8.2,25.1Z"/></svg>,
    default: <svg className="h-10 w-10 text-gray-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L8 13v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1h-2v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
};

const TechIcon = ({ iconKey, name }: { iconKey: string; name: string }) => (
  <Card className="p-4 flex flex-col items-center w-24 card-hover">
    {TechIconMap[iconKey] || TechIconMap.default}
    <span className="text-sm font-medium mt-2">{name}</span>
  </Card>
);

const SkillBar = ({ name, level }: { name: string, level: number }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [width, setWidth] = useState(0);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setWidth(level);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.5 }
        );

        const currentRef = ref.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [level]);

    return (
        <div ref={ref}>
            <div className="flex justify-between mb-2">
                <span className="font-medium text-gray-700">{name}</span>
                <span className="text-gray-500">{level}%</span>
            </div>
            <div className="skill-bar">
                <div className="skill-progress" style={{ width: `${width}%` }}></div>
            </div>
        </div>
    );
};

export function SkillsSection() {
    const [content, setContent] = useState<SkillsContentData | null>(null);

    useEffect(() => {
        async function fetchData() {
            const skillsContent = await getSkillsContent();
            setContent(skillsContent);
        }
        fetchData();
    }, []);

    if (!content) {
        return (
            <section id="skills" className="bg-white/80 backdrop-blur-md py-20">
                <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                    <p>Yükleniyor...</p>
                </div>
            </section>
        )
    }

    return (
        <section id="skills" className="bg-white/80 backdrop-blur-md py-20">
            <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">Yeteneklerim</h2>
                    <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto"></div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-6">Teknik Yetenekler</h3>
                        <div className="space-y-6">
                            {content.technical.map(skill => <SkillBar key={skill.id} {...skill} />)}
                        </div>
                    </div>
                    
                    <div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-6">Profesyonel Yetenekler</h3>
                        <div className="space-y-6">
                            {content.professional.map(skill => <SkillBar key={skill.id} {...skill} />)}
                        </div>
                    </div>
                </div>
                
                <div className="mt-16">
                    <h3 className="text-xl font-semibold text-gray-800 mb-6 text-center">Çalıştığım Teknolojiler</h3>
                    <div className="flex flex-wrap justify-center gap-6">
                        {content.technologies.map(tech => (
                            <TechIcon key={tech.id} name={tech.name} iconKey={tech.icon} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
