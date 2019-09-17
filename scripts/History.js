export class History {
    constructor() {
        this._inputedNumbers = [];
    }

    set inputedNumbers(input) {
        this._inputedNumbers.push(input);
    }

    get inputedNumbers() {
        return this._inputedNumbers;
    }
}
