'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Bookmark } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Content } from '@/lib/types';
import { useBookmarks } from '@/hooks/use-bookmarks';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ContentCardProps {
  item: Content;
}

const ContentCard = ({ item }: ContentCardProps) => {
  const { toggleBookmark, isBookmarked } = useBookmarks();
  const bookmarked = isBookmarked(item.id);

  const handleBookmarkClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    toggleBookmark(item.id);
  };

  return (
    <Link href={`/content/${item.id}`} className="block group">
      <Card className="h-full flex flex-col transition-all duration-300 ease-in-out group-hover:shadow-lg group-hover:-translate-y-1">
        <CardHeader className="p-0">
          <div className="relative w-full h-48">
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover rounded-t-lg"
              data-ai-hint={item.dataAiHint}
            />
          </div>
        </CardHeader>
        <CardContent className="flex-grow p-4">
          <Badge variant="secondary" className="mb-2">{item.category}</Badge>
          <CardTitle className="text-lg font-semibold leading-tight group-hover:text-accent transition-colors">
            {item.title}
          </CardTitle>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleBookmarkClick}
            aria-label={bookmarked ? 'Remove bookmark' : 'Add bookmark'}
            className="ml-auto text-muted-foreground hover:text-accent"
          >
            <Bookmark className={cn('w-5 h-5', bookmarked ? 'fill-accent text-accent' : 'fill-transparent')} />
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ContentCard;
