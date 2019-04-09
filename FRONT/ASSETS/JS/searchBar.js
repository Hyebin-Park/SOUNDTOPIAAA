const searchResultUl = document.querySelector(".search-result");
const searchResultLi = document.getElementById("searchResult");
const searchInput = document.getElementById("search-input");
let S_artist, S_track, resultArr = [];

const getJsonDataFromServer = async (e) => {
    if(!(S_artist && S_track)){

        await fetch(`http://localhost:3000/api/search`)
            .then(res => res.json())
                .then(data => {
                    S_artist = data['S_artist'];
                    S_track = data['S_track'];
                })
        
        for(const obj of S_artist){
            resultArr.push(obj.name);
        }
        for(const obj of S_track){
            resultArr.push(obj.title);
        }


    }
}

const getValue = (e) => {
    const value =  e.target.value;
    let searchResult;
        const result = resultArr.filter(elem => {
        return elem.toLowerCase().includes(value.toLowerCase()); 
    })

        for(const elem of result){
            if(searchResult){
                searchResult += `<li id="searchResult">
                <a href="/search?search=${elem}"><i class="fas fa-search"></i>${elem}</a></li>`
            } else {
                searchResult = `<li id="searchResult">
                <a href="/search?search=${elem}"><i class="fas fa-search"></i>${elem}</a></li>`
            }

        }
    
    searchResultUl.innerHTML = searchResult;

    if(value === ""){
        searchResultUl.innerHTML = ''
    }
        
    

}

// const gotoResultPage = () => {
    
// }

const init = () => {

    searchInput.addEventListener("mousedown", getJsonDataFromServer);
    searchInput.addEventListener("keyup", getValue);
    searchResultLi.addEventListener("click", gotoResultPage);
}

if(searchInput) init();