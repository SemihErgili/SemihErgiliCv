import { AppHeader } from '@/components/app-header';
import { AppFooter } from '@/components/app-footer';

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-slate-100 text-slate-800">
      <div className="flex min-h-screen flex-col">
        <div className="fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50 opacity-70"></div>
          <div className="absolute inset-0 opacity-10" style={{backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')"}}></div>
          <div className="circles">
              <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-blue-200 opacity-30 mix-blend-multiply filter blur-xl animate-blob"></div>
              <div className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full bg-green-200 opacity-30 mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
              <div className="absolute bottom-1/4 left-1/2 w-64 h-64 rounded-full bg-purple-200 opacity-30 mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
          </div>
        </div>
        <AppHeader />
        <main className="flex-1">
          {children}
        </main>
        <AppFooter />
      </div>
    </div>
  );
}
