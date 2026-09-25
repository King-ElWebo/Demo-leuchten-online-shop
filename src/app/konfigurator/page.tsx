import type { Metadata } from 'next';
import { KonfiguratorClient } from './KonfiguratorClient';

export const metadata: Metadata = {
  title: 'Konfigurator — Architektonische Lichtstimmung',
  description:
    'Konfigurieren Sie architektonische Farbtemperaturen stufenlos von 2.200 K bis 4.000 K, Materialoberflächen und Lichtsteuerung in Echtzeit.',
};

export default function KonfiguratorPage() {
  return <KonfiguratorClient />;
}
