function validateInput(input){
    console.log(input);

    if(input.value.length < 3 || input.value.length > 15){
        input.classList.add("is-invalid");
    } else {
        input.classList.remove("is-invalid");
        input.classList.add("is-valid")
    }
}