const eye_icon = document.querySelector("#eye-icon");
const eye_input = document.querySelector("#eye_input");

eye_icon.addEventListener("click", ()=>{
    if(eye_input.type === "password"){
        eye_input.type="text";
        eye_icon.className = "ri-eye-line"
    }
    else{
        
        eye_input.type="password";
        eye_icon.className="ri-eye-close-line"
    }
})