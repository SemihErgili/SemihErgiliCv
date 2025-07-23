import { AboutContentForm } from "@/components/about-content-form";
import { getAboutContent } from "@/lib/content-manager";

export default async function AdminAboutPage() {
    const content = await getAboutContent();
    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold">Hakkımda Sayfasını Düzenle</h1>
            <AboutContentForm content={content} />
        </div>
    );
}
