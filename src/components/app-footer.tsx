import Link from "next/link";
import { Github, Linkedin, Twitter, Instagram } from 'lucide-react';

export function AppFooter() {
    return (
        <footer className="bg-gray-900 text-white py-12">
            <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-6 md:mb-0">
                        <Link href="/" className="flex items-center text-xl font-bold text-white">
                            <span className="mr-2 rounded-lg bg-primary p-2 text-primary-foreground">SE</span>
                            SemihErgili
                        </Link>
                        <p className="text-gray-400 mt-2">Önem taşıyan dijital deneyimler oluşturmak.</p>
                    </div>
                    <div className="flex space-x-6">
                        <Link href="/about" className="text-gray-400 hover:text-white transition">Hakkımda</Link>
                        <Link href="/experience" className="text-gray-400 hover:text-white transition">Deneyim</Link>
                        <Link href="/projects" className="text-gray-400 hover:text-white transition">Projeler</Link>
                        <Link href="/contact" className="text-gray-400 hover:text-white transition">İletişim</Link>
                    </div>
                </div>
                <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center w-full">
                    <p className="text-gray-400 text-sm">© {new Date().getFullYear()} Semih Ergili. Tüm hakları saklıdır.</p>
                    <div className="flex space-x-4 mt-4 md:mt-0">
                        <a href="#" className="text-gray-400 hover:text-white transition"><Github className="h-5 w-5" /></a>
                        <a href="#" className="text-gray-400 hover:text-white transition"><Linkedin className="h-5 w-5" /></a>
                        <a href="#" className="text-gray-400 hover:text-white transition"><Twitter className="h-5 w-5" /></a>
                        <a href="#" className="text-gray-400 hover:text-white transition"><Instagram className="h-5 w-5" /></a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
