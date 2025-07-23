'use server';

import { promises as fs } from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'src', 'data', 'content.json');

// Type Definitions

// About Page Types
export type AboutContent = {
  name: string;
  email: string;
  location: string;
  freelance: string;
  bio: string;
  journey: string;
};

// Experience Page Types
export type ExperienceItem = {
  id: number;
  title: string;
  company: string;
  date: string;
  description: string;
  icon: string;
};
export type ExperienceContent = ExperienceItem[];

// Projects Page Types
export type ProjectsContent = {
    githubUsername: string;
}

// Skills Page Types
export type SkillItem = {
  id: string;
  name: string;
  level: number;
};
export type TechItem = {
  id: string;
  name: string;
  icon: string;
};
export type SkillsContent = {
  technical: SkillItem[];
  professional: SkillItem[];
  technologies: TechItem[];
};

// Contact Page Types
export type SocialLink = {
  id: string;
  name: string;
  url: string;
  icon: string;
};
export type ContactContent = {
  location: string;
  email: string;
  phone: string;
  socials: SocialLink[];
};


// Main Content Structure
type SiteContent = {
  about: AboutContent;
  experience: ExperienceContent;
  projects: ProjectsContent;
  skills: SkillsContent;
  contact: ContactContent;
};

async function readContent(): Promise<SiteContent> {
  try {
    const fileContent = await fs.readFile(dataFilePath, 'utf-8');
    return JSON.parse(fileContent) as SiteContent;
  } catch (error) {
    console.error('Error reading content file:', error);
    // Return a default structure if the file doesn't exist or is invalid
    return {
      about: { name: '', email: '', location: '', freelance: '', bio: '', journey: '' },
      experience: [],
      projects: { githubUsername: '' },
      skills: { technical: [], professional: [], technologies: [] },
      contact: { location: '', email: '', phone: '', socials: [] }
    };
  }
}

async function writeContent(content: SiteContent): Promise<void> {
  try {
    await fs.writeFile(dataFilePath, JSON.stringify(content, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error writing to content file:', error);
    throw new Error('Could not save content.');
  }
}

// Functions for About Page
export async function getAboutContent(): Promise<AboutContent> {
  const content = await readContent();
  return content.about;
}
export async function saveAboutContent(aboutContent: AboutContent): Promise<void> {
  const currentContent = await readContent();
  const newContent: SiteContent = { ...currentContent, about: aboutContent };
  await writeContent(newContent);
}

// Functions for Experience Page
export async function getExperienceContent(): Promise<ExperienceContent> {
    const content = await readContent();
    return content.experience;
}
export async function saveExperienceContent(experienceContent: ExperienceContent): Promise<void> {
    const currentContent = await readContent();
    const newContent: SiteContent = { ...currentContent, experience: experienceContent };
    await writeContent(newContent);
}

// Functions for Projects Page
export async function getProjectsContent(): Promise<ProjectsContent> {
    const content = await readContent();
    return content.projects;
}
export async function saveProjectsContent(projectsContent: ProjectsContent): Promise<void> {
    const currentContent = await readContent();
    const newContent: SiteContent = { ...currentContent, projects: projectsContent };
    await writeContent(newContent);
}

// Functions for Skills Page
export async function getSkillsContent(): Promise<SkillsContent> {
    const content = await readContent();
    return content.skills;
}
export async function saveSkillsContent(skillsContent: SkillsContent): Promise<void> {
    const currentContent = await readContent();
    const newContent: SiteContent = { ...currentContent, skills: skillsContent };
    await writeContent(newContent);
}

// Functions for Contact Page
export async function getContactContent(): Promise<ContactContent> {
    const content = await readContent();
    return content.contact;
}
export async function saveContactContent(contactContent: ContactContent): Promise<void> {
    const currentContent = await readContent();
    const newContent: SiteContent = { ...currentContent, contact: contactContent };
    await writeContent(newContent);
}
