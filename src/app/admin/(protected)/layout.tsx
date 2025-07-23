import type { Metadata } from "next";
import { AdminSidebar } from "@/components/admin-sidebar";

export const metadata: Metadata = {
  title: "Admin Paneli",
  description: "Web sitesi içerik yönetim paneli.",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
        <AdminSidebar />
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
            {children}
        </main>
    </div>
  );
}
