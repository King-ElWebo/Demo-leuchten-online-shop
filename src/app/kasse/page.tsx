import type { Metadata } from 'next';
import { KasseClient } from './KasseClient';

export const metadata: Metadata = {
  title: 'Kasse — Demonstrations-Abschluss',
  description:
    'Schließen Sie Ihre Konfiguration als interaktive Demo-Bestellung ab und verfolgen Sie die Kennzahlen direkt im Händler-Cockpit.',
};

export default function KassePage() {
  return <KasseClient />;
}
