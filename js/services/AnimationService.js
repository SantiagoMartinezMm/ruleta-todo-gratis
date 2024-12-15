export class AnimationService {
    constructor() {
        this.animations = new Map();
    }

    animate(params) {
        const {
            duration = 1000,
            from = 0,
            to = 0,
            easing = t => t,
            onUpdate = () => {},
            onComplete = () => {}
        } = params;

        const startTime = performance.now();
        const animationId = Math.random().toString(36);

        const update = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = easing(progress);
            const currentValue = from + (to - from) * easedProgress;

            onUpdate(currentValue);

            if (progress < 1) {
                this.animations.set(animationId, requestAnimationFrame(update));
            } else {
                onComplete();
                this.animations.delete(animationId);
            }
        };

        this.animations.set(animationId, requestAnimationFrame(update));
        return animationId;
    }

    stop(animationId) {
        if (this.animations.has(animationId)) {
            cancelAnimationFrame(this.animations.get(animationId));
            this.animations.delete(animationId);
        }
    }

    // Funciones de easing comunes
    static easeOutCubic(t) {
        return 1 - Math.pow(1 - t, 3);
    }

    static easeOutElastic(t) {
        const p = 0.3;
        return Math.pow(2, -10 * t) * Math.sin((t - p / 4) * (2 * Math.PI) / p) + 1;
    }
}
