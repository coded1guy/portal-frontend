// removes loader when the page loads
(()=> {
    loaderCont.style.display = "none";
    getDOMElems();
})();
// when the form is submitted
formParent.onsubmit = (e)=> {
    e.preventDefault();
    if(levelIn.value && statusIn.value) {
        console.log("submit");
        sendRequestData("POST");
    }
}