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
    const dataType = this.inputEl.dataset.type;
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
    if (
      inputValue &&
      dataType === "int" &&
      !Number.isInteger(Number(inputValue))
    ) {
      return {
        valid: false,
        message: `Can't be ${Number(inputValue)}`,
      };
    }
    return {
      valid: true,
      message: "",
    };
  }
}
