import { ContactContentForm } from "@/components/contact-content-form";
import { getContactContent } from "@/lib/content-manager";

export default async function AdminContactPage() {
    const content = await getContactContent();
    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold">İletişim Sayfasını Düzenle</h1>
            <ContactContentForm content={content} />
        </div>
    );
}
