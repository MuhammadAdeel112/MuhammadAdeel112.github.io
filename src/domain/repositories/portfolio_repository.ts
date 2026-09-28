import type { Portfolio, PortfolioApp } from "../entities/portfolio";

export interface PortfolioRepository {
  getPortfolio(): Portfolio;
  getAppById(id: string): PortfolioApp | undefined;
}
