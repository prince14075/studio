'use client';
import { useMemo } from 'react';
import { Bookmark } from 'lucide-react';
import { useBookmarks } from '@/hooks/use-bookmarks';
import { contentData } from '@/lib/content-data';
import ContentCard from '@/components/ContentCard';

export default function BookmarksPage() {
  const { bookmarks } = useBookmarks();

  const bookmarkedItems = useMemo(() => {
    return contentData.filter(item => bookmarks.includes(item.id));
  }, [bookmarks]);

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Bookmark className="w-8 h-8 text-accent" />
        <h1 className="text-3xl font-bold">Your Bookmarks</h1>
      </div>
      {bookmarkedItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {bookmarkedItems.map(item => (
            <ContentCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 border-2 border-dashed rounded-lg">
          <Bookmark className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-2 text-lg font-medium">No bookmarks yet</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            You haven&apos;t bookmarked any items. Click the bookmark icon on an item to save it.
          </p>
        </div>
      )}
    </div>
  );
}
