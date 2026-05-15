import {
  Code2,
  FileCode2,
  Braces,
  Globe,
  Palette,
  Cpu,
  Server,
  Shield,
  GitBranch,
  Cloud,
  DatabaseZap,
  Leaf,
  Link2,
  CreditCard,
  Database,
  Wrench,
  LucideIcon,
} from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  Code2,
  FileCode2,
  Braces,
  Globe,
  Palette,
  Cpu,
  Server,
  Shield,
  GitBranch,
  Cloud,
  DatabaseZap,
  Leaf,
  Link2,
  CreditCard,
  Database,
  Wrench,
};

export function getIcon(iconName: string | undefined): LucideIcon {
  if (!iconName) return Code2;
  return iconMap[iconName] || Code2;
}
