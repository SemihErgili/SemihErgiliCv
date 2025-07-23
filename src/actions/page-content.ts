'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { 
  saveAboutContent, 
  saveExperienceContent,
  saveProjectsContent,
  saveSkillsContent,
  saveContactContent
} from '@/lib/content-manager';

// About Page Action
const AboutContentSchema = z.object({
  name: z.string().min(1, 'İsim boş olamaz.'),
  email: z.string().email('Geçersiz e-posta adresi.'),
  location: z.string().min(1, 'Konum boş olamaz.'),
  freelance: z.string().min(1, 'Freelance durumu boş olamaz.'),
  bio: z.string().min(10, 'Biyografi en az 10 karakter olmalıdır.'),
  journey: z.string().min(10, 'Yolculuk hikayesi en az 10 karakter olmalıdır.'),
});

export async function updateAboutContent(prevState: any, formData: FormData) {
  const validatedFields = AboutContentSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    location: formData.get('location'),
    freelance: formData.get('freelance'),
    bio: formData.get('bio'),
    journey: formData.get('journey'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Lütfen formdaki hataları düzeltin.',
    };
  }
  
  try {
    await saveAboutContent(validatedFields.data);
  } catch (error) {
     return { message: 'Veritabanı hatası: İçerik kaydedilemedi.', errors: {} };
  }
  
  revalidatePath('/about');
  revalidatePath('/admin/about');
  
  return { message: 'Hakkımda sayfası başarıyla güncellendi!', errors: {} };
}

// Experience Page Action
const ExperienceItemSchema = z.object({
  id: z.number(),
  title: z.string().min(1, 'Başlık boş olamaz.'),
  company: z.string().min(1, 'Şirket adı boş olamaz.'),
  date: z.string().min(1, 'Tarih boş olamaz.'),
  description: z.string().min(1, 'Açıklama boş olamaz.'),
  icon: z.string().min(1, 'İkon adı boş olamaz.'),
});

const ExperienceContentSchema = z.array(ExperienceItemSchema);

export async function updateExperienceContent(prevState: any, formData: FormData) {
  const experiencesData = formData.get('experiences');
  if (!experiencesData || typeof experiencesData !== 'string') {
    return { message: 'Geçersiz veri.', errors: { form: ['Deneyim verisi bulunamadı.'] } };
  }

  let experiences;
  try {
    experiences = JSON.parse(experiencesData);
  } catch {
    return { message: 'Geçersiz veri formatı.', errors: { form: ['Deneyim verisi hatalı formatta.'] } };
  }

  const validatedFields = ExperienceContentSchema.safeParse(experiences);

  if (!validatedFields.success) {
    return {
      errors: { form: ['Lütfen tüm alanları doldurun.'] },
      message: 'Lütfen formdaki hataları düzeltin.',
    };
  }

  try {
    await saveExperienceContent(validatedFields.data);
  } catch (error) {
     return { message: 'Veritabanı hatası: Deneyimler kaydedilemedi.', errors: {} };
  }

  revalidatePath('/experience');
  revalidatePath('/admin/experience');

  return { message: 'Deneyim sayfası başarıyla güncellendi!', errors: {} };
}

// Projects Page Action
const ProjectsContentSchema = z.object({
  githubUsername: z.string().min(1, 'GitHub kullanıcı adı boş olamaz.'),
});

export async function updateProjectsContent(prevState: any, formData: FormData) {
  const validatedFields = ProjectsContentSchema.safeParse({
    githubUsername: formData.get('githubUsername'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Lütfen formdaki hataları düzeltin.',
    };
  }
  
  try {
    await saveProjectsContent(validatedFields.data);
  } catch (error) {
     return { message: 'Veritabanı hatası: İçerik kaydedilemedi.', errors: {} };
  }
  
  revalidatePath('/projects');
  revalidatePath('/admin/projects');
  
  return { message: 'Projeler sayfası başarıyla güncellendi!', errors: {} };
}

// Skills Page Action
const SkillItemSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'İsim boş olamaz.'),
  level: z.coerce.number().min(0).max(100, 'Seviye 0-100 arasında olmalı'),
});
const TechItemSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'İsim boş olamaz.'),
  icon: z.string().min(1, 'İkon adı boş olamaz.'),
});

const SkillsContentSchema = z.object({
  technical: z.array(SkillItemSchema),
  professional: z.array(SkillItemSchema),
  technologies: z.array(TechItemSchema),
});

export async function updateSkillsContent(prevState: any, formData: FormData) {
  const skillsData = formData.get('skills');
  if (!skillsData || typeof skillsData !== 'string') {
    return { message: 'Geçersiz veri.', errors: { form: ['Yetenek verisi bulunamadı.'] } };
  }
  
  let skills;
  try {
    skills = JSON.parse(skillsData);
  } catch {
    return { message: 'Geçersiz veri formatı.', errors: { form: ['Yetenek verisi hatalı formatta.'] } };
  }

  const validatedFields = SkillsContentSchema.safeParse(skills);
  
  if (!validatedFields.success) {
    return {
      errors: { form: ['Lütfen tüm alanları doldurun ve seviyelerin 0-100 arasında olduğundan emin olun.'] },
      message: 'Lütfen formdaki hataları düzeltin.',
    };
  }

  try {
    await saveSkillsContent(validatedFields.data);
  } catch (error) {
     return { message: 'Veritabanı hatası: Yetenekler kaydedilemedi.', errors: {} };
  }

  revalidatePath('/skills');
  revalidatePath('/admin/skills');

  return { message: 'Yetenekler sayfası başarıyla güncellendi!', errors: {} };
}

// Contact Page Action
const SocialLinkSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'İsim boş olamaz.'),
  url: z.string().url('Geçerli bir URL girin.'),
  icon: z.string().min(1, 'İkon adı boş olamaz.'),
});

const ContactContentSchema = z.object({
  location: z.string().min(1, 'Konum boş olamaz.'),
  email: z.string().email('Geçersiz e-posta adresi.'),
  phone: z.string().min(1, 'Telefon boş olamaz.'),
  socials: z.array(SocialLinkSchema),
});

export async function updateContactContent(prevState: any, formData: FormData) {
  const socialsData = formData.get('socials');
  
  let socials = [];
  try {
      socials = socialsData ? JSON.parse(socialsData as string) : [];
  } catch {
      return { message: 'Geçersiz sosyal medya verisi formatı.', errors: {} };
  }

  const validatedFields = ContactContentSchema.safeParse({
    location: formData.get('location'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    socials: socials,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Lütfen formdaki hataları düzeltin.',
    };
  }

  try {
    await saveContactContent(validatedFields.data);
  } catch (error) {
     return { message: 'Veritabanı hatası: İletişim bilgileri kaydedilemedi.', errors: {} };
  }
  
  revalidatePath('/contact');
  revalidatePath('/admin/contact');

  return { message: 'İletişim sayfası başarıyla güncellendi!', errors: {} };
}
