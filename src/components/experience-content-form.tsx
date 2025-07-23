'use client';

import { useState, useActionState, useEffect } from 'react';
import { useFormStatus } from 'react-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { updateExperienceContent } from '@/actions/page-content';
import { useToast } from '@/hooks/use-toast';
import type { ExperienceContent } from '@/lib/content-manager';
import { Trash, PlusCircle } from 'lucide-react';

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" disabled={pending}>
            {pending ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}
        </Button>
    );
}

export function ExperienceContentForm({ content }: { content: ExperienceContent }) {
    const [experiences, setExperiences] = useState(content);
    const { toast } = useToast();

    const handleFormSubmit = async (formData: FormData) => {
        const jsonString = JSON.stringify(experiences);
        formData.set('experiences', jsonString);
        
        const result = await updateExperienceContent(null, formData);
        
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
    
    const handleInputChange = (index: number, field: string, value: string) => {
        const newExperiences = [...experiences];
        (newExperiences[index] as any)[field] = value;
        setExperiences(newExperiences);
    };

    const addExperience = () => {
        setExperiences([
            ...experiences,
            { id: Date.now(), title: '', company: '', date: '', description: '', icon: 'Briefcase' }
        ]);
    };

    const removeExperience = (id: number) => {
        setExperiences(experiences.filter(exp => exp.id !== id));
    };

    return (
        <form action={handleFormSubmit}>
            <Card>
                <CardHeader>
                    <CardTitle>Deneyim Listesi</CardTitle>
                    <CardDescription>
                       Kariyer yolculuğunuzdaki deneyimleri ekleyin, düzenleyin veya silin. İkon isimleri olarak Lucide-React ikonlarını kullanabilirsiniz (örn: Briefcase, Laptop2, Code).
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {experiences.map((exp, index) => (
                        <Card key={exp.id} className="p-4 relative">
                             <Button 
                                type="button" 
                                variant="destructive" 
                                size="icon"
                                className="absolute top-4 right-4 h-8 w-8"
                                onClick={() => removeExperience(exp.id)}>
                                <Trash className="h-4 w-4" />
                            </Button>
                            <div className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <Label htmlFor={`title-${exp.id}`}>Başlık</Label>
                                        <Input id={`title-${exp.id}`} value={exp.title} onChange={(e) => handleInputChange(index, 'title', e.target.value)} />
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label htmlFor={`company-${exp.id}`}>Şirket</Label>
                                        <Input id={`company-${exp.id}`} value={exp.company} onChange={(e) => handleInputChange(index, 'company', e.target.value)} />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <Label htmlFor={`date-${exp.id}`}>Tarih Aralığı</Label>
                                        <Input id={`date-${exp.id}`} value={exp.date} onChange={(e) => handleInputChange(index, 'date', e.target.value)} />
                                    </div>
                                     <div className="space-y-1.5">
                                        <Label htmlFor={`icon-${exp.id}`}>İkon Adı</Label>
                                        <Input id={`icon-${exp.id}`} value={exp.icon} onChange={(e) => handleInputChange(index, 'icon', e.target.value)} />
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <Label htmlFor={`description-${exp.id}`}>Açıklama</Label>
                                    <Textarea id={`description-${exp.id}`} value={exp.description} onChange={(e) => handleInputChange(index, 'description', e.target.value)} />
                                </div>
                            </div>
                        </Card>
                    ))}
                    <Button type="button" variant="outline" onClick={addExperience} className="w-full">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Yeni Deneyim Ekle
                    </Button>
                </CardContent>
                <CardFooter>
                    <SubmitButton />
                </CardFooter>
            </Card>
        </form>
    );
}
