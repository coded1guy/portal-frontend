let storedId = Number(localStorage.getItem("candidateId"));
let viewCont = document.querySelector("#profile-details > div > form > div");
let viewBtn = document.querySelector("#view");
let updateBtn = document.querySelector("#update");
let deleteBtn = document.querySelector("#delete");

let getCandidateProfile = async(candidateId)=> {
    let response = await fetch(`${apiHost}/candidate/${candidateId}.json`);
    let data = await response.json();
    return data;
}
let getJobTitle = async(jobId)=> {
    let jobResponse = await fetch(`${apiHost}/job/${jobId}.json`);
    let jobTitle = await jobResponse.json();
    return jobTitle;
}

let init = ()=> {
    getCandidateProfile(storedId)
    .then(data => {
        console.log(data);
        let fullName, middleName;
        if(data.middle_name) {
            fullName =  data.first_name + ' ' + data.middle_name + ', ' + data.last_name;
    
        } else {
            fullName = data.first_name + ', ' + data.last_name;
        }
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
                        <input id="first-name" type="text" placeholder="input new first name" value="${data.first_name}" readonly required>
                    </div>
                    <div>
                        <label for="middle-name">Middle Name</label>
                        ${setMid()}
                    </div>
                    <div>
                        <label for="last-name">Last Name</label>
                        <input id="last-name" type="text" placeholder="input new last name" value="${data.last_name}" readonly required>
                    </div>
                </div>
                <div class="profile-data-cnt">
                    <div>
                        <label for="job-title">Job</label>
                        <div class="select-option">
                            <input id="job-title" type="text" placeholder="input new job title" value="${returnedJobTitle}" readonly required>
                            <ul id="job-dd" class="option-dropdown">
                                <li id="suggOption"></li>
                            </ul>
                        </div>
                    </div>
                    <div>
                        <label for="rate">Rate</label>
                        <input id="rate" type="number" placeholder="input new rate" value="${data.rate}" readonly required>
                    </div>
                    <div>
                        <label for="level">Level</label>
                        <div class="select-option">
                            <input id="level" type="text" placeholder="input new level" value="${data.level}" readonly required>
                            <button type="button" class="select-icon" id="level-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                <!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
                                <path
                                    d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
                                </svg>
                            </button>
                            <ul id="level-dd" class="option-dropdown">
                                <li>1</li>
                                <li>2</li>
                                <li>3</li>
                                <li>4</li>
                                <li>5</li>
                                <li>6</li>
                                <li>7</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="profile-data-cnt">
                    <div>
                        <label for="country">Country</label>
                        <input id="country" type="text" placeholder="input new country" value="${data.country}" readonly required>
                    </div>
                    <div>
                        <label for="state">State</label>
                        <input id="state" type="text" placeholder="input new state" value="${data.state}" readonly required>
                    </div>
                    <div>
                        <label for="city">City</label>
                        <input id="city" type="text" placeholder="input new city" value="${data.city}" readonly required>
                    </div>
                </div>
                <div class="profile-data-cnt">
                    <div>
                        <label for="resume-link">Resume Link</label>
                        <a 
                            href="${data.resume_link}" 
                            target="_blank" 
                            title="go to ${data.resume_link}"
                        >
                            <input id="resume-link" type="url" placeholder="input new resume link" value="${data.resume_link}" readonly required>
                        </a>
                    </div>
                    <div>
                        <label for="outsource-rate">Outsource Rate</label>
                        <input id="outsource-rate" type="number" placeholder="input new outsource rate" value="${data.outsource_rate}" readonly required>
                    </div>
                    <div>
                        <label for="status">Status</label>
                        <div class="select-option">
                            <input id="status" type="text" placeholder="input new status" value="${data.status}" readonly required>
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
            let isReady = true;
            return isReady;
        }).then(isReady => {
            if(isReady) {
                loaderCont.style.display = "none";
                getDOMElems();
                // when the form is submitted
                formParent.onsubmit = (e)=> {
                    e.preventDefault();
                    if(levelIn.value && statusIn.value) {
                        console.log("submit");
                        sendRequestData("PUT");
                    }
                }
            }
        });
    });
    
}

init();


let viewForm = ()=> {
    document.querySelector("#profile-details > div > form").classList.remove("edit-mode");
    document.querySelector("#profile-details > div > form").classList.add("view-mode");
    console.log("view");
    init();
}

let editForm = ()=> {
    document.querySelector("#profile-details > div > form").classList.remove("view-mode");
    document.querySelector("#profile-details > div > form").classList.add("edit-mode");
    console.log("edit");
    let allInputs = viewCont.getElementsByTagName("input");
    for(let count = 0; count < allInputs.length; count++) {
        allInputs[count].readOnly = false;
    }
}
deleteBtn.onclick = ()=> {
    console.log("delete");
    let trulyDelete = confirm("You are about to delete this candidate from the database\n choose OK or Cancel.");
    if(trulyDelete) {
        fetch(`${apiHost}/candidate/${storedId}`, {
            method: 'DELETE',
        });
        localStorage.removeItem("candidateId");
        window.location.replace("./index.html");
    }
};
viewBtn.onclick = ()=> viewForm();
updateBtn.onclick = ()=> editForm();
