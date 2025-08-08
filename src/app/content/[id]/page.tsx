import { notFound } from 'next/navigation';
import { contentData } from '@/lib/content-data';
import ContentDetail from '@/components/ContentDetail';
import type { Metadata } from 'next';
import { Suspense } from 'react';

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const item = contentData.find(p => p.id === params.id);
  
  if (!item) {
    return {
      title: 'Not Found',
    };
  }

  return {
    title: `${item.title} | InfoFlow`,
    description: item.content.substring(0, 150),
  };
}

export async function generateStaticParams() {
  return contentData.map(item => ({
    id: item.id,
  }));
}

export default function ContentPage({ params }: Props) {
  const { id } = params;
  const item = contentData.find(p => p.id === id);

  if (!item) {
    notFound();
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ContentDetail item={item} />
    </Suspense>
  );
}
