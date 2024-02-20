let register = document.getElementById("register");
let modalTitle = document.getElementById("exampleModalLabel");
let modalFooter = document.getElementsByClassName("modal-footer")[0];
let modalBody = document.getElementsByClassName("modal-body")[0];

register.addEventListener('click' , () =>{
modalTitle.innerHTML = 'Register';
modalBody.innerHTML = createRegisterForm();
})

function createRegisterForm(){
  return `
  <form id = "registerForm">
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
      <button data-bs-dismiss="modal" class="btn btn-primary" id="submitBtn" type="submit">Submit form</button>
    </div>
  </form>
  `
}