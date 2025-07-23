import { MapPin, Mail, Phone, Github, Linkedin, Twitter, Instagram, Link as LinkIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { getContactContent } from "@/lib/content-manager";
import type { LucideProps } from 'lucide-react';

const iconMap: { [key: string]: React.FC<LucideProps> } = {
  MapPin,
  Mail,
  Phone,
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Link: LinkIcon,
};

function DynamicIcon({ name, ...props }: { name: string } & LucideProps) {
  const Icon = iconMap[name];
  if (!Icon) return <LinkIcon {...props} />; // Fallback icon
  return <Icon {...props} />;
}


export async function ContactSection() {
    const content = await getContactContent();

    const contactInfo = [
        { icon: <MapPin className="text-primary"/>, label: "Konum", value: content.location },
        { icon: <Mail className="text-primary"/>, label: "E-posta", value: content.email },
        { icon: <Phone className="text-primary"/>, label: "Telefon", value: content.phone },
    ];

    return (
        <section id="contact" className="py-20 bg-white/80 backdrop-blur-md">
            <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">İletişime Geçin</h2>
                    <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto"></div>
                    <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
                        Aklınızda bir proje mi var veya potansiyel fırsatları mı tartışmak istiyorsunuz? Bana ulaşmaktan çekinmeyin!
                    </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-6">İletişim Bilgileri</h3>
                        <div className="space-y-6">
                            {contactInfo.map(info => (
                                <div key={info.label} className="flex items-start">
                                    <div className="bg-blue-100 p-3 rounded-full mr-4">
                                        {info.icon}
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-gray-800">{info.label}</h4>
                                        <p className="text-muted-foreground">{info.value}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                        <div className="mt-10">
                            <h3 className="text-xl font-semibold text-gray-800 mb-6">Beni Takip Edin</h3>
                            <div className="flex space-x-4">
                                {content.socials.map((social) => (
                                    <a key={social.id} href={social.url} target="_blank" rel="noopener noreferrer" className="bg-blue-100 p-3 rounded-full text-primary hover:bg-blue-200 transition">
                                        <DynamicIcon name={social.icon} />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                    
                    <div>
                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">İsim</label>
                                    <Input type="text" id="name" name="name" />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">E-posta</label>
                                    <Input type="email" id="email" name="email" />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Konu</label>
                                <Input type="text" id="subject" name="subject" />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Mesaj</label>
                                <Textarea id="message" name="message" rows={5} />
                            </div>
                            <div>
                                <Button type="submit" className="w-full" size="lg">
                                    Mesaj Gönder
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
