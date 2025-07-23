'use client';

import { useActionState, useEffect, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateContactContent } from '@/actions/page-content';
import { useToast } from '@/hooks/use-toast';
import type { ContactContent } from '@/lib/content-manager';
import { Trash, PlusCircle } from 'lucide-react';

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" disabled={pending}>
            {pending ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}
        </Button>
    );
}

export function ContactContentForm({ content }: { content: ContactContent }) {
    const [socials, setSocials] = useState(content.socials);
    
    const initialState = { message: null, errors: {} };
    const [state, dispatch] = useActionState(updateContactContent, initialState);
    const { toast } = useToast();

    useEffect(() => {
        if (state?.message && !state.errors) {
            toast({
                title: "Başarılı!",
                description: state.message,
            });
        } else if (state?.message && state.errors && Object.keys(state.errors).length > 0) {
            toast({
                variant: "destructive",
                title: "Hata!",
                description: state.message,
            })
        }
    }, [state, toast]);
    
    const handleFormDispatch = (formData: FormData) => {
        formData.append('socials', JSON.stringify(socials));
        dispatch(formData);
    }
    
    const handleSocialChange = (index: number, field: 'name' | 'url' | 'icon', value: string) => {
        const newSocials = [...socials];
        newSocials[index][field] = value;
        setSocials(newSocials);
    }

    const addSocial = () => {
        setSocials([...socials, { id: Date.now().toString(), name: '', url: '', icon: 'Link' }]);
    }

    const removeSocial = (id: string) => {
        setSocials(socials.filter(s => s.id !== id));
    }

    return (
        <form action={handleFormDispatch}>
            <Card>
                <CardHeader>
                    <CardTitle>Genel İletişim Bilgileri</CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <Label htmlFor="location">Konum</Label>
                            <Input id="location" name="location" defaultValue={content.location} />
                            {state?.errors?.location && <p className="text-sm text-destructive">{state.errors.location[0]}</p>}
                        </div>
                        <div className="space-y-1.5">
                            <Label htmlFor="email">E-posta</Label>
                            <Input id="email" name="email" type="email" defaultValue={content.email} />
                             {state?.errors?.email && <p className="text-sm text-destructive">{state.errors.email[0]}</p>}
                        </div>
                         <div className="space-y-1.5">
                            <Label htmlFor="phone">Telefon</Label>
                            <Input id="phone" name="phone" defaultValue={content.phone} />
                             {state?.errors?.phone && <p className="text-sm text-destructive">{state.errors.phone[0]}</p>}
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className="mt-6">
                <CardHeader>
                    <CardTitle>Sosyal Medya Linkleri</CardTitle>
                     <CardDescription>
                       Lucide-React ikon isimlerini kullanın (örn: Github, Linkedin, Twitter).
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {socials.map((social, index) => (
                        <Card key={social.id} className="p-4 relative">
                            <Button 
                                type="button" 
                                variant="destructive" 
                                size="icon"
                                className="absolute top-4 right-4 h-8 w-8"
                                onClick={() => removeSocial(social.id)}>
                                <Trash className="h-4 w-4" />
                            </Button>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="space-y-1.5">
                                    <Label htmlFor={`social-name-${social.id}`}>Platform Adı</Label>
                                    <Input id={`social-name-${social.id}`} value={social.name} onChange={e => handleSocialChange(index, 'name', e.target.value)} />
                                </div>
                                <div className="space-y-1.5">
                                    <Label htmlFor={`social-url-${social.id}`}>URL</Label>
                                    <Input id={`social-url-${social.id}`} value={social.url} onChange={e => handleSocialChange(index, 'url', e.target.value)} />
                                </div>
                                <div className="space-y-1.5">
                                    <Label htmlFor={`social-icon-${social.id}`}>İkon Adı</Label>
                                    <Input id={`social-icon-${social.id}`} value={social.icon} onChange={e => handleSocialChange(index, 'icon', e.target.value)} />
                                </div>
                            </div>
                        </Card>
                    ))}
                    <Button type="button" variant="outline" onClick={addSocial} className="w-full">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Yeni Sosyal Medya Linki Ekle
                    </Button>
                </CardContent>
                <CardFooter>
                    <SubmitButton />
                </CardFooter>
            </Card>
        </form>
    );
}
