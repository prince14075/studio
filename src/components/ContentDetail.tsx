'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Bookmark, Sparkles, LoaderCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useBookmarks } from '@/hooks/use-bookmarks';
import type { Content } from '@/lib/types';
import { cn } from '@/lib/utils';
import { summarizeContent } from '@/ai/flows/summarize-content';
import { useToast } from '@/hooks/use-toast';

interface ContentDetailProps {
  item: Content;
}

export default function ContentDetail({ item }: ContentDetailProps) {
  const { toggleBookmark, isBookmarked } = useBookmarks();
  const [summary, setSummary] = useState('');
  const [isLoadingSummary, setIsLoadingSummary] = useState(false);
  const { toast } = useToast();
  const bookmarked = isBookmarked(item.id);

  const handleGenerateSummary = async () => {
    setIsLoadingSummary(true);
    setSummary('');
    try {
      const result = await summarizeContent({ content: item.content });
      setSummary(result.summary);
    } catch (error) {
      console.error('Failed to generate summary:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to generate summary. Please try again.',
      });
    } finally {
      setIsLoadingSummary(false);
    }
  };

  return (
    <article className="max-w-4xl mx-auto">
      <div className="mb-8">
        <Badge variant="secondary" className="mb-2 text-md">{item.category}</Badge>
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          {item.title}
        </h1>
      </div>
      <div className="relative w-full h-96 mb-8">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover rounded-lg shadow-lg"
          priority
          data-ai-hint={item.dataAiHint}
        />
      </div>
      <div className="flex items-center gap-4 mb-8">
        <Button onClick={handleGenerateSummary} disabled={isLoadingSummary}>
          {isLoadingSummary ? (
            <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Sparkles className="mr-2 h-4 w-4" />
          )}
          Generate Summary
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => toggleBookmark(item.id)}
          aria-label={bookmarked ? 'Remove bookmark' : 'Add bookmark'}
        >
          <Bookmark className={cn('h-5 w-5', bookmarked ? 'fill-accent text-accent' : '')} />
        </Button>
      </div>

      {isLoadingSummary && (
        <Card className="mb-8 bg-muted/50 animate-pulse">
            <CardHeader><CardTitle>Generating Summary...</CardTitle></CardHeader>
            <CardContent className="space-y-2">
                <div className="h-4 bg-muted rounded w-full"></div>
                <div className="h-4 bg-muted rounded w-5/6"></div>
                <div className="h-4 bg-muted rounded w-3/4"></div>
            </CardContent>
        </Card>
      )}

      {summary && (
        <Card className="mb-8 bg-primary/10 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="text-accent" />
              AI Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-foreground/80">{summary}</p>
          </CardContent>
        </Card>
      )}

      <div className="prose prose-lg dark:prose-invert max-w-none text-foreground/90 text-lg leading-relaxed">
        <p>{item.content}</p>
      </div>
    </article>
  );
}
