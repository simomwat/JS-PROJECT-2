const button = document.getElementsByName("button");
const form = document.getElementById("myform");
const loader = document.getElementById("loader");

const errormessage = document.createElement("p");

const showError = () => {
  errormessage.textcontent = "We have a problem";
  errormessage.style.color = "red";
  document.body.appendChild(errormessage);
};

const amount = document.getElementsByName("amount").value;
const code = document.getElementsByName("code").value;

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const amount = event.target.amount.value;

  const code = event.target.code.value;

  console.log(code);

  errormessage.textContent = "";

  loader.style.display = "block";

  fetch(`https://api.nbp.pl/api/exchangerates/rates/a/${code}/today/`)
    //fetch(`http://api.nbp.pl/api/exchangerates/rates/a/${code}/2024-06-21/`)
    .then((response) => response.json())

    .then((data) => {
      if (!data) {
        showError();
        return;
      }

      const rate = data.rates[0].mid;
      console.log(rate);

      const convertedAmount = amount * rate;
      console.log(convertedAmount);

      document.getElementById("pln").innerText = ` ${convertedAmount.toFixed(
        2
      )} `;

      loader.style.display = "none";
    })
    .catch(() => {
      showError();

      loader.style.display = "none";
    });
});
