import { PortfolioRepositoryImpl } from "../../data/repositories/portfolio_repository_impl";
import type { PortfolioRepository } from "../../domain/repositories/portfolio_repository";

let portfolioRepository: PortfolioRepository | null = null;

export function getPortfolioRepository(): PortfolioRepository {
  if (!portfolioRepository) {
    portfolioRepository = new PortfolioRepositoryImpl();
  }
  return portfolioRepository;
}
