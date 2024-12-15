import { Prize } from '../js/models/Prize';

describe('Prize Class', () => {
    test('should create a prize with correct properties', () => {
        const prizeData = {
            name: 'Test Prize',
            description: 'Test Description',
            color: '#FF0000',
            textColor: '#FFFFFF',
            probability: 0.1,
            shortText: 'TEST'
        };

        const prize = new Prize(prizeData);
        expect(prize.name).toBe(prizeData.name);
        expect(prize.description).toBe(prizeData.description);
        expect(prize.color).toBe(prizeData.color);
        expect(prize.probability).toBe(prizeData.probability);
    });

    test('should validate probabilities correctly', () => {
        const prizes = [
            new Prize({ name: 'Prize 1', probability: 0.3 }),
            new Prize({ name: 'Prize 2', probability: 0.3 }),
            new Prize({ name: 'Prize 3', probability: 0.4 })
        ];

        expect(Prize.validateProbabilities(prizes)).toBe(true);
    });

    test('should detect invalid probabilities', () => {
        const prizes = [
            new Prize({ name: 'Prize 1', probability: 0.3 }),
            new Prize({ name: 'Prize 2', probability: 0.3 }),
            new Prize({ name: 'Prize 3', probability: 0.5 }) // Total > 1
        ];

        expect(Prize.validateProbabilities(prizes)).toBe(false);
    });
});
