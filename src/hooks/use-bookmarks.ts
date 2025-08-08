'use client';

import { useState, useEffect, useCallback } from 'react';

const BOOKMARKS_KEY = 'infoFlowBookmarks';

export const useBookmarks = () => {
  const [bookmarks, setBookmarks] = useState<string[]>([]);

  useEffect(() => {
    try {
      const storedBookmarks = localStorage.getItem(BOOKMARKS_KEY);
      if (storedBookmarks) {
        setBookmarks(JSON.parse(storedBookmarks));
      }
    } catch (error) {
      console.error('Failed to parse bookmarks from localStorage', error);
      setBookmarks([]);
    }
  }, []);

  const toggleBookmark = useCallback((id: string) => {
    setBookmarks(prevBookmarks => {
      const newBookmarks = prevBookmarks.includes(id)
        ? prevBookmarks.filter(bookmarkId => bookmarkId !== id)
        : [...prevBookmarks, id];
      
      try {
        localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(newBookmarks));
      } catch (error) {
        console.error('Failed to save bookmarks to localStorage', error);
      }

      return newBookmarks;
    });
  }, []);

  const isBookmarked = useCallback((id: string) => {
    return bookmarks.includes(id);
  }, [bookmarks]);

  return { bookmarks, toggleBookmark, isBookmarked };
};
