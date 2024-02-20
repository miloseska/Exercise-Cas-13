let register = document.getElementById("register");
let modalTitle = document.getElementById("exampleModalLabel");
let modalFooter = document.getElementsByClassName("modal-footer")[0];
let modalBody = document.getElementsByClassName("modal-body")[0];

register.addEventListener('click' , () =>{
modalTitle.innerHTML = 'Register';

modalBody.innerHTML = createRegisterForm();
let submitBtn = document.getElementById("submitBtn");

let formIsValid = isValid();

if(formIsValid) {
  submitBtn.removeAttribute("disabled");
}

submitBtn.addEventListener("click", (e) =>{
  e.preventDefault();
  let inputArray = document.querySelectorAll("input");
    let emptyField = false;
    inputArray.forEach((element) => {
      if (element.value === "") {
        emptyField = true;
        return;
      }
    });

    if (emptyField) {
      let errorAll = document.getElementById("errorAll");
      errorAll.innerText = "Please fill all of the fields";
      return;
    }
    postForm();
})
})

function createRegisterForm(){
  return `
  <form class="row g-3 needs-validation dis-flex_justcont-cent width-100" novalidate id="myForm">
  <div class="error" id="errorAll"></div>  
  <div class="col-md-7">
      <label for="firstName" class="form-label">First name</label>
      <input type="text" class="form-control" id="firstName" name="firstName" minlength="3" maxlength="15" onblur="validateInput(this)" required>
  
      <div class="error">    
      </div>
    </div>
    <div class="col-md-7">
      <label for="lastName" class="form-label">Last name</label>
      <input type="text" class="form-control" id="lastName" name="lastName" minlength="3" maxlength="15" onblur="validateInput(this)" required>
      <div class="error">      
      </div>
    </div>
    <div class="col-md-7">
    <label for="city" class="form-label">City</label>
    <input type="text" class="form-control" id="city" name="city" minlength="3" maxlength="15" onblur="validateInput(this)" required>
    <div class="error">      
    </div>
  </div>
  <div class="col-md-7">
  <label for="email" class="form-label">Email</label>
  <input type="email" class="form-control" id="email" name="email" onblur="validateInput(this)" required>
  <div class="error">      
  </div>
  </div>
  <div class="col-md-7">
  <label for="job" class="form-label">Job</label>
  <input type="text" class="form-control" id="job" name="job" minlength="3" maxlength="15" onblur="validateInput(this)" required>
  <div class="error">      
  </div>
  </div>
  <div class="col-md-7">
  <label for="password" class="form-label">Password</label>
  <input type="password" class="form-control" id="password" name="password" onblur="validateInput(this)"  required>
  <div class="error">      
  </div>
  </div>
    <div class="col-12 dis-flex_justcont-cent">
      <button data-bs-dismiss="modal" class="btn btn-primary" id="submitBtn" disabled type="submit">Submit form</button>
    </div>
  </form>
  `
}

function postForm(){
  let firstName = document.getElementById("firstName").value;
  let lastName = document.getElementById("lastName").value;
  let city = document.getElementById("city").value;
  let email = document.getElementById("email").value;
  let job = document.getElementById("job").value;
  let password = document.getElementById("password").value;

  const user = {
    firstname : firstName,
    lastname : lastName,
    city : city,
    email : email,
    job : job,
    password : password,
  }

  const postData = JSON.stringify(user);

  fetch("https://65d38018522627d50109056a.mockapi.io/api/users", {
    method: "POST",
    body: postData,
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  }).then((response) => {
    console.log(response);
    if (response.ok){
      let form = document.getElementById("myForm");
      form.reset();
    }
    return response.json();
  });
}
