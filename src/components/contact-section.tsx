"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  message: z.string().min(10, "Message must be at least 10 characters long."),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function ContactSection() {
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(data);

    toast({
      title: "Message Sent!",
      description: "Thank you for your message! I'll get back to you soon.",
    });
    reset();
  };

  const inputClass =
    "w-full bg-transparent border-b-2 border-white/20 py-3 text-lg transition-all focus:border-primary focus:outline-none";
  const labelClass = "absolute left-2 top-3 text-muted-foreground transition-all duration-300 pointer-events-none";

  return (
    <section id="contact" className="animate-fade-in-up">
      <div className="container">
        <div className="space-y-4 text-center mb-16">
          <h2 className="font-headline text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl">
            Get in Touch
          </h2>
          <p className="mx-auto max-w-[700px] text-lg text-muted-foreground md:text-xl/relaxed">
            Have a project in mind or just want to connect? Drop me a line.
          </p>
        </div>
        <div className="mx-auto max-w-2xl animate-zoom-in">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
            <div className="relative">
              <input
                id="name"
                {...register("name")}
                className={cn(inputClass, "peer")}
                placeholder=" "
              />
              <label htmlFor="name" className={cn(labelClass, "peer-placeholder-shown:top-3 peer-focus:-top-5 peer-focus:text-sm peer-focus:text-primary peer-[:not(:placeholder-shown)]:-top-5 peer-[:not(:placeholder-shown)]:text-sm peer-[:not(:placeholder-shown)]:text-primary")}>Name</label>
              {errors.name && <p className="mt-2 text-sm text-destructive">{errors.name.message}</p>}
            </div>

            <div className="relative">
              <input
                id="email"
                type="email"
                {...register("email")}
                className={cn(inputClass, "peer")}
                placeholder=" "
              />
              <label htmlFor="email" className={cn(labelClass, "peer-placeholder-shown:top-3 peer-focus:-top-5 peer-focus:text-sm peer-focus:text-primary peer-[:not(:placeholder-shown)]:-top-5 peer-[:not(:placeholder-shown)]:text-sm peer-[:not(:placeholder-shown)]:text-primary")}>Email</label>
              {errors.email && <p className="mt-2 text-sm text-destructive">{errors.email.message}</p>}
            </div>

            <div className="relative">
              <textarea
                id="message"
                {...register("message")}
                rows={4}
                className={cn(inputClass, "peer")}
                placeholder=" "
              />
              <label htmlFor="message" className={cn(labelClass, "peer-placeholder-shown:top-3 peer-focus:-top-5 peer-focus:text-sm peer-focus:text-primary peer-[:not(:placeholder-shown)]:-top-5 peer-[:not(:placeholder-shown)]:text-sm peer-[:not(:placeholder-shown)]:text-primary")}>Message</label>
              {errors.message && <p className="mt-2 text-sm text-destructive">{errors.message.message}</p>}
            </div>
            
            <Button
              type="submit"
              className="w-full text-lg font-bold py-6 bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-500/90 transition-all duration-300"
              disabled={isSubmitting}
            >
              {isSubmitting && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
