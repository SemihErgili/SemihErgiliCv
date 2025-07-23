import Image from 'next/image';
import { Button } from './ui/button';
import Link from 'next/link';

export function HeroSection() {
  return (
    <section id="hero" className="flex min-h-[calc(100vh-4rem)] items-center pt-16">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center md:flex-row">
          <div className="mb-10 md:w-1/2 md:mb-0 text-center md:text-left">
            <h1 className="mb-4 text-4xl font-bold text-gray-800 md:text-6xl">
              Merhaba, ben <span className="text-primary">Semih Ergili</span>
            </h1>
            <div className="typewriter mb-6 text-2xl text-gray-600 md:text-3xl mx-auto md:mx-0">
              Full Stack Geliştirici
            </div>
            <p className="mb-8 text-lg text-gray-600">
              Modern teknolojilerle sıra dışı dijital deneyimler oluşturuyorum.
              Etki yaratan çözümler üretme konusunda tutkuluyum.
            </p>
            <div className="flex space-x-4 justify-center md:justify-start">
              <Button asChild size="lg" className="shadow-lg hover:shadow-xl">
                <Link href="/contact">İletişime Geç</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/projects">Projelerimi Gör</Link>
              </Button>
            </div>
          </div>
          <div className="flex justify-center md:w-1/2">
            <div className="relative h-64 w-64 md:h-80 md:w-80">
              <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl"></div>
              <div className="relative flex h-full w-full items-center justify-center">
                <Image 
                  src="https://images.unsplash.com/photo-1504639725590-c521db54c156?auto=format&fit=crop&w=400&q=80"
                  alt="Profil" 
                  width={400}
                  height={400}
                  className="h-full w-full rounded-full border-4 border-white object-cover shadow-xl floating"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
