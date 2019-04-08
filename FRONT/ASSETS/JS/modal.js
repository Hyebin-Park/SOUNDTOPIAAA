const signIn = document.getElementById("sign-in")
const signUp = document.getElementById("sign-up")
const signInContent = document.getElementById("modal-sign-in")
const signUpContent = document.getElementById("modal-sign-up")
const closeBtn = document.querySelector(".modal__header--closeBtn")
const modalContainer = document.querySelector(".modal__container")
const signUpBtn = document.querySelector(".header__signUpBtn")





const handleSignIn = () => {
    signUpContent.style.visibility = "hidden";
    signInContent.style.visibility = "visible"
    signUp.classList.remove("up-active")
    signIn.classList.add("in-active")
}

const handleSignUp = () => {
    signInContent.style.visibility = "hidden";
    signUpContent.style.visibility = "visible";
    signIn.classList.remove("in-active")
    signUp.classList.add("up-active")
}

const handelOpen = () => {
    modalContainer.classList.remove("close")
    signIn.classList.add("in-active")
    modalContainer.classList.add("open")

    signUpBtn.style.visibility = "hidden"
}

const handelClose = () => {
    modalContainer.classList.remove("open")
    modalContainer.classList.add("close")
    signUpBtn.style.visibility = "visible"
}

const init = () => {
    signIn.addEventListener("click", handleSignIn);
    signUp.addEventListener("click", handleSignUp);
    signUpBtn.addEventListener("click", handelOpen);
    closeBtn.addEventListener("click", handelClose);
}

window.onload = () => {
    init();
}