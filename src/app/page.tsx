'use client';
import type { NextPage } from 'next';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import ContentCard from '@/components/ContentCard';
import { contentData } from '@/lib/content-data';
import type { Content } from '@/lib/types';
import { motion, AnimatePresence } from 'framer-motion';

const Home: NextPage = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';

  const filteredContent = useMemo(() => {
    if (!query) {
      return contentData;
    }
    return contentData.filter((item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.keywords.some(k => k.toLowerCase().includes(query.toLowerCase()))
    );
  }, [query]);

  return (
    <div className="space-y-6">
      <AnimatePresence>
        {filteredContent.length > 0 ? (
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.05,
                },
              },
            }}
          >
            {filteredContent.map((item: Content) => (
              <motion.div
                key={item.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                layout
              >
                <ContentCard item={item} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-center py-12"
          >
            <p className="text-muted-foreground text-lg">No results found for &quot;{query}&quot;.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;
