'use client';

import { useActionState, useEffect } from 'react';
import { useFormStatus } from 'react-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateProjectsContent } from '@/actions/page-content';
import { useToast } from '@/hooks/use-toast';
import type { ProjectsContent } from '@/lib/content-manager';

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" disabled={pending}>
            {pending ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}
        </Button>
    );
}

export function ProjectsContentForm({ content }: { content: ProjectsContent }) {
    const initialState = { message: null, errors: {} };
    const [state, dispatch] = useActionState(updateProjectsContent, initialState);
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
                 <CardHeader>
                    <CardTitle>GitHub Entegrasyonu</CardTitle>
                    <CardDescription>
                        Projeler bölümü, burada belirtilen GitHub kullanıcısının herkese açık depolarından otomatik olarak çekilir.
                    </CardDescription>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                    <div className="space-y-1.5">
                        <Label htmlFor="githubUsername">GitHub Kullanıcı Adı</Label>
                        <Input id="githubUsername" name="githubUsername" defaultValue={content.githubUsername} />
                        {state?.errors?.githubUsername && <p className="text-sm text-destructive">{state.errors.githubUsername[0]}</p>}
                    </div>
                </CardContent>
                <CardFooter>
                    <SubmitButton />
                </CardFooter>
            </Card>
        </form>
    );
}
