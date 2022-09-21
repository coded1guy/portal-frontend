const formParent = document.querySelector("#formParent");
console.log(formParent);
const formChildren = formParent.querySelectorAll("input");
console.log(formChildren);
const [ country, state, city, jobId, level, status ] = formChildren;
console.log(country);