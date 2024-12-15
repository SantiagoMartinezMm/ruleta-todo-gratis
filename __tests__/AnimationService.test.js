import { AnimationService } from '../js/services/AnimationService';

describe('AnimationService', () => {
    let animationService;

    beforeEach(() => {
        animationService = new AnimationService();
        // Mock para requestAnimationFrame
        global.requestAnimationFrame = jest.fn(cb => setTimeout(cb, 0));
        global.cancelAnimationFrame = jest.fn(id => clearTimeout(id));
        global.performance = { now: jest.fn(() => Date.now()) };
    });

    test('should animate between values', done => {
        const from = 0;
        const to = 100;
        let lastValue = null;

        animationService.animate({
            from,
            to,
            duration: 100,
            onUpdate: value => {
                lastValue = value;
                expect(value).toBeGreaterThanOrEqual(from);
                expect(value).toBeLessThanOrEqual(to);
            },
            onComplete: () => {
                expect(lastValue).toBe(to);
                done();
            }
        });
    });

    test('should stop animation when requested', () => {
        const animationId = animationService.animate({
            from: 0,
            to: 100,
            duration: 1000
        });

        animationService.stop(animationId);
        expect(animationService.animations.has(animationId)).toBe(false);
    });

    test('easing functions should return expected values', () => {
        expect(AnimationService.easeOutCubic(0)).toBe(0);
        expect(AnimationService.easeOutCubic(1)).toBe(1);
        expect(AnimationService.easeOutElastic(0)).toBe(0);
        expect(Math.round(AnimationService.easeOutElastic(1))).toBe(1);
    });
});
