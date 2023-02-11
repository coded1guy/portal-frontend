// GENERAL JS scripts
// get the loader element
const loaderCont = document.querySelector("#loader-cont");
// const apiHost = "https://dumela-portal.herokuapp.com/api";
const apiHost = "http://127.0.0.1:8000/api";
const userData = JSON.parse(localStorage.getItem("DRPsessionData"));
loaderCont.style.display = "none";
if (userData) {
    console.log("user is logged in");
} else {
    window.location.replace("./login.html");
}
