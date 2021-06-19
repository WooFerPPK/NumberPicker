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
    for (let i = 0; i < this._numbers.length; i++) {
      this._numbers[i] = parseInt(this._numbers[i]);
    }
    return this._numbers;
  }
  
  set numbers(numbers) {
    this._numbers = numbers;
  }
  
  highsAndLowsCheck() {
    const numbersLength = this.numbers.length;
    const numberDivded = numbersLength / 2;
    const numberLimits = {
      floor: Math.floor(numberDivded),
      ceil: Math.ceil(numberDivded)
    }
    let highNumberAmount = 0;
    
    for(let i = 0; i <= numbersLength ; i++) {
      if (this.numbers[i] >= this.highThreshold) {
        highNumberAmount += 1;
      }
    }
    
    if (highNumberAmount === numberLimits.floor || highNumberAmount === numberLimits.ceil) {
      return true;
    }
    return false;
  }
  
  oddAndEvenCheck() {
    const numbersLength = this.numbers.length;
    const numberDivded = numbersLength / 2;
    const numberLimits = {
      floor: Math.floor(numberDivded),
      ceil: Math.ceil(numberDivded)
    }
    let evenNumberAmount = 0;
    
    for(let i = 0; i <= numbersLength ; i++) {
      if (this.numbers[i] % 2 == 0) {
        evenNumberAmount += 1;
      }
    }
    
    if (evenNumberAmount === numberLimits.floor || evenNumberAmount === numberLimits.ceil) {
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
    // If null, then this is valid because no numbers to check for repeats was inputed.
    return true;
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
