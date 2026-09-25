import type { Metadata } from 'next';
import { WarenkorbClient } from './WarenkorbClient';

export const metadata: Metadata = {
  title: 'Warenkorb — Ihre Auswahl',
  description:
    'Prüfen Sie Ihre ausgewählten architektonischen Leuchten und individuellen Konfigurationen vor dem Abschluss.',
};

export default function WarenkorbPage() {
  return <WarenkorbClient />;
}
