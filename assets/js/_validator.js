export default class Validator {
  constructor(inputEl) {
    this.inputEl = inputEl;
  }

  validate() {
    if (this.inputEl.type === "number") {
      return this.validateNumberInput();
    }
  }

  validateNumberInput() {
    const inputValue = this.inputEl.value;
    const isRequired = this.inputEl.required;
    const minInputValue = Number(this.inputEl.min);
    const maxInputValue = Number(this.inputEl.max);
    if (isRequired && !inputValue) {
      return {
        valid: false,
        message: "Required field",
      };
    }
    if (
      (inputValue && inputValue < minInputValue) ||
      inputValue > maxInputValue
    ) {
      return {
        valid: false,
        message: `Can't be ${
          Number(inputValue) === 0 ? "zero" : Number(inputValue)
        }`,
      };
    }
    return {
      valid: true,
      message: "",
    };
  }
}
