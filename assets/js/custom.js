window.addEventListener("load", function () {
  // all the elements from html
  const progress = document.getElementById("progress");
  const daysLeft = document.getElementById("remaining-days");
  const form = document.getElementById("form");
  const donationAmount = document.getElementById("donation-amount");
  const donors = document.getElementById("donors");
  const error = document.getElementById("error");
  const toolTipValue = document.getElementById("toolTip-value");
  const save = document.getElementById("save");



  let localDonorNum = parseInt(localStorage.getItem("donorsAmount"))
    ? parseInt(localStorage.getItem("donorsAmount"))
    : 0;

  let localToolTipVal = parseInt(localStorage.getItem("tooltipvalue"))
    ? parseInt(localStorage.getItem("tooltipvalue"))
    : 0;

  let localAmount = parseInt(localStorage.getItem("amount"))
    ? parseInt(localStorage.getItem("amount"))
    : 0;

  let localDefaultFieldVal = parseInt(
    localStorage.getItem("fieldValueDefault")
  );

  console.log("localDonorNum : ", localDonorNum);
  console.log("localToolTipVal : ", localToolTipVal);
  console.log("localAmount: ", localAmount);

  const MAXIMUM_BUDGET = 300;

  form.addEventListener("submit", (e) => {
    let message; 

   
    if (donationAmount.value <= 0) {

      message = "Kindly Enter the Value More than 0";
    } else if (donationAmount.value > MAXIMUM_BUDGET) {

      message = "Kindly Enter the Value less than 300";
    } else {
      // if storage functionality exists in browser api
      if (typeof Storage !== "undefined") {
     
        localStorage.setItem("donorsAmount", localDonorNum + 1);

        // set the amount to the local storage
        localStorage.setItem("amount", donationAmount.value);

        localStorage.removeItem("fieldValueDefault");

        donationAmount.defaultValue = "";
      }
    }

    
    if (message) {
      e.preventDefault();
      error.innerHTML = message;
    } else {
      error.innerHTML = "";
    }
  });

  /* Function for calculating the remaining donation amounts in the tooltip */

  const calculateToolTipValue = () => {

    if (localAmount !== null) {
      if (typeof Storage !== "undefined") {
        let remaining = MAXIMUM_BUDGET - localAmount;

        console.log("remaining : ", remaining);

        localStorage.setItem("tooltipvalue", remaining);

        toolTipValue.innerHTML = "$" + remaining;
      }
    }
  };

  const calculateProgress = () => {
    progress.style.width = `${(localAmount / MAXIMUM_BUDGET) * 100}%`;
  };

  const getRemainingDays = () => {
    let currentDate = new Date();

    let lastDate = new Date("05-01-2021");

    let remainingDays = lastDate.getTime() - currentDate.getTime();


    remainingDays = Math.floor(remainingDays / (1000 * 60 * 60 * 24));

    daysLeft.innerHTML = `Only  ${remainingDays} days left`;
  };

  const storeDonorNo = () => {
    
    if (typeof Storage !== "undefined") {
      donors.innerHTML = localDonorNum;
    }
  }; // check if the local field default val storage exists
  if (localDefaultFieldVal) {
    donationAmount.defaultValue = localDefaultFieldVal;
  }

  save.addEventListener("click", (e) => {
    e.preventDefault();
    if (donationAmount.value && donationAmount.value > 0) {
      localStorage.setItem("fieldValueDefault", donationAmount.value);
    }
  });

  // function calls

  calculateToolTipValue();
  calculateProgress();
  getRemainingDays();
  storeDonorNo();
});
