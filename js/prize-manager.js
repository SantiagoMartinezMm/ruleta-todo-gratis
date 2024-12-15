import { PRIZES } from './config.js';

export class PrizeManager {
    static selectPrize() {
        const random = Math.random();
        let cumulativeProbability = 0;
        
        for (const prize of PRIZES) {
            cumulativeProbability += prize.probability;
            if (random <= cumulativeProbability) {
                return prize;
            }
        }
        return PRIZES[PRIZES.length - 1];
    }

    static generateCode() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let code = '';
        for (let i = 0; i < 8; i++) {
            code += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return code;
    }
}