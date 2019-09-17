export class NumberTools {
    constructor() {
        this.sortLowestToHighest = (numbers) => numbers.sort((a, b) => a - b);
        this.duplicatesCheck = (numbers) => {
            const duplicateFinder = numbers.filter((item, index) => numbers.indexOf(item) !== index);

            if (duplicateFinder.length === 0) {
                return true;
            }

            return false;
        };
    }
}