import type { Portfolio, PortfolioApp } from "../../domain/entities/portfolio";
import type { PortfolioRepository } from "../../domain/repositories/portfolio_repository";
import { portfolioLocalData } from "../datasources/portfolio_local_data_source";

export class PortfolioRepositoryImpl implements PortfolioRepository {
  getPortfolio(): Portfolio {
    return portfolioLocalData;
  }

  getAppById(id: string): PortfolioApp | undefined {
    return portfolioLocalData.apps.find((app) => app.id === id);
  }
}
