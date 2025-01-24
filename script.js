// CLEAR THE WHOLE INPUT FIELD
function getInputValue() {
  document.getElementById("inpId").value = "";
}
// CLEAR ONE AT A TIME
function clear1() {
  var inpValue = document.getElementById("inpId").value;
  var updValue = inpValue.slice(0, inpValue.length - 1);
  document.getElementById("inpId").value = updValue;
}

// ADDING THE NUMBERS IN INPUT FIELD
const arr = document.querySelectorAll(".addStrInp");
console.log(arr);

const newArr = Array.from(arr);
console.log(newArr);

var replaces = false;
for (let btn of newArr) {
  btn.addEventListener("click", function () {
    // const addvalue = document.querySelector(".addStrInp").innerText;
    const addvalue = this.innerText;
    console.log("addedValue", addvalue, typeof addvalue);

    const prev = document.getElementById("inpId").value;
    console.log("prevValue", prev);

    if (replaces == true) {
      document.getElementById("inpId").value = this.innerText;
      replaces = false;
    }else{
      document.getElementById("inpId").value += this.innerText;
    }
  });
}

//CHECK FUNCTION FOR DECIMAL SIGNIFICANCY
function dotContainsSignificantly(expression){
  let arrExpDot = expression.split("");
  let dotCount = 0;
  for(let i=0;i<arrExpDot.length;i++)
  {
    
    if(arrExpDot[i] == ".")
    {
      dotCount++;
      dotAllowed = false;
    }
    else if(["+", "-", "*", "/", "%"].includes(arrExpDot[i]))
    {
        dotCount = 0;
        dotAllowed = true;
    }
    if(dotCount >=1)
    {
      dotAllowed = false;
    }
  }
  return dotAllowed;
}

// ADDING THE OPERATORS IN INPUT FIELD
const arr2 = document.querySelectorAll(".addStrInp2");
console.log(arr2);

const newArr2 = Array.from(arr2);
console.log(newArr2);

let dotAllowed = true;

for (let btn2 of newArr2) {
  btn2.addEventListener("click", function () {
    replaces = false;
    // let addvalue = document.querySelector(".addStrInp2").innerText;
    let addvalue = this.innerText;
    // console.log("addedValue", addvalue, typeof addvalue);

    let prev = document.getElementById("inpId").value;
    // console.log("prevValue", prev);

    if (
      (prev.charAt(prev.length - 1) == "+" &&
        ["+", "-", "*", "/", "%"].includes(this.innerText)) ||
      (prev.charAt(prev.length - 1) == "-" &&
        ["+", "-", "*", "/", "%"].includes(this.innerText)) ||
      (prev.charAt(prev.length - 1) == "*" &&
        ["+", "-", "*", "/", "%"].includes(this.innerText)) ||
      (prev.charAt(prev.length - 1) == "/" &&
        ["+", "-", "*", "/", "%"].includes(this.innerText)) ||
      (prev.charAt(prev.length - 1) == "%" &&
        ["+", "-", "*", "/", "%"].includes(this.innerText))
    ) {
      document.getElementById("inpId").value =
        prev.slice(0, prev.length - 1) + this.innerText;
    } 
    else if (/\d/.test(prev.charAt(prev.length - 1))) 
    {

      if(this.innerText=="." && dotContainsSignificantly(document.getElementById('inpId').value))
      {
        console.log("Operand else ",this.innerText , " and " , dotContainsSignificantly(document.getElementById('inpId').value));
        document.getElementById("inpId").value += this.innerText;
      }
      else if(this.innerText!=".")
      {
        console.log("Operand else ",this.innerText);
        document.getElementById("inpId").value += this.innerText;
      }
      
    }    
    else 
    {
      return;
    }
  });
}



//METHOD 3:- By converting first the string into an array and then evaluating the expression
function evaluateFun3() {
  replaces = true;
  var inpValue = document.getElementById("inpId").value;
  if (inpValue == "") {
    alert("Haha ,Enter the expression correctly!!");
    return;
  }
  var arr = convertToArray(inpValue);
   console.log(arr);
  let finalResult = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] == "+" && i < arr.length) {
      finalResult = finalResult + arr[++i];
      i++;
      // console.log(arr[i]);
    }
    if (arr[i] == "-" && i < arr.length) {
      finalResult = finalResult - arr[++i];
      i++;
    }
    if (arr[i] == "*" && i < arr.length) {
      finalResult = finalResult * arr[++i];
      i++;
    }
    if (arr[i] == "/" && i < arr.length) {
      finalResult = finalResult / arr[++i];
      i++;
    }
    if (arr[i] == "%" && i < arr.length) {
      finalResult = finalResult % arr[++i];
      i++;
    }
  }
  // console.log(finalResult);
  
  document.getElementById("inpId").value = finalResult;
  
  // console.log("dummyStr before : ", dummyStr);

  return finalResult;
}

function convertToArray(expression) {
  let result = [];
  let currentNumber = "";

  for (let i = 0; i < expression.length; i++) {
    const char = expression[i];

    // If the character is a digit or a decimal point
    if (/\d|\./.test(char)) {
      currentNumber += char;
    } //If the character is any operand
    else if (["+", "-", "*", "/", "%"].includes(char)) {
      if (currentNumber) {
        result.push(Number(currentNumber));
        currentNumber = "";
      }
      result.push(char);
    }
  }
  // If there's a number left to push (in case the expression ends with a number)
  if (currentNumber) {
    result.push(Number(currentNumber));
  }

  return result;
}
