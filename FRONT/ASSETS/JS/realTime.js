// import routes from "../../../BACK/routes"

const MyPage = document.getElementById("goToUserDetail");

const main = document.getElementById("main");
const userContent = document.querySelector(".user__content")

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



window.onload = () => {
    // console.log(userNav)
    MyPage.addEventListener("click", goToUserDetail);


    // 새로고침 된 페이지에서 작동하는 코드
    const userNav = document.getElementById("user__nav");

    if(userNav){
        userNav.addEventListener("click", changeContent)

    }

    
}