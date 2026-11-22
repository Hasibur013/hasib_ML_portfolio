import {
  ArrowLeft,
  ArrowRight,
  ArrowSquareOut,
  ArrowUp,
  BookOpenText,
  Brain,
  Briefcase,
  CaretDown,
  CaretRight,
  Check,
  CheckCircle,
  Circle,
  Clock,
  Cpu,
  DownloadSimple,
  EnvelopeSimple,
  Eye,
  Factory,
  FileText,
  FolderOpen,
  GearSix,
  GithubLogo,
  GraduationCap,
  House,
  ImageSquare,
  LightbulbFilament,
  Lightning,
  LinkedinLogo,
  List,
  X,
  MapPin,
  Moon,
  Phone,
  Sun,
  ShieldCheck,
  Sparkle,
  Stack,
  TrendUp,
  UserCircle,
  UsersThree,
  WarningCircle,
  WhatsappLogo,
  Wrench,
} from "@phosphor-icons/react";

function BrandSvg({ size = 18, className, children, viewBox = "0 0 24 24" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox={viewBox}
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  );
}

/** Kaggle brand mark (simple-icons path). */
function KaggleLogo({ size = 18, className }) {
  return (
    <BrandSvg size={size} className={className}>
      <path d="M18.825 7.257l-7.802 7.805 7.747 7.863H13.38L6.197 15.14l-1.167 1.17v5.615H1.543V1.123h3.487v10.63l11.394-11.39h5.052l-2.65 2.644z" />
    </BrandSvg>
  );
}

/** LeetCode brand mark (simple-icons path). */
function LeetCodeLogo({ size = 18, className }) {
  return (
    <BrandSvg size={size} className={className}>
      <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.12 5.12 0 0 0-.186 1.588c0 .695.14 1.358.42 1.981.28.62.68 1.17 1.2 1.65l.314.288 3.854 4.125 5.406 5.788A1.374 1.374 0 0 0 13.483 24h6.934a1.375 1.375 0 0 0 1.181-2.133l-5.406-5.788-2.89-3.093 2.89-3.094 5.406-5.788A1.375 1.375 0 0 0 20.417 0zm-5.011 12.324a1.377 1.377 0 0 1 .938-.4 1.38 1.38 0 0 1 .938.4l2.89 3.093-2.89 3.094a1.38 1.38 0 0 1-.938.4 1.377 1.377 0 0 1-.938-.4l-2.89-3.094z" />
    </BrandSvg>
  );
}

/** Google Scholar–style academic mark. */
function ScholarLogo({ size = 18, className }) {
  return (
    <BrandSvg size={size} className={className}>
      <path d="M12 2L1 7.5 12 13l8.25-4.125V15.5h2.25V7.5L12 2zM4.5 12.3v3.45c0 1.95 3.36 3.525 7.5 3.525s7.5-1.575 7.5-3.525V12.3L12 16.05 4.5 12.3z" />
    </BrandSvg>
  );
}

const ICONS = {
  arrowLeft: ArrowLeft,
  arrowRight: ArrowRight,
  arrowUp: ArrowUp,
  architecture: GearSix,
  book: BookOpenText,
  brain: Brain,
  briefcase: Briefcase,
  bulb: LightbulbFilament,
  cap: GraduationCap,
  check: Check,
  checkCircle: CheckCircle,
  chevronDown: CaretDown,
  chevronRight: CaretRight,
  clock: Clock,
  cpu: Cpu,
  download: DownloadSimple,
  dot: Circle,
  eye: Eye,
  externalLink: ArrowSquareOut,
  factory: Factory,
  file: FileText,
  github: GithubLogo,
  home: House,
  image: ImageSquare,
  kaggle: KaggleLogo,
  leetcode: LeetCodeLogo,
  lightning: Lightning,
  linkedin: LinkedinLogo,
  list: List,
  close: X,
  location: MapPin,
  mail: EnvelopeSimple,
  moon: Moon,
  phone: Phone,
  sun: Sun,
  repo: FolderOpen,
  scholar: ScholarLogo,
  shield: ShieldCheck,
  sparkle: Sparkle,
  stack: Stack,
  trend: TrendUp,
  user: UserCircle,
  users: UsersThree,
  warning: WarningCircle,
  whatsapp: WhatsappLogo,
  wrench: Wrench,
};

export default function Icon({ name, size = 18, weight = "regular", className }) {
  const Cmp = ICONS[name] || Circle;
  if (Cmp === KaggleLogo || Cmp === LeetCodeLogo || Cmp === ScholarLogo) {
    return <Cmp size={size} className={className} />;
  }
  return <Cmp size={size} weight={weight} className={className} />;
}
