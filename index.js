const form = document.getElementById("myform");
const loader = document.getElementById("loader");

const errormessage = document.createElement("p");

const showError = () => {
  errormessage.textcontent = "We have a problem";
  errormessage.style.color = "red";
  document.body.appendChild(errormessage);
};

//const amount = document.getElementsByName("amount").value;
//const code = document.getElementsByName("code").value;

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const amount = event.target.amount.value;

  const code = event.target.code.value;

  errormessage.textContent = "";

  loader.style.display = "block";

  fetch(`https://api.nbp.pl/api/exchangerates/rates/A/${code}/`)
    .then((response) => {
      if (!response.ok) {
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
      if (rate) {
        const convertedAmount = amount * rate;

        document.getElementById("pln").innerText = ` ${convertedAmount.toFixed(
          2
        )} `;

        loader.style.display = "none";
      }
    })
    .catch(() => {
      showError();

      loader.style.display = "none";
    });
});
