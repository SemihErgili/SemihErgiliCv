import { ExperienceContentForm } from "@/components/experience-content-form";
import { getExperienceContent } from "@/lib/content-manager";

export default async function AdminExperiencePage() {
    const content = await getExperienceContent();
    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold">Deneyim Sayfasını Düzenle</h1>
            <ExperienceContentForm content={content} />
        </div>
    );
}
