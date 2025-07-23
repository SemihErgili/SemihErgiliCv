import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getSession } from "@/actions/auth";

export default async function DashboardPage() {
  const session = await getSession();

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardHeader>
          <CardTitle>Hoş Geldiniz, {session?.user?.email || 'Admin'}!</CardTitle>
          <CardDescription>
            Burası admin panelinizin ana sayfası. Soldaki menüden yönetmek istediğiniz sayfayı seçebilirsiniz.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Şu anda sadece "Hakkımda" sayfasını düzenleyebilirsiniz. Gelecekte daha fazla sayfa ve özellik eklenecektir.</p>
        </CardContent>
      </Card>
    </div>
  );
}
