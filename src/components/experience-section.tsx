import { experienceData, achievementsData } from "@/lib/portfolio-data";
import { Card, CardContent } from "@/components/ui/card";
import { Briefcase, Award } from "lucide-react";

export default function ExperienceSection() {
  return (
    <section id="experience" className="animate-fade-in-up">
      <div className="container">
        <div className="space-y-4 text-center mb-16">
          <h2 className="font-headline text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl">
            My Journey
          </h2>
          <p className="mx-auto max-w-[700px] text-lg text-muted-foreground md:text-xl/relaxed">
            A timeline of my professional experience and key achievements.
          </p>
        </div>
        <div className="grid gap-16 md:grid-cols-2">
          <div className="space-y-12">
            <h3 className="flex items-center gap-4 text-3xl font-bold text-primary">
              <Briefcase size={32} /> Professional Experience
            </h3>
            <div className="relative space-y-12 pl-8 before:absolute before:inset-y-0 before:w-1 before:bg-border before:left-0 before:bg-gradient-to-b from-transparent via-primary to-transparent">
              {experienceData.map((exp, index) => (
                <div key={index} className="relative animate-fade-in-up" style={{ animationDelay: `${index * 150 + 200}ms` }}>
                  <div className="absolute -left-[45px] top-1 h-6 w-6 rounded-full bg-primary shadow-lg shadow-primary/50 flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-primary-foreground"></div>
                  </div>
                  <p className="font-semibold text-muted-foreground">{exp.period}</p>
                  <h4 className="text-2xl font-bold text-foreground">{exp.role}</h4>
                  <p className="font-medium text-primary">{exp.company}</p>
                  <p className="mt-2 text-muted-foreground">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-12">
            <h3 className="flex items-center gap-4 text-3xl font-bold text-primary">
              <Award size={32} /> Notable Achievements
            </h3>
            <Card className="glass-card animate-zoom-in">
              <CardContent className="pt-6">
                <ul className="space-y-6">
                  {achievementsData.map((ach, index) => (
                    <li key={index} className="flex items-start gap-4">
                      <Award className="mt-1 h-6 w-6 shrink-0 text-primary" />
                      <span className="text-muted-foreground">{ach}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
