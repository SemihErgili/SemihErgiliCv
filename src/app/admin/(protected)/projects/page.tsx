import { ProjectsContentForm } from "@/components/projects-content-form";
import { getProjectsContent } from "@/lib/content-manager";

export default async function AdminProjectsPage() {
    const content = await getProjectsContent();
    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold">Projeler Sayfasını Düzenle</h1>
            <ProjectsContentForm content={content} />
        </div>
    );
}
