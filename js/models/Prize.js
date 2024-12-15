export class Prize {
    constructor({name, description, color, textColor, probability, shortText}) {
        this.name = name;
        this.description = description;
        this.color = color;
        this.textColor = textColor;
        this.probability = probability;
        this.shortText = shortText;
    }

    static validateProbabilities(prizes) {
        const totalProbability = prizes.reduce((sum, prize) => sum + prize.probability, 0);
        return Math.abs(totalProbability - 1) < 0.0001; // Permitimos un pequeño margen de error
    }
}
