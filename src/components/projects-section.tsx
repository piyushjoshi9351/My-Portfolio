"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { projectsData } from "@/lib/portfolio-data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, ArrowUpRight } from "lucide-react";

const ProjectCard = ({ project, imageData }: { project: typeof projectsData[0]; imageData?: any }) => {
  const cardRef = React.useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = e.clientX - left - width / 2;
    const y = e.clientY - top - height / 2;

    const rotateY = (x / width) * 20;
    const rotateX = -(y / height) * 20;

    cardRef.current.style.setProperty("--rotate-x", `${rotateX}deg`);
    cardRef.current.style.setProperty("--rotate-y", `${rotateY}deg`);
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.setProperty("--rotate-x", "0deg");
    cardRef.current.style.setProperty("--rotate-y", "0deg");
  };

  return (
    <div className="project-card-container">
      <Card
        ref={cardRef}
        className="project-card glass-card flex flex-col overflow-hidden transition-all duration-300"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <CardHeader className="p-0">
          {imageData && (
            <div className="relative aspect-video w-full overflow-hidden">
              <Image
                src={imageData.imageUrl}
                alt={imageData.description}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                data-ai-hint={imageData.imageHint}
              />
            </div>
          )}
        </CardHeader>
        <div className="p-6 flex flex-col flex-grow">
          <CardTitle className="pt-4 text-2xl">{project.title}</CardTitle>
          <CardDescription className="mt-2 text-muted-foreground">{project.description}</CardDescription>
          <CardContent className="flex-grow pt-6">
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <Badge key={tech} variant="secondary">
                  {tech}
                </Badge>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between items-center p-0 pt-6">
            <Button asChild variant="link" className="p-0 h-auto text-primary">
              <Link href={project.liveDemoUrl}>
                Live Demo <ArrowUpRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="ghost" size="icon">
              <Link href={project.githubRepoUrl}>
                <Github className="h-5 w-5" />
              </Link>
            </Button>
          </CardFooter>
        </div>
      </Card>
    </div>
  );
};


export default function ProjectsSection() {
  const getImageData = (id: string) => {
    return PlaceHolderImages.find((img) => img.id === id);
  };

  return (
    <section id="projects" className="animate-fade-in-up">
      <div className="container">
        <div className="space-y-4 text-center mb-16">
          <h2 className="font-headline text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl">
            My Creations
          </h2>
          <p className="mx-auto max-w-[700px] text-lg text-muted-foreground md:text-xl/relaxed">
            A selection of projects that showcase my skills and passion.
          </p>
        </div>
        <div className="grid gap-12 md:grid-cols-2">
          {projectsData.map((project, index) => {
            const imageData = getImageData(project.imagePlaceholderId);
            return (
              <ProjectCard 
                key={project.id} 
                project={project}
                imageData={imageData}
                />
            );
          })}
        </div>
      </div>
    </section>
  );
}
