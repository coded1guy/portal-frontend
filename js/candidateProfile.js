// this gets the candidateId stored in the localstorage
let storedId = Number(localStorage.getItem("candidateId"));
let viewCont = document.querySelector("#profile-details > div > form > div");
let viewBtn = document.querySelector("#view");
let updateBtn = document.querySelector("#update");
let deleteBtn = document.querySelector("#delete");

let updateSubmitBtn = document.querySelector("#submit-update");
/*
* this variable tracks the state of the edit form,
* if it is true, the form is in view mode, if it is false, the form is in edit mode
*/
let isView = true;

// this function downloads the candidate's resume, it sends a GET request to the download-resume endpoint
let downloadResume = (candidateId, firstName, lastName) => {
    console.log("download");
    fetch(`${apiHost}/download-resume/${candidateId}.json`, {
        method: "GET",
        headers: {
            Authorization: `token ${userData.token}`
        }
    }).then((response)=> {
        response.blob().then(blob => {
            let url = window.URL.createObjectURL(blob);
            let a = document.createElement("a");
            a.href = url;
            a.download = `${firstName}_${lastName}_Resume`;
            a.click();
        });
    })
}


// this function retrieves the candidate's data, it sends a GET request the candidate endpoint
let getCandidateProfile = async(candidateId)=> {
    let response = await fetch(`${apiHost}/candidate/${candidateId}.json`, {
        method: "GET",
        headers: {
            Authorization: `token ${userData.token}`
        }
    });
    return await response.json();
}
// this function gets the job title given the job id
let getJobTitle = async(jobId)=> {
    let jobResponse = await fetch(`${apiHost}/job/${jobId}.json`, {
        method: "GET",
        headers: {
            Authorization: `token ${userData.token}`
        }
    });
    return await jobResponse.json();
}

// this function initializes the form with the candidate's data
let init = ()=> {
    getCandidateProfile(storedId)
    .then(data => {
        console.log(data);
        let fullName, middleName, resumeName;
        if(data.middle_name) {
            fullName =  data.first_name + ' ' + data.middle_name + ', ' + data.last_name;
    
        } else {
            fullName = data.first_name + ', ' + data.last_name;
        }
        resumeName = data.first_name + '_' + data.last_name + '_resume';
        function setMid() {
            if(data.middle_name) {
                middleName = `
                    <input id="middle-name" type="text" placeholder="input new middle name" value="${data.middle_name}" readonly>
                `;
            } else {
                middleName = `
                    <input id="middle-name" type="text" placeholder="input new middle name" value="-" readonly>
                `;
            }
            return middleName;
        }
        getJobTitle(data.job_id).then(jobTitle => {
            returnedJobTitle = jobTitle.job_title;
            viewCont.innerHTML = `
                <div class="profile-data-cnt">
                    <div>
                        <label for="first-name">First Name</label>
                        <input id="first-name" type="text" placeholder="input new first name" value="${data.first_name}" readonly>
                    </div>
                    <div>
                        <label for="middle-name">Middle Name</label>
                        ${setMid()}
                    </div>
                    <div>
                        <label for="last-name">Last Name</label>
                        <input id="last-name" type="text" placeholder="input new last name" value="${data.last_name}" readonly>
                    </div>
                </div>
                <div class="profile-data-cnt">
                    <div>
                        <label for="job-title">Job</label>
                        <div class="select-option">
                            <input id="job-title" type="text" placeholder="input new job title" value="${returnedJobTitle}" readonly>
                            <ul id="job-dd" class="option-dropdown">
                                <li id="suggOption"></li>
                            </ul>
                        </div>
                    </div>
                    <div>
                        <label for="rate">Rate</label>
                        <input id="rate" type="number" placeholder="input new rate" value="${data.rate}" readonly>
                    </div>
                    <div>
                        <label for="level">Level</label>
                        <div class="select-option">
                            <input id="level" type="text" placeholder="input new level" value="${data.level}" readonly>
                            <button type="button" class="select-icon" id="level-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                <!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
                                <path
                                    d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
                                </svg>
                            </button>
                            <ul id="level-dd" class="option-dropdown">
                                <li>Entry</li>
                                <li>Junior</li>
                                <li>Intermediate</li>
                                <li>Senior</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="profile-data-cnt">
                    <div>
                        <label for="country">Country</label>
                        <input id="country" type="text" placeholder="input new country" value="${data.country}" readonly>
                    </div>
                    <div>
                        <label for="state">State</label>
                        <input id="state" type="text" placeholder="input new state" value="${data.state}" readonly>
                    </div>
                    <div>
                        <label for="city">City</label>
                        <input id="city" type="text" placeholder="input new city" value="${data.city}" readonly>
                    </div>
                </div>
                <div class="profile-data-cnt">
                    <div>
                        <label for="resume-link">Resume Link</label>
                        <div class="view-resume" style="display:block">
                            <button type="button">
                                <a
                                    href="${data.resume_link}"
                                    target="_blank"
                                    title="go to ${data.resume_link}"
                                >
                                    view
                                </a>
                            </button>
                            <button type="button" id="downloadBtn">
                                download
                            </button>
                        </div>
                        <input class="edit-resume" id="resume-link" type="file" accept=".pdf, .doc, .docx" style="display:none">
                    </div>
                    <div>
                        <label for="outsource-rate">Outsource Rate</label>
                        <input id="outsource-rate" type="number" placeholder="input new outsource rate" value="${data.outsource_rate}" readonly>
                    </div>
                    <div>
                        <label for="status">Status</label>
                        <div class="select-option">
                            <input id="status" type="text" placeholder="input new status" value="${data.status}" readonly>
                            <button type="button" class="select-icon" id="status-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                <!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
                                <path
                                    d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
                                </svg>
                            </button>
                            <ul id="status-dd" class="option-dropdown">
                                <li>Interviewed (Selected)</li>
                                <li>Interviewed (Not Selected)</li>
                                <li>Not Interviewed</li>
                            </ul>
                        </div>
                    </div>
                </div>
            `;
            return true;
        }).then(isReady => {
            if(isReady) {
                updateSubmitBtn.style.display = "none";
                document.querySelector("#downloadBtn").onclick = () => {
                    downloadResume(data.id, data.first_name, data.last_name);
                }
                loaderCont.style.display = "none";
                getDOMElems();
                // when the form is submitted
                formParent.onsubmit = (e)=> {
                    e.preventDefault();
                    if(levelIn.value && statusIn.value) {
                        console.log("submit");
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
                        sendRequestData("PATCH", newCandidateData);
                    }
                }
            }
        });
    });
    return true;
}
// this is where the init function is called
init();

// this function changes the form from the edit mode to the view mode
let viewForm = ()=> {
    viewBtn.classList.add("profile-active");
    updateBtn.classList.remove("profile-active");
    document.querySelector("#profile-details > div > form").classList.remove("edit-mode");
    document.querySelector("#profile-details > div > form").classList.add("view-mode");
    console.log("view");
    init();
    isView = true;
}
// this function changes the form from the view mode to the edit mode
let editForm = ()=> {
    isView = false;
    updateBtn.classList.add("profile-active");
    viewBtn.classList.remove("profile-active");
    document.querySelector(".view-resume").style.display = "none";
    document.querySelector(".edit-resume").style.display = "block";
    updateSubmitBtn.style.display = "block";
    document.querySelector("#profile-details > div > form").classList.remove("view-mode");
    document.querySelector("#profile-details > div > form").classList.add("edit-mode");
    let allInputs = viewCont.getElementsByTagName("input");
    for(let count = 0; count < allInputs.length; count++) {
        console.log("doings");
        allInputs[count].readOnly = false;
    }
}
// this function deletes the user, it sends a DELETE request to the candidate endpoint
deleteBtn.onclick = ()=> {
    console.log("delete");
    let trulyDelete = confirm("You are about to delete this candidate from the database\n choose OK or Cancel.");
    if(trulyDelete) {
        fetch(`${apiHost}/candidate/${storedId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `token ${userData.token}`
            }
        });
        localStorage.removeItem("candidateId");
        window.location.replace("./index.html");
    }
};
// event watcher for the view button and edit button
viewBtn.onclick = ()=> viewForm();
updateBtn.onclick = ()=> editForm();
