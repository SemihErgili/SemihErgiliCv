'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateSkillsContent } from '@/actions/page-content';
import { useToast } from '@/hooks/use-toast';
import type { SkillsContent, SkillItem, TechItem } from '@/lib/content-manager';
import { Trash, PlusCircle } from 'lucide-react';
import { useFormStatus } from 'react-dom';

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" disabled={pending}>
            {pending ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}
        </Button>
    );
}

export function SkillsContentForm({ content }: { content: SkillsContent }) {
    const [skills, setSkills] = useState(content);
    const { toast } = useToast();

    const handleFormSubmit = async (formData: FormData) => {
        const jsonString = JSON.stringify(skills);
        formData.set('skills', jsonString);
        
        const result = await updateSkillsContent(null, formData);
        
        if (result.message && !result.errors) {
            toast({
                title: "Başarılı!",
                description: result.message,
            });
        } else if (result.message && result.errors && Object.keys(result.errors).length > 0) {
            toast({
                variant: "destructive",
                title: "Hata!",
                description: result.message,
            })
        }
    };
    
    const handleSkillChange = (category: 'technical' | 'professional', index: number, field: 'name' | 'level', value: string | number) => {
        const newSkills = { ...skills };
        (newSkills[category][index] as any)[field] = value;
        setSkills(newSkills);
    };

    const handleTechChange = (index: number, field: 'name' | 'icon', value: string) => {
        const newSkills = { ...skills };
        newSkills.technologies[index][field] = value;
        setSkills(newSkills);
    };

    const addSkill = (category: 'technical' | 'professional') => {
        const newSkill: SkillItem = { id: Date.now().toString(), name: '', level: 80 };
        setSkills({ ...skills, [category]: [...skills[category], newSkill] });
    };

    const removeSkill = (category: 'technical' | 'professional', id: string) => {
        setSkills({ ...skills, [category]: skills[category].filter(skill => skill.id !== id) });
    };

    const addTech = () => {
        const newTech: TechItem = { id: Date.now().toString(), name: '', icon: 'Code' };
        setSkills({ ...skills, technologies: [...skills.technologies, newTech] });
    };

    const removeTech = (id: string) => {
        setSkills({ ...skills, technologies: skills.technologies.filter(tech => tech.id !== id) });
    };

    return (
        <form action={handleFormSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Teknik Yetenekler</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {skills.technical.map((skill, index) => (
                            <div key={skill.id} className="flex items-end gap-2 p-2 border rounded-md relative">
                                <div className="grid grid-cols-2 gap-2 flex-1">
                                    <div className="space-y-1.5">
                                        <Label htmlFor={`tech-name-${skill.id}`}>Yetenek</Label>
                                        <Input id={`tech-name-${skill.id}`} value={skill.name} onChange={(e) => handleSkillChange('technical', index, 'name', e.target.value)} />
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label htmlFor={`tech-level-${skill.id}`}>Seviye (%)</Label>
                                        <Input id={`tech-level-${skill.id}`} type="number" value={skill.level} onChange={(e) => handleSkillChange('technical', index, 'level', parseInt(e.target.value, 10))} />
                                    </div>
                                </div>
                                 <Button type="button" variant="destructive" size="icon" onClick={() => removeSkill('technical', skill.id)} className="h-9 w-9">
                                    <Trash className="h-4 w-4" />
                                </Button>
                            </div>
                        ))}
                         <Button type="button" variant="outline" onClick={() => addSkill('technical')} className="w-full">
                            <PlusCircle className="mr-2 h-4 w-4" /> Yeni Teknik Yetenek Ekle
                        </Button>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Profesyonel Yetenekler</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {skills.professional.map((skill, index) => (
                            <div key={skill.id} className="flex items-end gap-2 p-2 border rounded-md relative">
                                <div className="grid grid-cols-2 gap-2 flex-1">
                                    <div className="space-y-1.5">
                                        <Label htmlFor={`prof-name-${skill.id}`}>Yetenek</Label>
                                        <Input id={`prof-name-${skill.id}`} value={skill.name} onChange={(e) => handleSkillChange('professional', index, 'name', e.target.value)} />
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label htmlFor={`prof-level-${skill.id}`}>Seviye (%)</Label>
                                        <Input id={`prof-level-${skill.id}`} type="number" value={skill.level} onChange={(e) => handleSkillChange('professional', index, 'level', parseInt(e.target.value, 10))} />
                                    </div>
                                </div>
                                <Button type="button" variant="destructive" size="icon" onClick={() => removeSkill('professional', skill.id)} className="h-9 w-9">
                                    <Trash className="h-4 w-4" />
                                </Button>
                            </div>
                        ))}
                         <Button type="button" variant="outline" onClick={() => addSkill('professional')} className="w-full">
                            <PlusCircle className="mr-2 h-4 w-4" /> Yeni Profesyonel Yetenek Ekle
                        </Button>
                    </CardContent>
                </Card>
            </div>
             <Card className="mt-6">
                <CardHeader>
                    <CardTitle>Kullanılan Teknolojiler</CardTitle>
                    <CardDescription>İkon isimleri olarak basit, küçük harfli isimler kullanın (örn: react, nodejs, git). Bu isimler ikonları eşleştirmek için kullanılacaktır.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                     {skills.technologies.map((tech, index) => (
                        <div key={tech.id} className="flex items-end gap-2 p-2 border rounded-md relative">
                            <div className="grid grid-cols-2 gap-2 flex-1">
                                <div className="space-y-1.5">
                                    <Label htmlFor={`tech-item-name-${tech.id}`}>Teknoloji Adı</Label>
                                    <Input id={`tech-item-name-${tech.id}`} value={tech.name} onChange={(e) => handleTechChange(index, 'name', e.target.value)} />
                                </div>
                                <div className="space-y-1.5">
                                    <Label htmlFor={`tech-item-icon-${tech.id}`}>İkon Anahtarı</Label>
                                    <Input id={`tech-item-icon-${tech.id}`} value={tech.icon} onChange={(e) => handleTechChange(index, 'icon', e.target.value)} />
                                </div>
                            </div>
                            <Button type="button" variant="destructive" size="icon" onClick={() => removeTech(tech.id)} className="h-9 w-9">
                                <Trash className="h-4 w-4" />
                            </Button>
                        </div>
                    ))}
                    <Button type="button" variant="outline" onClick={addTech} className="w-full">
                        <PlusCircle className="mr-2 h-4 w-4" /> Yeni Teknoloji Ekle
                    </Button>
                </CardContent>
            </Card>
            <CardFooter className="px-0 pt-6">
                 <SubmitButton />
            </CardFooter>
        </form>
    );
}
