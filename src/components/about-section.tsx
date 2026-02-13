import Image from "next/image";
import { aboutData } from "@/lib/portfolio-data";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function AboutSection() {
  const aboutImage = PlaceHolderImages.find((img) => img.id === "about-me");

  return (
    <section id="about" className="animate-fade-in-up">
      <div className="container">
        <div className="mx-auto max-w-6xl space-y-12">
          <div className="space-y-4 text-center">
            <h2 className="font-headline text-5xl font-extrabold tracking-tight text-foreground sm:text-6xl md:text-7xl">
              About Me
            </h2>
            <p className="text-lg text-muted-foreground md:text-xl/relaxed">
              My journey, my passion, and my purpose.
            </p>
          </div>
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
            <div className="relative h-96 w-full animate-zoom-in rounded-lg">
              {aboutImage && (
                <Image
                  src={aboutImage.imageUrl}
                  alt={aboutImage.description}
                  fill
                  className="rounded-lg object-cover shadow-2xl"
                  data-ai-hint={aboutImage.imageHint}
                />
              )}
            </div>
            <div className="space-y-6 text-lg">
              <p>{aboutData.bio}</p>
              <p>{aboutData.aspirations}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
