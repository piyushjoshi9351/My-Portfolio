import Image from "next/image";
import Link from "next/link";
import { projectsData } from "@/lib/portfolio-data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";

export default function ProjectsSection() {
  const getImageData = (id: string) => {
    return PlaceHolderImages.find((img) => img.id === id);
  };

  return (
    <section id="projects" className="animate-fade-in-up" style={{ animationDelay: "0.8s" }}>
      <div className="container">
        <div className="space-y-4 text-center mb-12">
          <h2 className="font-headline text-3xl font-bold tracking-tighter text-primary sm:text-4xl md:text-5xl">
            Featured Projects
          </h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed">
            A selection of projects I've worked on.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          {projectsData.map((project, index) => {
            const imageData = getImageData(project.imagePlaceholderId);
            return (
              <Card 
                key={project.id} 
                className="flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 animate-zoom-in"
                style={{ animationDelay: `${index * 100 + 900}ms` }}
                >
                <CardHeader>
                  {imageData && (
                    <div className="relative aspect-video w-full overflow-hidden rounded-t-lg">
                      <Image
                        src={imageData.imageUrl}
                        alt={imageData.description}
                        fill
                        className="object-cover"
                        data-ai-hint={imageData.imageHint}
                      />
                    </div>
                  )}
                  <CardTitle className="pt-4">{project.title}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="flex flex-wrap gap-2">
                    <span className="font-medium">Tech Stack:</span>
                    {project.techStack.map((tech) => (
                      <Badge key={tech} variant="secondary">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button asChild variant="outline" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground">
                    <Link href={project.liveDemoUrl}>Live Demo</Link>
                  </Button>
                  <Button asChild variant="ghost">
                    <Link href={project.githubRepoUrl}>
                      <Github className="mr-2 h-4 w-4" />
                      GitHub
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
