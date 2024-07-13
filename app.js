const BASE_URL =
  "https://api.currencybeacon.com/v1";
const API_KEY = "mXn6Ir15iJEMHoaGCHfDhdPK2lQFcSkE" 


//SELECTING ELEMENTS

  let selects = document.querySelectorAll("form select");
  let sel1 = document.querySelector("#sel1");
  let sel2 = document.querySelector("#sel2");
  let convertBtn = document.querySelector("#convert");
  let fromCurr = sel1;
  let toCurr = sel2;
  let result = document.querySelector("#result");
  let msg = document.querySelector(".msg");

  // TO SHOW LIST OF COUNTRIES IN THE SELECT
  selects.forEach(select => {
      for (let currCode in countryList) {
          let newOption = document.createElement("option");
          newOption.innerText = currCode;
          newOption.value = currCode;
          select.append(newOption);
          
          if (select.name === "from" && currCode === "USD") {
              newOption.selected = 'selected';
          } else if (select.name === "to" && currCode === "INR") {
              newOption.selected = 'selected';
          }
      }
      
      sel1.addEventListener('change', (evt) => {
          updateFlag1(evt.target);
         });
      
      sel2.addEventListener('change', (evt) => {
          updateFlag2(evt.target); 
      });   
      
      });
  
  // TO UPDATE FLAG AS PER THE COUNTRY
  const updateFlag1 = (element) => {
      let currCode = element.value;
      //console.log(currCode);
      let countryCode = countryList[currCode];
      //console.log(countryList[currCode]);
      let newSrc = `https://flagsapi.com/${countryCode}/shiny/64.png`;
      let flagImg1 = element.parentElement.querySelector("#flag1");
      flagImg1.src = newSrc;
  };

  const updateFlag2 = (element) => {
   let currCode = element.value;
   //console.log(currCode);
   let countryCode = countryList[currCode];
   //console.log(countryList[currCode]);
   let newSrc = `https://flagsapi.com/${countryCode}/shiny/64.png`;
   let flagImg2 = element.parentElement.querySelector("#flag2");
   flagImg2.src = newSrc;
};

convertBtn.addEventListener("click", async (evt) => {
   evt.preventDefault();
   let amount = document.querySelector("#in1");
   let amtVal = amount.value;
   if(amtVal < 0 || amtVal === "") {
       amount.value = "1";
       amtVal = 1;
   }
   console.log(amtVal);
   
   console.log(fromCurr.value, toCurr.value)
   const URL = `${BASE_URL}/latest?api_key=${API_KEY}&base=${fromCurr.value.toLowerCase()}&symbols=${toCurr.value.toLowerCase()}`;
   let response = await fetch(URL);
   //console.log(response);
   let data = await response.json();
   //console.log(data.rates);
  let x = (data.rates);
  // CONVERTING data.rates object to a number & rounding off it to 3 decimal places
  let exchangeRate = Number(Object.values(x)[0]).toFixed(3);
  //console.log(exchangeRate);
  let convertedAmount = `The Converted Amount is ${amtVal * exchangeRate}`;
  console.log(convertedAmount);
  

  //printing convertedAmount in result window

   result.setAttribute('placeholder',convertedAmount);
   console.log(result.getAttribute('placeholder'));
  
   //setting the message window 
   msg.innerText = `1 ${fromCurr.value} = ${exchangeRate} ${toCurr.value}`;
})



