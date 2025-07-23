'use server';

export type GithubRepo = {
    id: number;
    name: string;
    full_name: string;
    description: string | null;
    html_url: string;
    homepage: string | null;
    language: string | null;
    stargazers_count: number;
    forks_count: number;
    pushed_at: string;
};

export async function getGithubRepos(username: string): Promise<GithubRepo[]> {
    try {
        const response = await fetch(`https://api.github.com/users/${username}/repos?sort=pushed&per_page=6`, {
            next: {
                revalidate: 3600, // Revalidate every hour
            }
        });

        if (!response.ok) {
            console.error('GitHub API request failed:', response.statusText);
            return [];
        }

        const data = await response.json();
        
        const sortedData = data.sort((a: GithubRepo, b: GithubRepo) => {
            if (b.stargazers_count !== a.stargazers_count) {
                return b.stargazers_count - a.stargazers_count;
            }
            return new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime();
        });

        return sortedData.slice(0, 6) as GithubRepo[];
    } catch (error) {
        console.error('Failed to fetch GitHub repositories:', error);
        return [];
    }
}
