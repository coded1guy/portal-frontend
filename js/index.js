// get all dom elements needed to populate the home page
const listContainer = document.querySelector("#user-list");
const addCandidate = document.querySelector("#add-candidate");
const paginationCont = document.querySelector("#pagination-ctrl");
// state management for the pagination
let prevPage;
let nextPage = 1;
/*
    this async function gets the first 
    batch of candidates data from the candidate endpoint
*/
let getAllCandidates = async(apiLink)=> {
    let response = await fetch(apiLink);
    let data = await response.json();
    return data;
}
/*
    this async function gets each candidate's job_title
    it does this by querying the job endpoint with 
    each candidate's job_id returned from the candidate endpoint
*/
let getJobTitle = async(jobId)=> {
    let jobResponse = await fetch(`http://localhost:8000/api/job/${jobId}.json`);
    let jobTitle = await jobResponse.json();
    return jobTitle;
}
/*
    this function redirects us to the candidate's profile page
*/
let goToCandidateProfile = (candidateId)=> {
    localStorage.setItem("candidateId", candidateId);
    loaderCont.style.display = "flex";
    window.location.href= "./candidate-profile.html";
}
// populate the data table
let setDataTable = (results)=> {
    listContainer.innerHTML = "";
    for(let resultIterator = 0; resultIterator < results.length; resultIterator++) {
        getJobTitle(results[resultIterator].job_id).then(jobTitle => {
            listContainer.innerHTML += `<tr onclick="goToCandidateProfile(${results[resultIterator].id})">
                <td>${results[resultIterator].id}</td>
                <td>${results[resultIterator].first_name + ' ' + results[resultIterator].last_name}</td>
                <td>${results[resultIterator].country}</td>
                <td>${jobTitle.job_title}</td>
                <td>${results[resultIterator].status}</td>
            </tr>`;
        });
    }
    loaderCont.style.display = "none";
}
/* 
    this function:
    - sets the style for active page
    - changes the page
*/
let goToPage = (page)=> {
    if(nextPage) {
        prevPage = nextPage;
        nextPage = page;
        if(prevPage == nextPage) {
            console.log("true", prevPage, nextPage);
        } else {
            document.querySelector(`#pg-btn${prevPage}`).classList.remove("current-page");
            document.querySelector(`#pg-btn${nextPage}`).classList.add("current-page");
            loaderCont.style.display = "flex";
            if (page > 1) {
                propUrl = `http://localhost:8000/api/candidate.json/?page=${page}`;
            } else {
                propUrl = "http://localhost:8000/api/candidate.json";
            }
            getAllCandidates(propUrl)
            .then(data => {
                console.log(data, data.results);
                setDataTable(data.results);
            })
            .catch(err => console.error(err));
        }
    }
}
// this function controls the pagination
let setupPagination= (count)=> {
    paginationCont.innerHTML = "";
    let pageNumbers;
    const divs = (count / 6);
    if(divs > Math.floor(divs)) {
        pageNumbers = Math.floor(divs) + 1;
    } else {
        pageNumbers = Math.floor(divs);
    }
    for (let forCount = 1; forCount < (pageNumbers + 1); forCount++) {
        if(forCount == 1) {
            paginationCont.innerHTML += `
                <button id="pg-btn${forCount}" class="pag-a current-page" onclick=goToPage(${forCount})>${forCount}</button>
            `;
        } else {
            paginationCont.innerHTML += `
                <button id="pg-btn${forCount}" class="pag-a" onclick=goToPage(${forCount})>${forCount}</button>
            `;
        }
    }
}
// this function initializes all settings of the home page
(()=> {
    getAllCandidates("http://localhost:8000/api/candidate.json")
    .then(data => {
        count = Number(data.count);
        setupPagination(count);
        setDataTable(data.results);
    })
})();
// this is the eventlistener for the add candidate button
addCandidate.onclick = ()=> {
    window.location.href = "./add-candidate.html";
}



let searchForm = document.querySelector("#search-bar");
searchForm.onsubmit = (e)=> {
    e.preventDefault();
    let fullName = searchForm.querySelector("input").value;
    fullName = fullName.split(',');
    getAllCandidates(`http://localhost:8000/api/candidate.json?status=&first_name=${fullName[0].trim()}&last_name=${fullName[1].trim()}`)
    .then(data => {
        count = Number(data.count);
        setupPagination(count);
        setDataTable(data.results);
    })
}
