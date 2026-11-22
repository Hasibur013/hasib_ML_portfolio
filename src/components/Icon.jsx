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

/** ResearchGate brand mark (simple-icons path). */
function ResearchGateLogo({ size = 18, className }) {
  return (
    <BrandSvg size={size} className={className}>
      <path d="M19.586 0c.898 0 1.629.727 1.629 1.625v20.75c0 .898-.731 1.625-1.629 1.625H4.414A1.626 1.626 0 0 1 2.785 22.375V1.625C2.785.727 3.516 0 4.414 0zm-2.5 5.625c-1.292 0-2.229.927-2.229 2.208v.042c0 1.281.937 2.208 2.229 2.208 1.292 0 2.229-.927 2.229-2.208v-.042c0-1.281-.937-2.208-2.229-2.208zm-6.021 0c-1.927 0-3.188 1.323-3.188 3.292 0 1.969 1.261 3.291 3.188 3.291.646 0 1.25-.146 1.75-.417v1.552c0 1.115-.667 1.75-1.771 1.75-.937 0-1.583-.5-1.75-1.25l-1.583.333c.354 1.542 1.687 2.417 3.333 2.417 2.021 0 3.396-1.146 3.396-3.292V8.146h-1.542v.5a2.54 2.54 0 0 0-1.833-.646zm6.021 1.292c.583 0 .979.396.979.916v.042c0 .521-.396.917-.979.917-.583 0-.979-.396-.979-.917v-.042c0-.52.396-.916.979-.916zm-6.021 1.25c.833 0 1.396.625 1.396 1.5s-.563 1.5-1.396 1.5-1.396-.625-1.396-1.5.563-1.5 1.396-1.5z" />
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
  researchgate: ResearchGateLogo,
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
  if (
    Cmp === KaggleLogo ||
    Cmp === LeetCodeLogo ||
    Cmp === ScholarLogo ||
    Cmp === ResearchGateLogo
  ) {
    return <Cmp size={size} className={className} />;
  }
  return <Cmp size={size} weight={weight} className={className} />;
}
