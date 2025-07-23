'use client';

import { useActionState, useEffect } from 'react';
import { useFormStatus } from 'react-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { updateAboutContent } from '@/actions/page-content';
import { useToast } from '@/hooks/use-toast';

type AboutContent = {
  name: string;
  email: string;
  location: string;
  freelance: string;
  bio: string;
  journey: string;
};

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" disabled={pending}>
            {pending ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}
        </Button>
    );
}

export function AboutContentForm({ content }: { content: AboutContent }) {
    const initialState = { message: null, errors: {} };
    const [state, dispatch] = useActionState(updateAboutContent, initialState);
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

    return (
        <form action={dispatch}>
            <Card>
                <CardContent className="p-6 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <Label htmlFor="name">İsim</Label>
                            <Input id="name" name="name" defaultValue={content.name} />
                            {state?.errors?.name && <p className="text-sm text-destructive">{state.errors.name[0]}</p>}
                        </div>
                        <div className="space-y-1.5">
                            <Label htmlFor="email">E-posta</Label>
                            <Input id="email" name="email" type="email" defaultValue={content.email} />
                             {state?.errors?.email && <p className="text-sm text-destructive">{state.errors.email[0]}</p>}
                        </div>
                        <div className="space-y-1.5">
                            <Label htmlFor="location">Konum</Label>
                            <Input id="location" name="location" defaultValue={content.location} />
                             {state?.errors?.location && <p className="text-sm text-destructive">{state.errors.location[0]}</p>}
                        </div>
                        <div className="space-y-1.5">
                            <Label htmlFor="freelance">Freelance Durumu</Label>
                            <Input id="freelance" name="freelance" defaultValue={content.freelance} />
                             {state?.errors?.freelance && <p className="text-sm text-destructive">{state.errors.freelance[0]}</p>}
                        </div>
                    </div>
                    <div className="space-y-1.5">
                        <Label htmlFor="bio">Biyografi (Ben kimim?)</Label>
                        <Textarea id="bio" name="bio" rows={4} defaultValue={content.bio} />
                         {state?.errors?.bio && <p className="text-sm text-destructive">{state.errors.bio[0]}</p>}
                    </div>
                    <div className="space-y-1.5">
                        <Label htmlFor="journey">Yolculuk Hikayesi</Label>
                        <Textarea id="journey" name="journey" rows={4} defaultValue={content.journey} />
                         {state?.errors?.journey && <p className="text-sm text-destructive">{state.errors.journey[0]}</p>}
                    </div>
                </CardContent>
                <CardFooter>
                    <SubmitButton />
                </CardFooter>
            </Card>
        </form>
    );
}
