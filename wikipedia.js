let input_text = document.getElementById("searchInput");
let search_results = document.getElementById("searchResults");
let spinnerEl = document.getElementById("spinner");
function createResult(first_result){
    let {title,link,description} = first_result;
    //result item
    let mainContainer = document.createElement("div");
    mainContainer.classList.add("result-item");
    search_results.appendChild(mainContainer);
    //title Element
    let resultElement = document.createElement("a");
    resultElement.classList.add("result-title");
    resultElement.textContent = title;
    resultElement.href = link;
    resultElement.target = "_blank";
    mainContainer.appendChild(resultElement);
    //Break element
    let breakE1 = document.createElement("br");
    mainContainer.appendChild(breakE1);
    //url element
    let urlElemnt = document.createElement("a");
    urlElemnt.classList.add("result-url");
    urlElemnt.href = link;
    urlElemnt.target =" _blank";
    urlElemnt.textContent = link;
    mainContainer.appendChild(urlElemnt);
    //break element
    let breakE2 = document.createElement("br");
    mainContainer.appendChild(breakE2);
    //description element
    let para = document.createElement("p");
    para.classList.add("line-description");
    para.textContent = description;
    mainContainer.appendChild(para);
}
function displayResults(search_results){
    spinnerEl.classList.add("d-none");
    for (let result of search_results){
        createResult(result);
    }
    
}
function searchWiki(event){
    if(event.key==="Enter"){
        spinnerEl.classList.remove("d-none");
        search_results.textContent="";
        let inputValue = input_text.value;
        let url = "https://apis.ccbp.in/wiki-search?search="+inputValue;
        let options={
            method:"GET"
        };
        fetch(url,options)
        .then(function(responce){
            return responce.json();
        })
        .then(function(data){
            let {search_results} = data;
            displayResults(search_results);
        })
    }
};
input_text.addEventListener("keydown",searchWiki);
