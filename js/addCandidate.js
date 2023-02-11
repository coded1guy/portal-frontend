// removes loader when the page loads
loaderCont.style.display = "none";
(()=> {
    getDOMElems();
})();
// when the form is submitted


formParent.onsubmit = (e)=> {
    e.preventDefault();
    if(levelIn.value && statusIn.value) {
        //console.log("submit");
        let newCandidateData = {
            'first_name': firstNameIn.value,
            'middle_name': middleNameIn.value,
            'last_name': lastNameIn.value,
            'country': countryIn.value,
            'city': cityIn.value,
            'state': stateIn.value,
            'rate': rateIn.value,
            'level': levelIn.value,
            'outsource_rate': outsourceRateIn.value,
            'resume_link': resumeLinkIn.files[0],
            'status': statusIn.value,
        };
        sendRequestData("POST", newCandidateData);
    }
}
