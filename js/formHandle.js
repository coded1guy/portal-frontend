// form element
let formParent, 
// an array of all form inputs
formParentInputs, 
// all input data
firstNameIn, middleNameIn, lastNameIn, jobTitleIn, rateIn, levelIn,
countryIn, stateIn, cityIn, resumeLinkIn, outsourceRateIn, statusIn,
// job, level and status dropdown
jobDD, levelDD, statusDD,
// all possible level, status and job options
levelOptions, statusOptions, jobDDOption, listOfAllJobs = [],
// level and status selector
levelSelectors, statusSelectors,
// level and status icon
levelIcon, statusIcon;


let getDOMElems = () => {
    // add form Inputs
    formParent = document.querySelector("#formParent");
    formParentInputs = formParent.querySelectorAll("input");
    [   firstNameIn, middleNameIn, lastNameIn, jobTitleIn, rateIn, levelIn,
            countryIn, stateIn, cityIn, resumeLinkIn, outsourceRateIn, statusIn
        ] = formParentInputs
    ;
    // dropdown dom
    jobDD = document.querySelector("#job-dd");
    levelDD = document.querySelector("#level-dd");
    statusDD = document.querySelector("#status-dd");
    // possible options for level and status
    levelOptions = ["Entry", "Junior", "Intermediate", "Senior"];
    statusOptions = [ "Interviewed (Selected)", "Interviewed (Not Selected)", "Not Interviewed"];
    
    formParentInputs.forEach(element => {
        element.onchange = (e)=> {
            console.log(e.target.value);
        }
    })
    // dropdown li
    jobDDOption = jobDD.querySelector("#suggOption");
    levelSelectors = levelDD.querySelectorAll("li");
    statusSelectors = statusDD.querySelectorAll("li");
    // dropdown icon
    levelIcon = document.querySelector("#level-icon");
    statusIcon = document.querySelector("#status-icon");
    // sets the dropdown of the select elements to 0px
    levelDD.style.height = "0px";
    statusDD.style.height = "0px";
    jobDD.style.height = "0px";

    // listens to all document clicks
    document.addEventListener('click', (e)=> {
        // when the level dropdown icon is clicked
        if(levelIcon.contains(e.target)) {
            if(levelDD.style.height == "0px") {
                levelDD.style.height = "116px";
            } else {
                levelDD.style.height = "0px";
            }
        } else {
            levelDD.style.height = "0px";
        }
        // when the status dropdown is clicked
        if(statusIcon.contains(e.target)) {
            if(statusDD.style.height == "0px") {
                statusDD.style.height = "88px";
            } else {
                statusDD.style.height = "0px";
            }
        } else {
            statusDD.style.height = "0px";
        }
    })
    firstNameIn.oninput = (e)=> {
        console.log(e.target.value);
    }

    for (let count = 0; count < levelOptions.length; count++) {
        levelSelectors[count].onclick = ()=> {
            setLevelOption(levelOptions[count]);
        };
    }
    for (let count = 0; count < statusOptions.length; count++) {
        statusSelectors[count].onclick = ()=> {
            setStatusOption(statusOptions[count]);
        };
    }

    jobTitleIn.oninput = (e)=> {
        let suggestion = suggestJobTitle(e.target.value);
        console.log(suggestion);
        if(suggestion) {
            jobDD.style.height = "29px";
            jobDDOption.innerHTML = suggestion;
        }
    }
    jobDDOption.onclick = (e)=> {
        setJobValue(e.target.innerHTML);
    }
    jobTitleIn.onblur  = ()=> {
        jobDD.style.height = "0px";
    }
}


// controls setting input value for the level dropdown
let setLevelOption = (levelData)=> {
    levelIn.value = levelData;
}

//controls setting of input value for the status dropdown
let setStatusOption = (statusData)=> {
    statusIn.value = statusData;
}


let getAllJobTitles = async()=> {
    let response = await fetch(`${apiHost}/job.json`);
    let data = await response.json();
    return data;
}
(()=> {
    getAllJobTitles().then(data => {
        data.forEach(element => {
            listOfAllJobs.push(element.job_title);
        })
    });
})();
let setJobValue = (setJobTitle)=> {
    jobTitleIn.value = setJobTitle;
}
let suggestJobTitle = (value)=> {
    let search = stringSimilarity.findBestMatch(value, listOfAllJobs);
    if(search.bestMatch.rating > 0.1) {
        return  search.bestMatch.target;
    }
}



// get request to the job endpoint
let getJobId = async(job)=> {
    let getJobId = job;
    getJobId = getJobId.split(" ").join("+");
    let jobResponse = await fetch(`${apiHost}/job.json/?job_title=${getJobId}`);
    let jobId = await jobResponse.json();
    return jobId;
}
// post request to the job endpoint
let createNewJob = async(job)=> {
    console.log(job);
    let jobdata = { "job_title": job };
    let jobResponse = await fetch(`${apiHost}/job/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(jobdata),
    });
    
    let jobId = await jobResponse.json();
    return jobId;
}




// send request to the candidate endpoint
let sendFormData = async(formdata, requestType)=> {
    let formResponse;
    if(requestType === "POST") {
        formResponse = await fetch(`${apiHost}/candidate`, {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formdata),
        });
    } else if(requestType === "PUT") {
        formResponse = await fetch(`${apiHost}/candidate/${storedId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formdata),
        });
    }
    let postData = await formResponse.json();
    return postData;
}
// function controlling all necessary function calls to semd data the candidate endpoint
let sendRequestData = async(requestAction)=> {
    if(listOfAllJobs.includes(jobTitleIn.value)) {
        getJobId(jobTitleIn.value).then(jobId => {
            let data = {
                'first_name': firstNameIn.value,
                'middle_name': middleNameIn.value,
                'last_name': lastNameIn.value,
                'country': countryIn.value,
                'city': cityIn.value,
                'state': stateIn.value,
                'job_id': jobId[0].id,
                'rate': rateIn.value,
                'level': levelIn.value,
                'outsource_rate': outsourceRateIn.value,
                'resume_link': resumeLinkIn.value,
                'status': statusIn.value,
            };
            sendFormData(data, requestAction)
            .then(postData => {
                console.log(postData);
                window.location.replace("./index.html");
            })
        })
    } else {
        createNewJob(jobTitleIn.value).then(jobId => {
            let data = {
                'first_name': firstNameIn.value,
                'middle_name': middleNameIn.value,
                'last_name': lastNameIn.value,
                'country': countryIn.value,
                'city': cityIn.value,
                'state': stateIn.value,
                'job_id': jobId.id,
                'rate': rateIn.value,
                'level': levelIn.value,
                'outsource_rate': outsourceRateIn.value,
                'resume_link': resumeLinkIn.value,
                'status': statusIn.value,
            };
            sendFormData(data, requestAction)
            .then(postData => {
                console.log(postData);
                window.location.replace("./index.html");
            })
        })
    }
}
