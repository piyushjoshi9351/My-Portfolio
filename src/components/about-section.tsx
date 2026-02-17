import Image from "next/image";
import { aboutData } from "@/lib/portfolio-data";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function AboutSection() {
  const aboutImage = PlaceHolderImages.find((img) => img.id === "about-me");

  return (
    <section id="about" className="animate-fade-in-up">
      <div className="container">
        <div className="mx-auto max-w-6xl space-y-10">
          <div className="space-y-4 text-center">
            <h2 className="font-headline text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl md:text-5xl">
              About Me
            </h2>
            <p className="text-base text-muted-foreground md:text-lg leading-relaxed">
              My journey, my passion, and my purpose.
            </p>
          </div>

          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
            <div className="mx-auto md:mx-0">
              <div className="relative h-64 w-64 md:h-80 md:w-80 lg:h-[420px] lg:w-[420px] rounded-full overflow-hidden shadow-2xl border-4 border-primary/20 animate-zoom-in">
                {aboutImage && (
                  <Image
                    src={aboutImage.imageUrl}
                    alt={aboutImage.description}
                    fill
                    className="object-cover object-center hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 50vw, 33vw"
                    data-ai-hint={aboutImage.imageHint}
                  />
                )}
              </div>
            </div>

            <div className="space-y-6 text-base md:text-lg leading-relaxed max-w-prose">
              <p>{aboutData.bio}</p>
              <p>{aboutData.aspirations}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
