import { SkillsContentForm } from "@/components/skills-content-form";
import { getSkillsContent } from "@/lib/content-manager";

export default async function AdminSkillsPage() {
    const content = await getSkillsContent();
    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold">Yetenekler Sayfasını Düzenle</h1>
            <SkillsContentForm content={content} />
        </div>
    );
}
