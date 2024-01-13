const btnSubmit = document.querySelector("#submit");
const date = new Date();
let dNow = date.getDate();
let mNow = date.getMonth() + 1;
let yNow = date.getFullYear();
let y, m, d;

let dayInMonth;
let dayInPrevMonth;

let allInvalidMessages = document.querySelectorAll(".invalid-message");
let mainErrorHolder = document.querySelector("#main-error-holder");

// the html elements to display the data
let resultDays = document.querySelector("#days span");
let resultMonths = document.querySelector("#months span");
let resultYears = document.querySelector("#years span");

// Calculate how many days in month
function howManyDays(monthNumber) {
  if (monthNumber == 2) {
    return (dayInMonth = 28);
  } else if (
    monthNumber == 4 ||
    monthNumber == 6 ||
    monthNumber == 9 ||
    monthNumber == 11
  ) {
    return (dayInMonth = 30);
  } else {
    return (dayInMonth = 31);
  }
}

// Get the input data and validate it
btnSubmit.addEventListener("click", function () {
  let dBirth = document.querySelector("#day").value;
  let mBirth = document.querySelector("#month").value;
  let yBirth = document.querySelector("#year").value;
//label-invalid
  function addError(idName) {
    let invalidMessage = idName.parentNode.querySelector(".invalid-message");
    console.log(invalidMessage);
    invalidMessage.classList.add("activeMessage");
    invalidMessage.style.maxHeight = invalidMessage.scrollHeight + "px";  // animating the appiarence of the error message
    idName.parentNode
      .querySelector("label")
      .classList.add("label-invalid");
    idName.classList.add("input-invalid");
  }
  function removeError(idName) {
    let invalidMessage = idName.parentNode.querySelector(".invalid-message");
    invalidMessage.style.maxHeight = null;
    //without the following line the error message stays display block, but us invisible due to height:0; this line prevent the scroll up animation 
    //invalidMessage.classList.remove("activeMessage");
    idName.parentNode
      .querySelector("label")
      .classList.remove("label-invalid");
    idName.classList.remove("input-invalid");
  }

  var dBirthIsValid =
    !isNaN(dBirth) && dBirth > 0 && dBirth.length > 0 && dBirth.length < 3;
  var mBirthIsValid =
    !isNaN(mBirth) && mBirth > 0 && mBirth.length > 0 && mBirth.length < 3;
  var yBirthIsValid = !isNaN(yBirth) && yBirth > 0 && yBirth.length == 4;

  if (!dBirthIsValid) {
    addError(day);
  } else {
    removeError(day);
  }

  if (!mBirthIsValid) {
    addError(month);
  } else {
    removeError(month);
  }

  if (!yBirthIsValid) {
    addError(year);
  } else {
    removeError(year);
  }

  if (dBirthIsValid && mBirthIsValid && yBirthIsValid) {
    var dateNew = new Date(yBirth, mBirth - 1, dBirth); 
    if (
      dateNew.getFullYear() == yBirth &&
      dateNew.getMonth() + 1 == mBirth &&
      dateNew.getDate() == dBirth &&
      dateNew <= date
    ) {
      
      // count up animation
      function animateValue(obj, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
          if (!startTimestamp) startTimestamp = timestamp;
          const progress = Math.min((timestamp - startTimestamp) / duration, 1);
          obj.innerHTML = Math.floor(progress * (end - start) + start);
          if (progress < 1) {
            window.requestAnimationFrame(step);
          }
        };
        window.requestAnimationFrame(step);
      }

      //Calculate the age if ALL is valid
      y = yNow - yBirth; 
      if (mNow < mBirth) {
        y--;
        m = 12 + (mNow - mBirth);
      } else {
        m = mNow - mBirth;
      }
      if (dNow < dBirth) {
        if (mNow != mBirth) {
          m--;
        } else {
          m = 12;
          y--;
        }
        d = howManyDays(mNow - 1) + (dNow - dBirth);
      } else {
        d = dNow - dBirth;
      }
      // show the result to the user

      mainErrorHolder.classList.remove("activeMessage");

      animateValue(resultDays, 0, d, 1500); // animating the final results
      animateValue(resultMonths, 0, m, 1000);
      animateValue(resultYears, 0, y, 2000);

    } else {
      //if the date is invalid (day=33, month>12, in the future)
      mainErrorHolder.classList.add("activeMessage");
    }
  } else if (!dBirthIsValid && !mBirthIsValid && !yBirthIsValid) {
    mainErrorHolder.classList.add("activeMessage");
    mainErrorHolder.style.maxHeight = mainErrorHolder.scrollHeight + "px"; // animating the appiarence of the error message
    for(i = 0; i < allInvalidMessages.length; i++) {
      allInvalidMessages[i].classList.remove("activeMessage");
    }
    resultDays.innerHTML = "- -";
    resultMonths.innerHTML = "- -";
    resultYears.innerHTML = "- -";
  } else {
    mainErrorHolder.classList.remove("activeMessage");
    resultDays.innerHTML = "- -";
    resultMonths.innerHTML = "- -";
    resultYears.innerHTML = "- -";
  }
  
  
});
