// Storing data and elements into variables
let myLeads = [];
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");
const tabBtn = document.getElementById("tab-btn");
//To retrieve leads from the local storage
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));

//To prevent the leads from disappearing when the page is refreshed or when our browser is closed
if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads)
}

//Making our 'SAVE TAB' button work
tabBtn.addEventListener("click", function() {
    //grabbing the url of the current tab
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads);
    })

})

//Rendering out the leads in the unordered list, when the user clicks the SAVE button, using for loop and template strings
// This function is called in multiple places
function render(leads) {
    let listItems = "";
    for (let i = 0; i < leads.length; i++) {
    // using template strings
    listItems += `
        <li>
            <a target='_blank' href='${leads[i]}'>
                ${leads[i]}
            </a>
        </li>
    `
    }; 
    ulEl.innerHTML = listItems;
}

//Making our 'DELETE BUTTON' work so it clears all leads from the local storage when clicked
deleteBtn.addEventListener("dblclick", function() {
    localStorage.clear()
    myLeads = []
    render(myLeads);
})

//Pushing the values from the input field
inputBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value);
    //to clear out the input field after saving a lead
    inputEl.value = "";
    //To save the leads to the local storage
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
})