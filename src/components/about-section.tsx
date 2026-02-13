import { aboutData } from "@/lib/portfolio-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutSection() {
  return (
    <section id="about" className="animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
      <div className="container">
        <div className="mx-auto max-w-4xl space-y-8">
          <div className="space-y-4 text-center">
            <h2 className="font-headline text-3xl font-bold tracking-tighter text-primary sm:text-4xl md:text-5xl">
              About Me
            </h2>
            <p className="text-muted-foreground md:text-xl/relaxed">
              A little bit about my journey and what drives me.
            </p>
          </div>
          <Card className="shadow-lg animate-zoom-in" style={{ animationDelay: "0.8s" }}>
            <CardHeader>
                <CardTitle className="text-accent">My Story</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-lg">
              <p>{aboutData.bio}</p>
              <p>{aboutData.aspirations}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
