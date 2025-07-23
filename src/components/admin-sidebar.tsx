import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, FileText, LogOut, Settings, Briefcase, Code, Star, Phone } from "lucide-react";
import { logout } from "@/actions/auth";

export function AdminSidebar() {
  return (
    <div className="hidden border-r bg-gray-100/40 md:block dark:bg-gray-800/40">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/admin/dashboard" className="flex items-center gap-2 font-semibold">
            <Settings className="h-6 w-6" />
            <span className="">Admin Paneli</span>
          </Link>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            <Link
              href="/admin/dashboard"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
            >
              <Home className="h-4 w-4" />
              Dashboard
            </Link>
            <Link
              href="/admin/about"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
            >
              <FileText className="h-4 w-4" />
              Hakkımda Sayfası
            </Link>
             <Link
              href="/admin/experience"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
            >
              <Briefcase className="h-4 w-4" />
              Deneyim Sayfası
            </Link>
            <Link
              href="/admin/projects"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
            >
              <Code className="h-4 w-4" />
              Projeler Sayfası
            </Link>
            <Link
              href="/admin/skills"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
            >
              <Star className="h-4 w-4" />
              Yetenekler Sayfası
            </Link>
            <Link
              href="/admin/contact"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
            >
              <Phone className="h-4 w-4" />
              İletişim Sayfası
            </Link>
          </nav>
        </div>
        <div className="mt-auto p-4">
            <form action={logout}>
                <Button size="sm" className="w-full">
                    <LogOut className="mr-2 h-4 w-4" />
                    Çıkış Yap
                </Button>
            </form>
        </div>
      </div>
    </div>
  );
}
