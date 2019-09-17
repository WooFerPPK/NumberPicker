export class NumberRandomizer {
    constructor(options) {
        this.numberIndex = options.numberIndex;
        this.maxNumber = options.maxNumber;
        this.lowestNumber = options.lowestNumber;
    }

    createNumbers() {
        const picks = [];
        for (let index = 0; index < this.numberIndex; index += 1) {
            picks.push(Math.floor(Math.random() * (this.maxNumber - this.lowestNumber + 1)) + this.lowestNumber);
        }
        return picks;
    }
}
