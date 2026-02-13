"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { summarizeBlogPost, SummarizeBlogPostOutput } from "@/ai/flows/summarize-blog-post";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function BlogSection() {
  const [summaryResult, setSummaryResult] = useState<SummarizeBlogPostOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, reset } = useForm<{ content: string }>();
  const { toast } = useToast();

  const onSubmit = async (data: { content: string }) => {
    setIsLoading(true);
    setSummaryResult(null);
    try {
      const result = await summarizeBlogPost({ blogPostContent: data.content });
      setSummaryResult(result);
      toast({
        title: "Success!",
        description: "Your summary has been generated.",
      });
    } catch (error) {
      console.error("Error summarizing blog post:", error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Could not generate summary. Please check your API key and try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="blog" className="animate-fade-in-up">
      <div className="container">
        <div className="space-y-4 text-center mb-16">
          <h2 className="font-headline text-5xl font-extrabold tracking-tight text-foreground sm:text-6xl md:text-7xl">
            AI Assistant
          </h2>
          <p className="mx-auto max-w-[700px] text-lg text-muted-foreground md:text-xl/relaxed">
            To showcase my AI integration skills, paste a technical article below. The AI will generate a concise summary and keywords.
          </p>
        </div>
        <div className="grid gap-12 md:grid-cols-2">
          <div className="animate-zoom-in">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <Textarea
                {...register("content", { required: true })}
                placeholder="Paste your article content here..."
                rows={15}
                className="bg-card/60 backdrop-blur-md border border-white/10 font-code text-base"
              />
              <Button type="submit" disabled={isLoading} size="lg" className="w-full text-lg font-bold py-6 bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-500/90 transition-all duration-300">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Summarizing...
                  </>
                ) : (
                  "Generate Summary"
                )}
              </Button>
            </form>
          </div>
          <div className="animate-zoom-in" style={{animationDelay: '200ms'}}>
            {summaryResult ? (
              <Card className="glass-card h-full">
                <CardHeader>
                  <CardTitle className="text-2xl text-primary">AI Generated Result</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-bold mb-2 text-lg">Summary</h4>
                    <p className="text-muted-foreground">{summaryResult.summary}</p>
                  </div>
                  <div>
                    <h4 className="font-bold mb-2 text-lg">Keywords</h4>
                    <div className="flex flex-wrap gap-2">
                      {summaryResult.keywords.map((keyword, index) => (
                        <Badge key={index} variant="secondary">{keyword}</Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
                <Card className="glass-card flex h-full items-center justify-center border-dashed border-white/20">
                    <CardContent className="text-center text-muted-foreground p-6">
                        <p className="text-lg">Your AI-generated summary and keywords will appear here.</p>
                    </CardContent>
                </Card>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
