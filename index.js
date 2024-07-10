const form = document.getElementById("myform");
const loader = document.getElementById("loader");

const errormessage = document.createElement("p");

const showError = () => {
  errormessage.textcontent = "something is wrong, please try again later";
  errormessage.style.color = "red";
  document.body.appendChild(errormessage);
};

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const amount = event.target.amount.value;

  const code = event.target.code.value;

  errormessage.textContent = "something is wrong, please try again later";

  loader.style.display = "block";

  fetch(`https://api.nbp.pl/api/exchangerates/rates/A/${code}/`)
    .then((response) => {
      if (!response.ok) {
        showError();
        return Promise.reject(response);
      }
      return response.json();
    })

    .then((data) => {
      if (!data) {
        showError();
        return;
      }

      const rate = data.rates[0].mid;
      if (!rate) {
        showError();
        return;
      }
      const convertedAmount = amount * rate;

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
