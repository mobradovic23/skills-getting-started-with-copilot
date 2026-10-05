document.addEventListener("DOMContentLoaded", () => {
  const loanForm = document.getElementById("loan-form");
  const results = document.getElementById("results");
  const errorMessage = document.getElementById("error-message");
  const currency = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  loanForm.addEventListener("submit", (event) => {
    event.preventDefault();
    errorMessage.hidden = true;
    results.hidden = true;

    const homePrice = Number(loanForm.elements["home-price"].value);
    const downPayment = Number(loanForm.elements["down-payment"].value);
    const annualRate = Number(loanForm.elements["interest-rate"].value);
    const years = Number(loanForm.elements["loan-term"].value);

    if (
      !Number.isFinite(homePrice) ||
      !Number.isFinite(downPayment) ||
      !Number.isFinite(annualRate) ||
      !Number.isFinite(years) ||
      homePrice <= 0 ||
      downPayment < 0 ||
      downPayment >= homePrice ||
      annualRate < 0 ||
      annualRate > 100 ||
      !Number.isInteger(years) ||
      years < 1 ||
      years > 50
    ) {
      errorMessage.textContent =
        "Enter a positive home price, a down payment below the home price, a rate from 0% to 100%, and a loan term from 1 to 50 whole years.";
      errorMessage.hidden = false;
      return;
    }

    const principal = homePrice - downPayment;
    const numberOfPayments = years * 12;
    const monthlyRate = annualRate / 100 / 12;
    const monthlyPayment =
      monthlyRate === 0
        ? principal / numberOfPayments
        : (principal * monthlyRate) /
          (1 - Math.pow(1 + monthlyRate, -numberOfPayments));
    const totalPaid = monthlyPayment * numberOfPayments;

    document.getElementById("monthly-payment").textContent = currency.format(monthlyPayment);
    document.getElementById("loan-amount").textContent = currency.format(principal);
    document.getElementById("total-paid").textContent = currency.format(totalPaid);
    document.getElementById("total-interest").textContent = currency.format(totalPaid - principal);
    results.hidden = false;
  });
});
