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

let resumeFile;

let getDOMElems = () => {
    // add form Inputs
    formParent = document.querySelector("#formParent");
    formParentInputs = formParent.querySelectorAll("input");
    [   firstNameIn, middleNameIn, lastNameIn, jobTitleIn, rateIn, levelIn,
            countryIn, stateIn, cityIn, resumeLinkIn, outsourceRateIn, statusIn
        ] = formParentInputs
    ;
    // dropdown DOM
    jobDD = document.querySelector("#job-dd");
    levelDD = document.querySelector("#level-dd");
    statusDD = document.querySelector("#status-dd");
    // possible options for level and status inputs
    levelOptions = ["Entry", "Junior", "Intermediate", "Senior"];
    statusOptions = [ "Interviewed (Selected)", "Interviewed (Not Selected)", "Not Interviewed"];
    
    formParentInputs.forEach(element => {
        element.onchange = (e)=> {
            if (e.target.type !== 'file') {
                //console.log(e.target.value);
            } else {
                //console.log(e.target.files[0]);
            }
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
            if(levelDD.style.height === "0px") {
                levelDD.style.height = "116px";
            } else {
                levelDD.style.height = "0px";
            }
        } else {
            levelDD.style.height = "0px";
        }
        // when the status dropdown is clicked
        if(statusIcon.contains(e.target)) {
            if(statusDD.style.height === "0px") {
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
// controls setting of input value for the status dropdown
let setStatusOption = (statusData)=> {
    statusIn.value = statusData;
}

// this is the function that gets the list of all jobs in the database from the job endpoint
let getAllJobTitles = async()=> {
    let response = await fetch(`${apiHost}/job.json`, {
        method: "GET",
        headers: {
            Authorization: `token ${userData.token}`
        }
    });
    return await response.json();
}
// populates the listOfAllJobs array with the list of all the jobs in the database
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
/*
*  SIMILAR JOB LIST
*  this uses the stringSimilarity package to check if the job input value is similar to any item in the listOfAllJobs array
*  possible update: write my own script to make the stuff more accurate
*/
let suggestJobTitle = (value)=> {
    let search = stringSimilarity.findBestMatch(value, listOfAllJobs);
    if(search.bestMatch.rating > 0.1) {
        return  search.bestMatch.target;
    }
}


// this gets the job id using the title of the job
let getJobId = async(job)=> {
    let getJobId = job;
    getJobId = getJobId.split(" ").join("+");
    let jobResponse = await fetch(`${apiHost}/job.json/?job_title=${getJobId}`, {
        method: 'GET',
        headers: {
            Authorization: `token ${userData.token}`,
        }
    });
    return await jobResponse.json();
}

// create a new job, sends a POST request to the job endpoint
let createNewJob = async(job)=> {
    let jobData = { "job_title": job };
    let jobResponse = await fetch(`${apiHost}/job/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `token ${userData.token}`,
        },
        body: JSON.stringify(jobData),
    });
    return await jobResponse.json();
}


// sends request to the candidate endpoint (POST and PATCH)
let sendFormData = async(candidateData, requestType)=> {
    // this creates a FormData object from the candidateData object passed to the function
    let newFormData = new FormData();
    for ( let key in candidateData ) {
        if(candidateData[key] !== "" && candidateData[key] !== null && candidateData[key] !== undefined) {
            newFormData.append(key, candidateData[key]);
        }
    }
    // this will store the response gotten from the API
    let apiResponse,
    // this sets the header for the request
    headers = {
        'Accept': '*/*',
        Authorization: `token ${userData.token}`,
    },
    // this sets the request method to either post or put
    method = requestType;
    // if the request method is post
    if(requestType === "POST") {
        apiResponse = await fetch(`${apiHost}/candidate`, {
            method,
            headers,
            body: newFormData,
        });
    }
    // if the request method is PATCH
    else if(requestType === "PATCH") {
        apiResponse = await fetch(`${apiHost}/candidate/${storedId}`, {
            method,
            headers,
            body: newFormData,
        })
    }
    return await apiResponse.json();
}
// this function warps the input data based on the job data
let sendRequestData = async(requestAction, candidateData)=> {
    console.log(candidateData);
    // checks if the job title is a member of the listOfAllJobs array
    if(listOfAllJobs.includes(jobTitleIn.value)) {
        getJobId(jobTitleIn.value).then(jobId => {
            candidateData['job_id'] = jobId[0].id;
            sendFormData(candidateData, requestAction).then(postData => {
                console.log(postData);
                window.location.replace("./index.html");
            })
        })
    } else {
        createNewJob(jobTitleIn.value).then(jobId => {
            candidateData['job_id'] = jobId[0].id;
            sendFormData(candidateData, requestAction).then(postData => {
                window.location.replace("./index.html");
            })
        })
    }
}
