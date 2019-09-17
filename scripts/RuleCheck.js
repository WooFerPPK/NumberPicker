export class RuleCheck {
    constructor(options) {
        this.pastResult = options.pastResult;
        this.highThreshold = options.highThreshold;
        this.minSumNumber = options.minSumNumber;
        this.maxSumNumber = options.maxSumNumber;
        this.repeatHitAmount = options.repeatHitAmount;
        this.highAndLowValidAmounts = options.highAndLowValidAmounts;
        this.evenAndOddValidAmounts = options.evenAndOddValidAmounts;
    }

    get numbers() {
        return this._numbers;
    }

    set numbers(numbers) {
        this._numbers = numbers;
    }

    highsAndLowsCheck() {
        const validAmounts = this.highAndLowValidAmounts;

        const rangeTypes = { highs: 0, lows: 0 };

        this.numbers.forEach((number) => {
            if (number >= this.highThreshold) {
                rangeTypes.highs += 1;
            } else {
                rangeTypes.lows += 1;
            }
        });

        let highValid = false;
        validAmounts.high.forEach((amount) => {
            if (rangeTypes.highs === amount) {
                highValid = true;
            }
        });

        let lowValid = false;
        validAmounts.low.forEach((amount) => {
            if (rangeTypes.lows === amount) {
                lowValid = true;
            }
        });

        if (highValid === true && lowValid === true) {
            return true;
        }

        return false;
    }

    oddAndEvenCheck() {
        const validAmounts = this.evenAndOddValidAmounts;
        const numberType = { even: 0, odd: 0 };

        this.numbers.forEach((number) => {
            if (number % 2 == 0) {
                numberType.even += 1;
            } else {
                numberType.odd += 1;
            }
        });

        let evenValid = false;
        validAmounts.even.forEach((amount) => {
            if (numberType.even === amount) {
                evenValid = true;
            }
        });

        let oddValid = false;
        validAmounts.odd.forEach((amount) => {
            if (numberType.odd === amount) {
                oddValid = true;
            }
        });

        if (evenValid === true && oddValid === true) {
            return true;
        }

        return false;
    }

    sumOfNumbersCheck() {
        const sum = this.numbers.reduce((a, b) => a + b);

        if (sum < this.minSumNumber || sum > this.maxSumNumber) {
            return false;
        }

        return true;
    }

    repeatHitCheck() {
        const REPEAT_AMOUNT = this.repeatHitAmount;
        if (this.pastResult) {
            const combinedResults = this.pastResult.concat(this.numbers);
            const duplicateFinder = combinedResults.filter((item, index) => combinedResults.indexOf(item) !== index);
            if (duplicateFinder.length === REPEAT_AMOUNT) {
                return true;
            }
            return false;
        }
        return false;
    }

    runRulesChecklist() {
        return {
            highsAndLows: this.highsAndLowsCheck(),
            oddAndEven: this.oddAndEvenCheck(),
            sumOfNumbers: this.sumOfNumbersCheck(),
            repeatOnceHit: this.repeatHitCheck()
        };
    }
}
