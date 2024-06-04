import Validator from "./_validator";

export default class TipCalculator extends HTMLElement {
  constructor() {
    self = super();
    this.calculatorResult = null;
    this.calculatorInput = null;
  }

  connectedCallback() {
    this.form = self.querySelector("form[name='tip-calculator']");
    this.billAmountInput = this.form.querySelector("input[name='bill-amount']");
    this.customTipInput = this.form.querySelector("input[name='custom-tip']");
    this.numberOfPeopleInput = this.form.querySelector(
      "input[name='number-of-people']"
    );
    this.fixedTipButtons = this.form.querySelectorAll(".tip-button");

    this.tipResultBlock = self.querySelector(".tip-result");
    this.tipAmountTd = this.tipResultBlock.querySelector(".tip-amount");
    this.totalAmountTd = this.tipResultBlock.querySelector(".total-amount");
    this.resetButton = this.tipResultBlock.querySelector(
      ".tip-result__reset-btn"
    );
    this.init();
  }

  init() {
    this.resetCalculator();
    this.registerListeners();
  }

  resetCalculator() {
    this.calculatorInput = {
      billAmount: 0,
      tipPercentage: 0,
      numberOfPeople: 0,
    };
    this.calculatorResult = {
      tipAmount: 0,
      totalAmount: 0,
      tipAmountPerPerson: 0,
      totalAmountPerPerson: 0,
    };
    this.form.reset();
    this.resetActiveFixedTipButton();
    this.resetTipResult();
  }

  calculateTip() {
    const { billAmount, tipPercentage, numberOfPeople } = this.calculatorInput;

    this.calculatorResult.tipAmount = (billAmount * tipPercentage) / 100;
    this.calculatorResult.tipAmountPerPerson =
      this.calculatorResult.tipAmount / numberOfPeople;
    this.calculatorResult.totalAmount =
      billAmount + this.calculatorResult.tipAmount;
    this.calculatorResult.totalAmountPerPerson =
      this.calculatorResult.totalAmount / numberOfPeople;
  }

  updateTipResult() {
    this.tipAmountTd.textContent = this.currencyFormat(
      this.calculatorResult.tipAmountPerPerson
    );
    this.totalAmountTd.textContent = this.currencyFormat(
      this.calculatorResult.totalAmountPerPerson
    );
    this.resetButton.disabled = false;
  }

  resetTipResult() {
    this.tipAmountTd.textContent = this.currencyFormat(0);
    this.totalAmountTd.textContent = this.currencyFormat(0);
    this.resetButton.disabled = true;
  }

  registerListeners() {
    this.form.addEventListener("submit", (event) => {
      event.preventDefault();
    });
    this.billAmountInput.addEventListener("input", (e) => {
      this.clearInputError(this.billAmountInput);
      this.handleBillAmountInput(e);
    });
    this.billAmountInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
      }
    });
    this.billAmountInput.addEventListener("focus", (e) =>
      this.clearInputError(this.billAmountInput)
    );
    this.customTipInput.addEventListener("input", (e) => {
      this.clearInputError(this.customTipInput);
      this.handleCustomTipInput(e);
    });
    this.customTipInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
      }
    });
    this.customTipInput.addEventListener("focus", (e) =>
      this.clearInputError(this.customTipInput)
    );
    this.numberOfPeopleInput.addEventListener("input", (e) => {
      this.clearInputError(this.numberOfPeopleInput);
      this.handleNumberOfPeopleInput(e);
    });
    this.numberOfPeopleInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
      }
    });
    this.numberOfPeopleInput.addEventListener("focus", (e) =>
      this.clearInputError(this.numberOfPeopleInput)
    );
    Array.from(this.fixedTipButtons).forEach((button) => {
      button.addEventListener("click", (e) =>
        this.handleFixedTipButtonClick(e)
      );
    });
    this.resetButton.addEventListener("click", (e) =>
      this.handleResetButtonClick(e)
    );
  }

  getFormGroupElement(el) {
    let parentEl = el.parentElement;
    if (!parentEl.classList.contains("form__group")) {
      parentEl = parentEl.parentElement;
    }
    return parentEl;
  }

  showInputError(inputEl, message) {
    inputEl.classList.add("error");
    const formGroupEL = this.getFormGroupElement(inputEl);
    const errorEl = formGroupEL.querySelector(".error-text");
    errorEl.textContent = message;
    errorEl.classList.add("active");
  }

  clearInputError(inputEl) {
    inputEl.classList.remove("error");
    const formGroupEL = this.getFormGroupElement(inputEl);
    const errorEl = formGroupEL.querySelector(".error-text");
    errorEl.textContent = "";
    errorEl.classList.remove("active");
  }

  handleBillAmountInput(e) {
    const validator = new Validator(e.target);
    const validationResult = validator.validate();
    if (!validationResult.valid) {
      this.showInputError(e.target, validationResult.message);
      this.resetTipResult();
    } else {
      this.calculatorInput.billAmount = Number(e.target.value);
      if (this.isCalculatorInputValid()) {
        this.calculateTip();
        this.updateTipResult();
      }
    }
  }

  handleCustomTipInput(e) {
    this.resetActiveFixedTipButton();
    if (e.target.value === "") {
      this.clearInputError(e.target);
      this.calculatorInput.tipPercentage = 0;
      return;
    }
    const validator = new Validator(e.target);
    const validationResult = validator.validate();
    if (!validationResult.valid) {
      this.showInputError(e.target, validationResult.message);
      this.resetTipResult();
    } else {
      this.calculatorInput.tipPercentage = Number(e.target.value);
      if (this.isValidForm()) {
        this.calculateTip();
        this.updateTipResult();
      }
    }
  }

  resetActiveFixedTipButton() {
    Array.from(this.fixedTipButtons).forEach((button) => {
      button.classList.remove("active");
    });
  }

  handleFixedTipButtonClick(e) {
    this.resetActiveFixedTipButton();
    this.customTipInput.value = "";
    this.clearInputError(this.customTipInput);
    this.calculatorInput.tipPercentage = Number(e.target.dataset.tip);
    e.target.classList.add("active");
    if (this.isValidForm()) {
      this.calculateTip();
      this.updateTipResult();
    }
  }

  handleNumberOfPeopleInput(e) {
    const validator = new Validator(e.target);
    const validationResult = validator.validate();
    if (!validationResult.valid) {
      this.showInputError(e.target, validationResult.message);
      this.resetTipResult();
    } else {
      this.calculatorInput.numberOfPeople = Number(e.target.value);
      if (this.isCalculatorInputValid()) {
        this.calculateTip();
        this.updateTipResult();
      }
    }
  }

  handleResetButtonClick() {
    this.resetCalculator();
  }

  isCalculatorInputValid() {
    return (
      this.calculatorInput.billAmount > 0 &&
      this.calculatorInput.tipPercentage > 0 &&
      this.calculatorInput.numberOfPeople > 0
    );
  }

  isValidForm() {
    const formElements = [
      {
        input: this.billAmountInput,
        isValid: this.calculatorInput.billAmount > 0 ? true : false,
        value: this.calculatorInput.billAmount,
      },
      {
        input: this.customTipInput,
        isValid: this.calculatorInput.tipPercentage > 0 ? true : false,
        value: this.calculatorInput.tipPercentage,
      },
      {
        input: this.numberOfPeopleInput,
        isValid: this.calculatorInput.numberOfPeople > 0 ? true : false,
        value: this.calculatorInput.numberOfPeople,
      },
    ];

    for (const element of formElements) {
      const validator = new Validator(element.input);
      const validationResult = validator.validate();
      element.isValid = validationResult.valid;
      if (!element.isValid) {
        this.showInputError(element.input, validationResult.message);
      }
    }
    return formElements.every((element) => element.isValid);
  }

  currencyFormat(value) {
    return `$${Number(value).toFixed(2)}`;
  }
}
