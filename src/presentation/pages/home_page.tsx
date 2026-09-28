import { useEffect } from "react";
import { getPortfolioRepository } from "../../core/di/locator";
import { ContactSection } from "../features/contact/contact_section";
import { ExperienceSection } from "../features/experience/experience_section";
import { HeroSection } from "../features/hero/hero_section";
import { AppStage } from "../features/projects/app_stage";
import { ProjectsSection } from "../features/projects/projects_section";
import { SkillsSection } from "../features/skills/skills_section";
import { useLockBody } from "../hooks/use_lock_body";
import { useReveal } from "../hooks/use_reveal";
import { Cursor } from "../widgets/cursor";
import { MeshBackground } from "../widgets/mesh_background";
import { MobileNav } from "../widgets/mobile_nav";
import { SiteFooter } from "../widgets/site_footer";
import { SiteHeader } from "../widgets/site_header";

export function HomePage() {
  const portfolio = getPortfolioRepository().getPortfolio();
  useLockBody();
  useReveal();

  useEffect(() => {
    document.title = `${portfolio.profile.name} | ${portfolio.profile.title}`;
  }, [portfolio.profile.name, portfolio.profile.title]);

  return (
    <>
      <Cursor />
      <MeshBackground />
      <SiteHeader />
      <MobileNav />
      <main>
        <HeroSection profile={portfolio.profile} />
        <SkillsSection skills={portfolio.skills} />
        <ProjectsSection apps={portfolio.apps} />
        <ExperienceSection items={portfolio.experience} />
        <ContactSection profile={portfolio.profile} />
      </main>
      <SiteFooter />
      <AppStage />
    </>
  );
}
