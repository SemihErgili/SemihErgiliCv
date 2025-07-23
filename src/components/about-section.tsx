import Image from "next/image";
import { Button } from "./ui/button";
import { User, Mail, MapPin, Code, Download, Send } from "lucide-react";
import Link from "next/link";
import { getAboutContent } from "@/lib/content-manager";

export async function AboutSection() {
    const content = await getAboutContent();

    const details = [
        { icon: <User className="text-primary"/>, label: "İsim", value: content.name },
        { icon: <Mail className="text-primary"/>, label: "E-posta", value: content.email },
        { icon: <MapPin className="text-primary"/>, label: "Konum", value: content.location },
        { icon: <Code className="text-primary"/>, label: "Freelance", value: content.freelance },
    ];

    return (
        <section id="about" className="py-20 bg-white/80 backdrop-blur-md">
            <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">Hakkımda</h2>
                    <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto"></div>
                </div>
                
                <div className="flex flex-col md:flex-row items-center">
                    <div className="md:w-1/3 mb-8 md:mb-0 flex justify-center">
                        <div className="relative w-64 h-64">
                            <div className="absolute -inset-4 bg-gradient-to-r from-blue-400 to-green-400 rounded-full blur opacity-75"></div>
                            <Image 
                                src="https://images.unsplash.com/photo-1504639725590-c521db54c156?auto=format&fit=crop&w=300&q=80"
                                data-ai-hint="developer portrait"
                                alt="Profil" 
                                width={300}
                                height={300}
                                className="relative w-full h-full object-cover rounded-full border-4 border-white shadow-lg"
                            />
                        </div>
                    </div>
                    <div className="md:w-2/3 md:pl-12">
                        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Ben kimim?</h3>
                        <p className="text-muted-foreground mb-6">
                            {content.bio}
                        </p>
                        <p className="text-muted-foreground mb-6">
                           {content.journey}
                        </p>
                        <div className="grid grid-cols-2 gap-4 mb-6">
                            {details.map(detail => (
                                <div key={detail.label} className="flex items-center">
                                    <div className="bg-blue-100 p-2 rounded-full mr-3">
                                        {detail.icon}
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-700">{detail.label}:</p>
                                        <p className="text-muted-foreground">{detail.value}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex space-x-4">
                            <Button asChild>
                                <a href="#">
                                    <Download className="mr-2 h-4 w-4"/> CV'mi İndir
                                </a>
                            </Button>
                            <Button asChild variant="outline">
                                <Link href="/contact">
                                    <Send className="mr-2 h-4 w-4"/> İletişime Geç
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
