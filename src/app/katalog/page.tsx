import type { Metadata } from 'next';
import { products } from '@/data/products';
import { KatalogClient } from './KatalogClient';

export const metadata: Metadata = {
  title: 'Katalog — Architektonische Leuchten',
  description:
    'Vollständiger Katalog unserer 7 architektonischen Leuchtenserien. Massive Werkstoffe, CRI 98+ Vollspektrumlicht, DALI-2 und Casambi.',
};

export default function KatalogPage() {
  return <KatalogClient products={products} />;
}
