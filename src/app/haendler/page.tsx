import type { Metadata } from 'next';
import { HaendlerClient } from './HaendlerClient';

export const metadata: Metadata = {
  title: 'Händler-Cockpit — B2B Kennzahlen & Auftragsfluss',
  description:
    'Echtzeit-Cockpit für Fachhandel und Lichtplanung: Kausale Berechnung von Umsatz, AOV, Conversion Rate und Bestandsreservierung.',
};

export default function HaendlerPage() {
  return <HaendlerClient />;
}
