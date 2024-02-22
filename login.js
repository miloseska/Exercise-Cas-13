let loginBtn = document.getElementById("Login");
let modalTitleLogin = document.getElementById("exampleModalLabel");
let modalBodyLogin = document.getElementsByClassName("modal-body")[0];
let logoutBtn = document.getElementById("Logout");
let registerBtn = document.getElementById("register");
const el = document.getElementById("test");

let users = [];

fetch("https://65d38018522627d50109056a.mockapi.io/api/users")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log(data);
    users = data;
  });

loginBtn.addEventListener("click", () => {
  modalTitleLogin.innerHTML = "Login";
  modalBodyLogin.innerHTML = createLoginForm();
  let submitLoginBtn = document.getElementById("submitBtnLogin");

  submitLoginBtn.addEventListener("click", (e) => {
    e.preventDefault();
    let inputArray = document.querySelectorAll("input");
    let errorAll = document.getElementById("errorAll");
    let emptyField = false;
    inputArray.forEach((element) => {
      if (element.value === "") {
        emptyField = true;
        return;
      }
    });
    if (emptyField) {
      errorAll.innerText = "Please fill all of the fields";
      return;
    }

    login(errorAll);
  });
});

function createLoginForm() {
  return `
    <form class="row g-3 needs-validation dis-flex_justcont-cent width-100" novalidate id="myForm">
    <div class="error" id="errorAll"></div>  
    <div class="col-md-7">
    <label for="email" class="form-label">Email</label>
    <input type="email" class="form-control" id="email" name="email" onblur="validateInput(this)" required>
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
        <button  class="btn btn-primary" id="submitBtnLogin" type="submit">Login</button>
      </div>
    </form>
    `;
}

function uuidv4() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
}

function login(errorAll) {
  let emailUser = document.getElementById("email").value;
  let passwordUser = document.getElementById("password").value;

  let user = users.filter((user) => {
    return user.email === emailUser;
  });

  if (!user) {
    errorAll.innerText = "Email is not valid";
    return;
  }
  if (!user.password === passwordUser) {
    errorAll.innerText = "Password is not valid";
    return;
  }

  let token = uuidv4();
  localStorage.setItem("token", token);
  userLoggedIn();
  simulateClick(el);
}

function userLoggedIn() {
  loginBtn.style.display = "none";
  registerBtn.style.display = "none";
  logoutBtn.style.display = "block";
}

function isUserLogged() {
  if (localStorage.getItem("token")) {
    userLoggedIn();
  }
}

isUserLogged();

function logout() {
  loginBtn.style.display = "block";
  registerBtn.style.display = "block";
  logoutBtn.style.display = "none";
  localStorage.removeItem("token");
}

function simulateClick(element) {
  trigger(element, "click");

  function trigger(elem, event) {
    elem.dispatchEvent(new MouseEvent(event));
  }
}