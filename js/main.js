// GENERAL JS scripts
// get the loader element
const loaderCont = document.querySelector("#loader-cont");
// const apiHost = "https://dumela-portal.herokuapp.com/api";
const apiHost = "https://dumeldj.pythonanywhere.com/api";
const userData = JSON.parse(localStorage.getItem("DRPsessionData"));
loaderCont.style.display = "none";
if (userData) {
    console.log("user is logged in");
} else {
    window.location.replace("login.html");
}
