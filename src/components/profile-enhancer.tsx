'use client';

import { useState, useTransition, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { tailorProfile, type TailorProfileOutput } from '@/ai/flows/profile-enhancement';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from '@/components/ui/sheet';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Sparkles, Lightbulb, FolderKanban, Briefcase } from 'lucide-react';
import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { ScrollArea } from './ui/scroll-area';
import { getAboutContent, getExperienceContent, getSkillsContent } from '@/lib/content-manager';
import type { AboutContent, ExperienceContent, SkillsContent } from '@/lib/content-manager';

const formSchema = z.object({
  jobDescription: z.string().min(50, {
    message: 'İş tanımı en az 50 karakter olmalıdır.',
  }),
});

type ProfileEnhancerProps = {
    children: React.ReactNode;
};

type ProfileData = {
    about: AboutContent;
    experience: ExperienceContent;
    skills: SkillsContent;
}

export function ProfileTailor({ children }: ProfileEnhancerProps) {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const [result, setResult] = useState<TailorProfileOutput | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData | null>(null);

  useEffect(() => {
    async function loadData() {
        const about = await getAboutContent();
        const experience = await getExperienceContent();
        const skills = await getSkillsContent();
        setProfileData({ about, experience, skills });
    }
    if (isOpen) {
      loadData();
    }
  }, [isOpen]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      jobDescription: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!profileData) {
        toast({
            variant: 'destructive',
            title: 'Hata',
            description: 'Profil verileri yüklenemedi. Lütfen tekrar deneyin.',
        });
        return;
    }
    
    startTransition(async () => {
      setResult(null);
      try {
        const tailorInput = {
            jobDescription: values.jobDescription,
            profileData: {
                about: {
                    name: profileData.about.name,
                    bio: profileData.about.bio,
                    journey: profileData.about.journey,
                },
                experience: profileData.experience.map(e => ({ title: e.title, company: e.company, description: e.description })),
                skills: {
                    technical: profileData.skills.technical,
                    professional: profileData.skills.professional,
                }
            }
        };

        const apiResult = await tailorProfile(tailorInput);
        setResult(apiResult);
      } catch (error) {
        console.error('Profil özelleştirme hatası:', error);
        toast({
          variant: 'destructive',
          title: 'Hata',
          description: 'Profiliniz özelleştirilirken bir hata oluştu. Lütfen tekrar deneyin.',
        });
      }
    });
  }
  
  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      form.reset();
      setResult(null);
    }
  }

  return (
    <Sheet open={isOpen} onOpenChange={handleOpenChange}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="w-full sm:max-w-2xl">
        <ScrollArea className="h-full pr-6">
        <SheetHeader className="pr-6 text-left">
          <SheetTitle className="flex items-center gap-2">
            <Sparkles className="text-primary" />
            AI ile CV Özelleştir
          </SheetTitle>
          <SheetDescription>
            Aşağıya bir iş tanımı yapıştırın. Yapay zeka, CV'mi bu pozisyona en uygun şekilde özetleyecek ve ilgili yeteneklerimle deneyimlerimi vurgulayacaktır.
          </SheetDescription>
        </SheetHeader>

        <div className="py-8 pr-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="jobDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>İş Tanımı</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Örn: React ve TypeScript konusunda deneyimli, takım çalışmasına yatkın bir frontend geliştirici arıyoruz..."
                        className="min-h-[150px] resize-y"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isPending || !profileData} className="w-full">
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Özelleştiriliyor...
                  </>
                ) : (
                  <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Özelleştir
                  </>
                )}
              </Button>
            </form>
          </Form>
        </div>

        {(isPending || (isOpen && !profileData)) && (
            <div className="flex justify-center items-center py-8 pr-6">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        )}

        {result && (
          <div className="space-y-6 pr-6 pb-8 text-left">
            <Card>
                <CardHeader>
                    <CardTitle>İşe Özel Özet</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">{result.tailoredSummary}</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Lightbulb className="h-5 w-5"/> İlgili Yetenekler</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                    {result.relevantSkills.map((skill) => (
                        <Badge key={skill} variant="secondary">{skill}</Badge>
                    ))}
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Briefcase className="h-5 w-5"/> Öne Çıkan Deneyimler</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                    {result.relevantExperience.map((project, index) => (
                        <p key={index} className="text-muted-foreground before:content-['•'] before:mr-2">{project}</p>
                    ))}
                </CardContent>
            </Card>
          </div>
        )}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
