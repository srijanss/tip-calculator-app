(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const l of s.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&r(l)}).observe(document,{childList:!0,subtree:!0});function e(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(i){if(i.ep)return;i.ep=!0;const s=e(i);fetch(i.href,s)}})();class u{constructor(t){this.inputEl=t}validate(){if(this.inputEl.type==="number")return this.validateNumberInput()}validateNumberInput(){const t=this.inputEl.value,e=this.inputEl.required,r=Number(this.inputEl.min),i=Number(this.inputEl.max),s=this.inputEl.dataset.type;return e&&!t?{valid:!1,message:"Required field"}:t&&t<r||t>i?{valid:!1,message:`Can't be ${Number(t)===0?"zero":Number(t)}`}:t&&s==="int"&&!Number.isInteger(Number(t))?{valid:!1,message:`Can't be ${Number(t)}`}:{valid:!0,message:""}}}class o extends HTMLElement{constructor(){self=super(),this.calculatorResult=null,this.calculatorInput=null}connectedCallback(){this.form=self.querySelector("form[name='tip-calculator']"),this.billAmountInput=this.form.querySelector("input[name='bill-amount']"),this.customTipInput=this.form.querySelector("input[name='custom-tip']"),this.numberOfPeopleInput=this.form.querySelector("input[name='number-of-people']"),this.fixedTipButtons=this.form.querySelectorAll(".tip-button"),this.tipResultBlock=self.querySelector(".tip-result"),this.tipAmountTd=this.tipResultBlock.querySelector(".tip-amount"),this.totalAmountTd=this.tipResultBlock.querySelector(".total-amount"),this.resetButton=this.tipResultBlock.querySelector(".tip-result__reset-btn"),this.init()}init(){this.resetCalculator(),this.registerListeners()}resetCalculator(){this.calculatorInput={billAmount:0,tipPercentage:0,numberOfPeople:0},this.calculatorResult={tipAmount:0,totalAmount:0,tipAmountPerPerson:0,totalAmountPerPerson:0},this.form.reset(),this.resetActiveFixedTipButton(),this.resetTipResult()}calculateTip(){const{billAmount:t,tipPercentage:e,numberOfPeople:r}=this.calculatorInput;this.calculatorResult.tipAmount=t*e/100,this.calculatorResult.tipAmountPerPerson=this.calculatorResult.tipAmount/r,this.calculatorResult.totalAmount=t+this.calculatorResult.tipAmount,this.calculatorResult.totalAmountPerPerson=this.calculatorResult.totalAmount/r}updateTipResult(){this.tipAmountTd.textContent=this.currencyFormat(this.calculatorResult.tipAmountPerPerson),this.totalAmountTd.textContent=this.currencyFormat(this.calculatorResult.totalAmountPerPerson),this.resetButton.disabled=!1}resetTipResult(){this.tipAmountTd.textContent=this.currencyFormat(0),this.totalAmountTd.textContent=this.currencyFormat(0),this.resetButton.disabled=!0}registerListeners(){this.form.addEventListener("submit",t=>{t.preventDefault()}),this.billAmountInput.addEventListener("input",t=>{this.clearInputError(this.billAmountInput),this.handleBillAmountInput(t)}),this.billAmountInput.addEventListener("keydown",t=>{t.key==="Enter"&&t.preventDefault()}),this.billAmountInput.addEventListener("focus",t=>this.clearInputError(this.billAmountInput)),this.customTipInput.addEventListener("input",t=>{this.clearInputError(this.customTipInput),this.handleCustomTipInput(t)}),this.customTipInput.addEventListener("keydown",t=>{t.key==="Enter"&&t.preventDefault()}),this.customTipInput.addEventListener("focus",t=>this.clearInputError(this.customTipInput)),this.numberOfPeopleInput.addEventListener("input",t=>{this.clearInputError(this.numberOfPeopleInput),this.handleNumberOfPeopleInput(t)}),this.numberOfPeopleInput.addEventListener("keydown",t=>{t.key==="Enter"&&t.preventDefault()}),this.numberOfPeopleInput.addEventListener("focus",t=>this.clearInputError(this.numberOfPeopleInput)),Array.from(this.fixedTipButtons).forEach(t=>{t.addEventListener("click",e=>this.handleFixedTipButtonClick(e))}),this.resetButton.addEventListener("click",t=>this.handleResetButtonClick(t))}getFormGroupElement(t){let e=t.parentElement;return e.classList.contains("form__group")||(e=e.parentElement),e}showInputError(t,e){t.classList.add("error");const i=this.getFormGroupElement(t).querySelector(".error-text");i.textContent=e,i.classList.add("active")}clearInputError(t){t.classList.remove("error");const r=this.getFormGroupElement(t).querySelector(".error-text");r.textContent="",r.classList.remove("active")}handleBillAmountInput(t){const r=new u(t.target).validate();r.valid?(this.calculatorInput.billAmount=Number(t.target.value),this.isCalculatorInputValid()&&(this.calculateTip(),this.updateTipResult())):(this.showInputError(t.target,r.message),this.resetTipResult())}handleCustomTipInput(t){if(this.resetActiveFixedTipButton(),t.target.value===""){this.clearInputError(t.target),this.calculatorInput.tipPercentage=0;return}const r=new u(t.target).validate();r.valid?(this.calculatorInput.tipPercentage=Number(t.target.value),this.isValidForm()&&(this.calculateTip(),this.updateTipResult())):(this.showInputError(t.target,r.message),this.resetTipResult())}resetActiveFixedTipButton(){Array.from(this.fixedTipButtons).forEach(t=>{t.classList.remove("active")})}handleFixedTipButtonClick(t){this.resetActiveFixedTipButton(),this.customTipInput.value="",this.clearInputError(this.customTipInput),this.calculatorInput.tipPercentage=Number(t.target.dataset.tip),t.target.classList.add("active"),this.isValidForm()&&(this.calculateTip(),this.updateTipResult())}handleNumberOfPeopleInput(t){const r=new u(t.target).validate();r.valid?(this.calculatorInput.numberOfPeople=Number(t.target.value),this.isCalculatorInputValid()&&(this.calculateTip(),this.updateTipResult())):(this.showInputError(t.target,r.message),this.resetTipResult())}handleResetButtonClick(){this.resetCalculator()}isCalculatorInputValid(){return this.calculatorInput.billAmount>0&&this.calculatorInput.tipPercentage>0&&this.calculatorInput.numberOfPeople>0}isValidForm(){const t=[{input:this.billAmountInput,isValid:this.calculatorInput.billAmount>0,value:this.calculatorInput.billAmount},{input:this.customTipInput,isValid:this.calculatorInput.tipPercentage>0,value:this.calculatorInput.tipPercentage},{input:this.numberOfPeopleInput,isValid:this.calculatorInput.numberOfPeople>0,value:this.calculatorInput.numberOfPeople}];for(const e of t){const i=new u(e.input).validate();e.isValid=i.valid,e.isValid||this.showInputError(e.input,i.message)}return t.every(e=>e.isValid)}currencyFormat(t){return`$${Number(t).toFixed(2)}`}}customElements.define("tip-calculator",o,{extends:"section"});