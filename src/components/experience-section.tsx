import { experienceData, achievementsData } from "@/lib/portfolio-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, Award } from "lucide-react";

export default function ExperienceSection() {
  return (
    <section id="experience" className="bg-card">
      <div className="container">
        <div className="space-y-4 text-center mb-12">
          <h2 className="font-headline text-3xl font-bold tracking-tighter text-primary sm:text-4xl md:text-5xl">
            Experience & Achievements
          </h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed">
            My professional journey and key accomplishments.
          </p>
        </div>
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <h3 className="flex items-center gap-2 mb-8 text-2xl font-bold text-accent">
              <Briefcase /> Professional Experience
            </h3>
            <div className="relative space-y-8 pl-6 before:absolute before:inset-y-0 before:w-0.5 before:bg-border before:left-0">
              {experienceData.map((exp, index) => (
                <div key={index} className="relative">
                  <div className="absolute -left-[37px] top-1.5 h-4 w-4 rounded-full bg-accent" />
                  <p className="font-semibold">{exp.period}</p>
                  <h4 className="text-xl font-bold">{exp.role}</h4>
                  <p className="font-medium text-primary">{exp.company}</p>
                  <p className="text-muted-foreground">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="flex items-center gap-2 mb-8 text-2xl font-bold text-accent">
              <Award /> Notable Achievements
            </h3>
            <Card>
              <CardContent className="pt-6">
                <ul className="space-y-4">
                  {achievementsData.map((ach, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Award className="mt-1 h-5 w-5 shrink-0 text-accent" />
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
