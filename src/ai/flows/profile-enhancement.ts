'use server';

/**
 * @fileOverview An AI-powered tool to tailor a profile for a specific job description.
 *
 * - tailorProfile - A function that tailors the profile.
 * - TailorProfileInput - The input type for the tailorProfile function.
 * - TailorProfileOutput - The return type for the tailorProfile function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import type { AboutContent, ExperienceContent, SkillsContent } from '@/lib/content-manager';

const TailorProfileInputSchema = z.object({
  jobDescription: z.string().describe('The job description to tailor the profile for.'),
  profileData: z.object({
      about: z.object({
          name: z.string(),
          bio: z.string(),
          journey: z.string(),
      }),
      experience: z.array(z.object({
          title: z.string(),
          company: z.string(),
          description: z.string(),
      })),
      skills: z.object({
          technical: z.array(z.object({ name: z.string(), level: z.number() })),
          professional: z.array(z.object({ name: z.string(), level: z.number() })),
      }),
  }).describe('The entire profile data of the candidate.'),
});
export type TailorProfileInput = z.infer<typeof TailorProfileInputSchema>;

const TailorProfileOutputSchema = z.object({
  tailoredSummary: z
    .string()
    .describe('İş tanımına göre özel olarak hazırlanmış, adayın güçlü yönlerini vurgulayan bir özet.'),
  relevantSkills: z
    .array(z.string())
    .describe('İş tanımıyla en alakalı yeteneklerin bir listesi.'),
  relevantExperience: z
    .array(z.string())
    .describe('İş tanımı için en önemli deneyimlerin başlıkları.'),
});
export type TailorProfileOutput = z.infer<typeof TailorProfileOutputSchema>;

export async function tailorProfile(input: TailorProfileInput): Promise<TailorProfileOutput> {
  return tailorProfileFlow(input);
}

const prompt = ai.definePrompt({
  name: 'tailorProfilePrompt',
  input: {schema: TailorProfileInputSchema},
  output: {schema: TailorProfileOutputSchema},
  prompt: `Sen uzman bir kariyer danışmanısın. Sana sunulan CV bilgileri ve hedef iş tanımına dayanarak, bu profile en uygun şekilde özel bir özet oluştur. 
  Ayrıca, iş tanımı için en alakalı yetenekleri ve deneyimleri CV'den seçerek listele. Cevabın kısa, öz ve etkili olsun.

  **Adayın CV Bilgileri:**
  - **Hakkında:** {{profileData.about.bio}} {{profileData.about.journey}}
  - **Deneyimler:**
  {{#each profileData.experience}}
    - {{this.title}} / {{this.company}}: {{this.description}}
  {{/each}}
  - **Teknik Yetenekler:** {{#each profileData.skills.technical}}{{this.name}}, {{/each}}
  - **Profesyonel Yetenekler:** {{#each profileData.skills.professional}}{{this.name}}, {{/each}}

  **Hedef İş Tanımı:**
  {{{jobDescription}}}
  \n`,
});

const tailorProfileFlow = ai.defineFlow(
  {
    name: 'tailorProfileFlow',
    inputSchema: TailorProfileInputSchema,
    outputSchema: TailorProfileOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
