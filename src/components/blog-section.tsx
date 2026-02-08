"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { summarizeBlogPost, SummarizeBlogPostOutput } from "@/ai/flows/summarize-blog-post";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";

export default function BlogSection() {
  const [summaryResult, setSummaryResult] = useState<SummarizeBlogPostOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, reset } = useForm<{ content: string }>();

  const onSubmit = async (data: { content: string }) => {
    setIsLoading(true);
    setSummaryResult(null);
    try {
      const result = await summarizeBlogPost({ blogPostContent: data.content });
      setSummaryResult(result);
    } catch (error) {
      console.error("Error summarizing blog post:", error);
      // Here you could use a toast to show an error message
    } finally {
      setIsLoading(false);
      reset();
    }
  };

  return (
    <section id="blog">
      <div className="container">
        <div className="space-y-4 text-center mb-12">
          <h2 className="font-headline text-3xl font-bold tracking-tighter text-primary sm:text-4xl md:text-5xl">
            AI-Powered Blog Assistant
          </h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed">
            Paste a technical article below to generate a concise summary and relevant keywords using AI.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Textarea
              {...register("content", { required: true })}
              placeholder="Paste your blog post content here..."
              rows={15}
              className="font-code"
            />
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isLoading ? "Summarizing..." : "Generate Summary"}
            </Button>
          </form>
          <div className="space-y-4">
            {summaryResult ? (
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-accent">Summary &amp; Keywords</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Summary</h4>
                    <p className="text-muted-foreground">{summaryResult.summary}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Keywords</h4>
                    <div className="flex flex-wrap gap-2">
                      {summaryResult.keywords.map((keyword, index) => (
                        <Badge key={index} variant="secondary">{keyword}</Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
                <Card className="flex h-full items-center justify-center border-dashed">
                    <CardContent className="text-center text-muted-foreground p-6">
                        <p>Your AI-generated summary will appear here.</p>
                    </CardContent>
                </Card>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
