import { NumberRandomizer } from './NumberRandomizer.js';
import { NumberTools } from './NumberTools.js';
import { RuleCheck } from './RuleCheck.js';

export class Picks {
    constructor(options) {
        this.pastResult = options.pastResult;
        this.numberRandomizer = new NumberRandomizer({
            numberIndex: options.numberIndex,
            maxNumber: options.maxNumber,
            lowestNumber: options.lowestNumber
        });
        this.numberTools = new NumberTools();
        this.RuleCheck = new RuleCheck({
            pastResult: this.pastResult,
            highThreshold: options.highThreshold,
            minSumNumber: options.minSumNumber,
            maxSumNumber: options.maxSumNumber,
            repeatHitAmount: options.repeatHitAmount,
            highAndLowValidAmounts: options.highAndLowValidAmounts,
            evenAndOddValidAmounts: options.evenAndOddValidAmounts
        });
        this.result = [];
    }

    get result() {
        return this._result;
    }

    set result(value) {
        if (value.length !== 0) {
            // Sort the numbers for human reasons
            this._result = this.sortNumbers(value);
        } else {
            this._result = [];
        }
    }

    generateNumbers() {
        return this.numberRandomizer.createNumbers();
    }

    duplicateNumberCheck(numbers) {
        return this.numberTools.duplicatesCheck(numbers);
    }

    sortNumbers(numbers) {
        return this.numberTools.sortLowestToHighest(numbers);
    }

    checkIfValid(numbers) {
        // Check if the numbers follow the rules.
        this.RuleCheck.numbers = numbers;

        const checkList = this.RuleCheck.runRulesChecklist();

        let ruleBroken = false;

        Object.entries(checkList).forEach((item) => {
            if (checkList[item] === false) {
                ruleBroken = true;
            }
        });

        if (ruleBroken === false) {
            return numbers;
        }

        return [];
    }

    run() {
        do {
            const numbers = this.generateNumbers();

            if (this.duplicateNumberCheck(numbers) === true) {
                // No Duplicates found
                // Check if the numbers match the rules. It will return nothing if they do not.
                this.result = this.checkIfValid(numbers);
            }
        }
        while (this.result.length === 0);
    }
}
