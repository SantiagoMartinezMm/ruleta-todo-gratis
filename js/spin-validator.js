export class SpinValidator {
    static canSpin() {
        const lastSpin = localStorage.getItem('lastSpinTime');
        if (!lastSpin) return true;

        const now = new Date();
        const lastSpinDate = new Date(lastSpin);
        const hoursSinceLastSpin = (now - lastSpinDate) / (1000 * 60 * 60);

        return hoursSinceLastSpin >= 24;
    }

    static getTimeUntilNextSpin() {
        const lastSpin = localStorage.getItem('lastSpinTime');
        if (!lastSpin) return null;

        const now = new Date();
        const lastSpinDate = new Date(lastSpin);
        const nextSpinDate = new Date(lastSpinDate.getTime() + (24 * 60 * 60 * 1000));
        const hoursRemaining = Math.ceil((nextSpinDate - now) / (1000 * 60 * 60));
        
        return hoursRemaining;
    }

    static recordSpin() {
        localStorage.setItem('lastSpinTime', new Date().toISOString());
    }
}