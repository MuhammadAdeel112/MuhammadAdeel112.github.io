export type Crop = {
  x: number;
  y: number;
  w: number;
  h: number;
};

export type AppView = {
  name: string;
  image: string;
  crop: Crop;
};

export type PortfolioApp = {
  id: string;
  title: string;
  type: string;
  desc: string;
  tags: string[];
  image: string;
  accent: string;
  mark: string;
  device: "phone" | "tablet";
  views: AppView[];
};

export type Skill = {
  mark: string;
  icon: string;
  title: string;
  desc: string;
  tags: string[];
  tone: string;
};

export type ExperienceItem = {
  index: string;
  date: string;
  role: string;
  company: string;
  desc: string;
  points: { lead?: string; highlight?: string; rest: string }[];
  tags: string[];
  isNow?: boolean;
  tone: "now" | "sky" | "muted";
};

export type Profile = {
  name: string;
  shortName: string;
  title: string;
  location: string;
  status: string;
  bio: string;
  stack: string[];
  roles: string[];
  email: string;
  linkedin: string;
  github: string;
  photo: string;
};

export type Portfolio = {
  profile: Profile;
  skills: Skill[];
  apps: PortfolioApp[];
  experience: ExperienceItem[];
};
