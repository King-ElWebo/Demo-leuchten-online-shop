import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { products, getProductBySlug } from '@/data/products';
import { ProductDetailClient } from './ProductDetailClient';

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: 'Produkt nicht gefunden',
    };
  }

  return {
    title: `${product.name} — ${product.categoryLabel}`,
    description: `${product.summary} Handgefertigt aus ${product.material}. Farbwiedergabe ${product.photometrics.cri}.`,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  // Related products from other items
  const relatedProducts = products
    .filter((p) => p.slug !== product.slug)
    .slice(0, 3);

  return (
    <ProductDetailClient product={product} relatedProducts={relatedProducts} />
  );
}
