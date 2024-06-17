const selectFrom = document.getElementById("from");
const button = document.getElementById("button");
const form = document.getElementById("myform");
const loader = document.getElementById("loader");

const errormessage = document.createElement("p");

window.onload = function () {
  countryCodes = ["EUR", "CHF", "USD"];
  countryCodes.forEach((countryCode) => {
    const optionFrom = document.createElement("option");
    optionFrom.text = countryCode;
    selectFrom.add(optionFrom);
  });
};

const showError = () => {
  errormessage.textcontent = "We have a problem";
  errormessage.style.color = "red";
  document.body.appendChild(errormessage);
};

button.addEventListener("click", () => {
  errormessage.textContent = "";

  const amount = document.getElementById("amount").value;
  const from = document.getElementById("from").value;

  // Show the loader
  loader.style.display = "block";

  fetch(`http://api.nbp.pl/api/exchangerates/rates/a/${from}/today/`)
    .then((response) => response.json())

    .then((data) => {
      if (!data) {
        showError();
        return;
      }

      const rate = data.rates[0].mid;
      const convertedAmount = amount * rate;

      document.getElementById("pln").innerText = ` ${convertedAmount.toFixed(
        2
      )} `;
      // Hide the loader
      loader.style.display = "none";
    })
    .catch(() => {
      showError();
      // Hide the loader
      loader.style.display = "none";
    });
});
