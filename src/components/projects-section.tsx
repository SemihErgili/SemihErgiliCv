import { Button } from "./ui/button";
import { ArrowRight, Github, Star, GitFork } from "lucide-react";
import Link from "next/link";
import { getGithubRepos, type GithubRepo } from "@/services/github";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { getProjectsContent } from "@/lib/content-manager";

function ProjectCard({ repo }: { repo: GithubRepo }) {
    const projectUrl = repo.homepage || repo.html_url;
    return (
        <Card className="flex flex-col h-full card-hover">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                    <Github className="h-5 w-5 text-primary" />
                    <Link href={projectUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">
                        {repo.name}
                    </Link>
                </CardTitle>
                <CardDescription className="flex-grow">
                    {repo.description || "Açıklama mevcut değil."}
                </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow" />
            <CardFooter className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-2">
                    {repo.language && <Badge variant="secondary">{repo.language}</Badge>}
                </div>
                <div className="flex gap-4 text-muted-foreground">
                   <div className="flex items-center gap-1">
                        <Star className="h-4 w-4" />
                        <span>{repo.stargazers_count}</span>
                   </div>
                   <div className="flex items-center gap-1">
                        <GitFork className="h-4 w-4" />
                        <span>{repo.forks_count}</span>
                   </div>
                </div>
            </CardFooter>
        </Card>
    )
}

export async function ProjectsSection() {
    const content = await getProjectsContent();
    const repos = await getGithubRepos(content.githubUsername);

    return (
        <section id="projects" className="bg-slate-50/80 backdrop-blur-md py-20">
            <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">Projelerim</h2>
                    <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto"></div>
                     <p className="text-muted-foreground mt-4">
                        Projelerim aktif olarak GitHub profilimden çekilmektedir.
                    </p>
                </div>
                
                {repos.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {repos.map((repo) => (
                           <ProjectCard key={repo.id} repo={repo} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center text-muted-foreground">
                        Projeler yüklenemedi veya hiç proje bulunmuyor.
                    </div>
                )}
                
                <div className="text-center mt-12">
                    <Button asChild size="lg">
                        <Link href={`https://github.com/${content.githubUsername}?tab=repositories`} target="_blank" rel="noopener noreferrer">
                            Tüm Projeleri Gör
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
