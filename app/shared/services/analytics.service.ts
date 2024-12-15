import { Observable } from '@nativescript/core';
import { SpinResult } from '../models/prize.model';

export class AnalyticsService extends Observable {
  private spins: SpinResult[] = [];

  logSpin(result: SpinResult): void {
    this.spins.push(result);
    this.saveSpins();
  }

  getDailyStats(): { totalSpins: number; prizeDistribution: Record<string, number> } {
    const today = new Date();
    const todaySpins = this.spins.filter(spin => {
      return spin.timestamp.toDateString() === today.toDateString();
    });

    const distribution: Record<string, number> = {};
    todaySpins.forEach(spin => {
      distribution[spin.prize.name] = (distribution[spin.prize.name] || 0) + 1;
    });

    return {
      totalSpins: todaySpins.length,
      prizeDistribution: distribution
    };
  }

  private saveSpins(): void {
    // In a real app, this would persist to storage
    console.log('Saving spins:', this.spins);
  }
}