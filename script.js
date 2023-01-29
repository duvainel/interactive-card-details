function select(queryString) {
  return document.getElementById(queryString);
}

function formatCardNumber(rowValue) {
  let formatedValue = "";
  rowValue.split("").forEach((char, index) => {
    if (index > 15) return;
    if (index % 4 === 3) {
      formatedValue += char + " ";
    } else {
      formatedValue += char;
    }
  });
  return formatedValue || "0000 0000 0000 0000";
}

const formDOM = select("cardForm");
const completeState = document.querySelector(".complete-state");
const continueBtn = select("btn-continue");
const inputs = Array.from(formDOM.getElementsByTagName("input"));

//Input selection
const cardName = select("cardName");
const cardNumber = select("cardNumber");
const cardMonth = select("cardMonth");
const cardYear = select("cardYear");
const cardCvc = select("cardCvc");

//Output Selection
const outputCardName = select("outputCardName");
const outputCardNumber = select("outputCardNumber");
const outputCardMonth = select("outputCardMonth");
const outputCardYear = select("outputCardYear");
const outputCardCvc = select("outputCardCvc");

continueBtn.addEventListener("click", () => {
  formDOM.style.display = "flex";
  completeState.style.display = "none";
  inputs.forEach((item) => {
    item.value = "";
  });
});

cardNumber.addEventListener("input", function () {
  outputCardNumber.innerHTML = "";
  outputCardNumber.innerHTML = formatCardNumber(cardNumber.value);
});
cardName.addEventListener("input", function () {
  outputCardName.innerHTML = "";
  outputCardName.innerHTML = cardName.value || "Jane Appleseed";
});
cardMonth.addEventListener("input", function () {
  outputCardMonth.innerHTML = "";
  outputCardMonth.innerHTML = cardMonth.value || "00";
});
cardYear.addEventListener("input", function () {
  outputCardYear.innerHTML = "";
  outputCardYear.innerHTML = cardYear.value || "00";
});
cardCvc.addEventListener("input", function () {
  outputCardCvc.innerHTML = "";
  outputCardCvc.innerHTML = cardCvc.value || "000";
});

function formSubmit(event) {
  event.preventDefault();

  let hasErrors = false;

  for (let i = 0; i < inputs.length; i++) {
    const input = inputs[i];
    const inputId = input.id;
    const errorMessageEl = select(inputId + "-error");
    if (inputs[i].value === "") {
      hasErrors = true;
      inputs[i].classList.add("error");
      errorMessageEl.innerHTML = "Can't be blank";
    } else {
      inputs[i].classList.remove("error");
      errorMessageEl.innerHTML = "";
      if (cardNumber.value.length < 16) {
        cardNumber.classList.add("error");
        select("cardNumber-error").innerHTML = "16 characters must be entered";
        return false;
      }
      if (cardMonth.value.length < 2) {
        cardMonth.classList.add("error");
        select("cardMonth-error").innerHTML = "2 characters must be entered";
        return false;
      }
      if (cardYear.value.length < 2) {
        cardYear.classList.add("error");
        select("cardYear-error").innerHTML = "2 characters must be entered";
        return false;
      }
    }
  }

  if (hasErrors == true) {
    return false;
  } else {
    formDOM.style.display = "none";
    completeState.style.display = "flex";
  }
}
formDOM.addEventListener("submit", formSubmit);
