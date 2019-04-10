// import routes from "../../../BACK/routes"

const MyPage = document.getElementById("goToUserDetail");

const main = document.getElementById("main");
const userContent = document.querySelector(".user__content");

// Search Bar
const input = document.getElementById("search-input");
const searchResult = document.querySelector(".search-result");

const fetchHtml = (url) => {
    fetch(`${url}`)
        .then((response) => {
            return response.text();
        }).then((html) => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, "text/html");
            main.innerHTML = doc.getElementById("main").innerHTML;

            // fetch 될 때 선언을 하지 않으면 인식을 하지 못함. myPage로 가기전엔 userNav가 당연히 null임.
            // myPage로 넘어가면 userNav에 값이 할당되어야할 것 같지만 실제로 새로고침 된 게 아니기 때문에 js파일이 리로드 되지 않아 null 값이 유지 되는 것. 
            const userNav = document.getElementById("user__nav");
            userNav.addEventListener("click", changeContent)
            
        })
} 

const changeContent = async (e) => {
    console.log('hi')
    e.preventDefault();
    const target = e.target.innerHTML;
    console.log(target)
    switch (target) {
        case `Profile` :
        await fetchHtml(`http://localhost:3000/myPage/edit-profile`);
        break;
        case `Liked` :
        await fetchHtml(`http://localhost:3000/myPage/likes`);
        break;
        case `Following` :
        await fetchHtml(`http://localhost:3000/myPage/following`);
        break;
        default : console.log("end");
    }
    
} 

const goToUserDetail = async (e) =>  {
    e.preventDefault();
    console.log("possible")

    const path = e.target.href;
    await fetchHtml(`http://localhost:3000/myPage`)
    
  
        

}

const getSearchResult = async (e) => {
    const value = e.target.value
    console.log(e.keyCode)
    if(e.keyCode === 13){
        e.preventDefault();
        console.log("prevent")
 
        await fetch(`/search?search=${value}`)
        .then((response) => {
            return response.text();
        }).then((html) => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, "text/html");
            main.innerHTML = doc.getElementById("main").innerHTML;
            console.log(document.scripts[0].innerHTML)
            // Object.defineProperty(document.scripts, 'length', {
            //     writable: 'true'
            // });
            // Object.defineProperty(doc.scripts, 'length', {
            //     writable: 'true'
            // });

            // // for(let i = 0; i<document.scripts.length; i++){
            // // Array.prototype.shift.call(document.scripts)
            //     // document.scripts.pop();
                
            // // }
            // while(document.scripts[0]){
            //     document.scripts[0].remove();
            //     // document.scripts.add(doc.scripts[0])
            // }
            // document.scripts = doc.scripts
            // console.log(document.scripts)

            // for(const script of doc.scripts){
            //     Array.prototype.push.call(script)
            //     // document.scripts.push(script)
            // }
            // console.log(document.scripts)
            // // document.scripts.concat(doc.scripts)
            // const playSearch = document.querySelectorAll(".playSearch");
            // console.log(document.scripts[0],doc.scripts[0])
            
        })
            
    }
}

if(document.body) {

    MyPage.addEventListener("click", goToUserDetail);


    // 새로고침 된 페이지에서 작동하는 코드
    const userNav = document.getElementById("user__nav");

    if(userNav){
        userNav.addEventListener("click", changeContent)
    }

    console.log(input)
    input.addEventListener("keydown", getSearchResult)
    
}