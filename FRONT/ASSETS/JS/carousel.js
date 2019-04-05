const fowardBtn = document.querySelector(".carousel__btn--next");
const backwardBtn = document.querySelector(".carousel__btn--back");

const carouselContainer = document.getElementById('carousel__container')
const carousel = document.getElementById('carousel__wrapper')
const elems = document.querySelectorAll(".carousel__element");
let elem = document.querySelector(".carousel__element");

const carouselContainerWidth = carouselContainer.offsetWidth;
const elemStyle = window.getComputedStyle(elem);
const elemMarginRight = elemStyle.marginRight.match(/\d+/g);
console.log(elemMarginRight)


let offset = 0;
let direction;



// const makeDummyElemsArr = (currentCarouselElems) => 
//     currentCarouselElems.slice(0, currentCarouselElems.length-1);


const makeSetForLoop = () => {
    // baseElemsArr.push(...dummyElemsArr);
    const ElemsArr = [...elems];
    if(direction === 'foward'){
        for(const elem of ElemsArr) 
        carousel.innerHTML += 
        `<div class="carousel__element">${elem.innerHTML}/<div>`;
    } else if(direction === 'backward') {
        for(const elem of ElemsArr) {
            console.log(elem);
            // const insertNode = `<div class="carousel__element">${elem.innerHTML}/<div>`;
            // carousel.insertBefore(elem, carousel.children[0]);
            console.log(carousel.innerHTML += elem);
        }
    }
    
}

const backToFirstLength = () => {
    if(direction === 'foward'){
        // clear carousel.innerhtml 
        while (carousel.childNodes[1]) carousel.removeChild(carousel.childNodes[1]);
    
        for(const elem of elems){
            carousel.innerHTML += `<div class="carousel__element">${elem.innerHTML}/<div>`;
        }
    }
    if(direction === 'backward'){
        while (carousel.childNodes[1]) carousel.removeChild(carousel.childNodes[1]);
    
        for(const elem of elems){
            carousel.innerHTML += `<div class="carousel__element">${elem.innerHTML}/<div>`;
        }
    }
}

const moveFoward = () => {  
    const maxX = carouselContainerWidth + offset
    let carouselStyle = carousel.style;
    if(maxX > 0){
        
        offset -= Number(elem.offsetWidth) + Number(elemMarginRight);
        console.log(offset, carouselContainerWidth)
        direction = 'foward';
        // offset -= Number(carouselContainerWidth) + Number(elemMarginRight); 
        // console.log(offset)
        carouselStyle.transform = `translateX(${offset}px)`
        
    }

    
}

const moveBackward = () => {
    direction = 'backward';
    console.log(offset, carouselContainerWidth)
    if(offset < 0){
        offset += Number(elem.offsetWidth) + Number(elemMarginRight);
        let carouselStyle = carousel.style;
        console.log(offset)
        carouselStyle.transform = `translateX(${offset}px)`
        // backToFirstLength();
        // console.log(carousel.children.length);
        // makeSetForLoop();
        console.log(carousel.children.length);
    } else {
        console.log(offset)
        offset = 0;
    }
}

if(elems){
    console.log(carouselContainerWidth);
    fowardBtn.addEventListener("click", moveFoward);
    backwardBtn.addEventListener("click", moveBackward);
}
