let playBtn = document.getElementById("audio-player__btn--play"),
    volumeBtn = document.getElementById("audio-player__btn--volume"),
    repeatBtn = document.getElementById("audio-player__btn--repeat"),
    volumeProgressBar = document.getElementById("volume-progressBar"),
    audio = document.getElementById("audio"),
    progressBar = document.getElementById("progressBar"),
    currentTime = document.querySelector(".currentTime"),
    totalTime = document.querySelector(".totalTime"),
    playMain = document.querySelectorAll(".playMain"),
    playSearch = document.querySelectorAll(".playSearch"),
    footer = document.getElementsByTagName("footer"),
    seeking = false,
    seekingV = false;






const formatTime = (seconds) => {
    console.log(`duration ${seconds}`)
    const secondsNumber = parseInt(seconds, 10);
    // 전체 초수 / 60 = 분 초수
    let minutes = Math.floor( secondsNumber / 60 );
    // 전체 초수 - 분 초수 = 초수
    let totalSeconds = secondsNumber - (minutes * 60);
    
    // 1의 자리 수일 때, n이 아닌 0n으로 표기되게끔 만들어줌.
    
    if(totalSeconds < 10) {
        totalSeconds = `0${totalSeconds}`;
    }
    
    return `${minutes}:${totalSeconds}`;
    
}



const handlePlayClick = () => {
    console.log(777)
    if(audio.paused){
        audio.play()
        playBtn.innerHTML = `<i class="fas fa-pause"></i>`;
    } else {
        audio.pause();
        playBtn.innerHTML = `<i class="fas fa-play"></i>`;
    }
}

const updateProgressBar = (e) => {
    console.log(audio.currentTime, audio.duration)
    const percentage = Math.floor((audio.currentTime * 100) / audio.duration);
    console.log(percentage)
    // Update the progress bar's value
    progressBar.value = percentage;
    currentTime.innerHTML = formatTime(audio.currentTime);
    
}

const updateVProgressBar = () => {
    volumeProgressBar.value = audio.volume;
    console.log(audio.volume)
}


const seek = (e) => {
    // 마우스가 클릭된 상태에서만 유효한 코드
    if(seeking) {
        console.log(`seeking is true ${seeking}`)
        // 마우스 위치 x좌표값 / progressBar의 너비
        const percentage = e.offsetX /  e.target.parentNode.offsetWidth;
        // 실제 화면에 나타낼 progressBar의 value 
        progressBar.value = percentage * 100;
        
        // 움직인 길이만큼 오디오의 현재 위치 조정. (ex. 180초에서 30% 진행된 위치가 currentTime이다)
        audio.currentTime = Math.floor(audio.duration * percentage);
        
    }
    
}

const handlerBar = (e) => {
    seeking = true;
    seek(e);
}

const seekingStop = () => {
    seeking = false;
}


const handleVbar = () => {
    seekingV = true;
}

const seekV = (e) => {
    if(seekingV) {
        const percentage = e.offsetX / e.target.parentNode.offsetWidth
        // console.log( e.target.parentNode.offsetWidth)
        volumeProgressBar.value = percentage * 100;
        audio.volume = percentage;
        console.log(percentage)
    }

    if(volumeProgressBar.value >= 50) {
        volumeBtn.innerHTML = `<i class="fas fa-volume-up"></i>`;
    } else {
        if(volumeProgressBar.value < 50 & volumeProgressBar.value >= 20) {
            volumeBtn.innerHTML = `<i class="fas fa-volume-down"></i>`;
        } else {
            if(volumeProgressBar.value < 20 & volumeProgressBar.value >= 1){
                volumeBtn.innerHTML = `<i class="fas fa-volume-off"></i>`;
            } else {
                volumeBtn.innerHTML = `<i class="fas fa-volume-mute"></i>`;
            }
        }
    }   
}

const seekingVStop = () => {
    seekingV = false;
}

const handleVolumeClick = () => {
    if(audio.muted){
        console.log("hey")
        audio.muted = false;
        volumeBtn.innerHTML = `<i class="fas fa-volume-up"></i>`;
        volumeProgressBar.value = 50;
    } else {
        audio.muted = true;
        console.log("here")
        volumeBtn.innerHTML = `<i class="fas fa-volume-mute"></i>`;
        volumeProgressBar.value = 0;
    }
}


const handleRepeat = () => {
    audio.currentTime = 0;
}


const handleMainPlay = async (e) => {
    e.preventDefault();
    console.log(e.currentTarget.href)
    await fetch(`${e.currentTarget.href}`, {method: "GET"})
        .then( async (res) => {
            console.log(`${res.url}`)
           return await fetch(`${res.url}`, {method: "GET"})
        }).then(res2 => {
            console.log(res2)
            return res2.text()
        }).then(html => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, "text/html");
            footer[0].innerHTML = doc.getElementsByTagName("footer")[0].innerHTML
            console.log(footer[0])

            playBtn = document.getElementById("audio-player__btn--play"),
            volumeBtn = document.getElementById("audio-player__btn--volume"),
            repeatBtn = document.getElementById("audio-player__btn--repeat"),
            volumeProgressBar = document.getElementById("volume-progressBar"),
            audio = document.getElementById("audio"),
            progressBar = document.getElementById("progressBar"),
            currentTime = document.querySelector(".currentTime"),
            totalTime = document.querySelector(".totalTime"),
            seeking = false,
            seekingV = false;

            audio.load()
            initinit();
            console.log(audio)
        })

}

const handleSearchPlay = async (e) => {
    // 안에 내용만 바뀌고 여전히 main페이지가 로드된 상태 이기 때문에 결과 페이지가 fetch될 때,
    // 플레이서치 버튼을 새로 선언해야 이벤트가 인식될 수 있음. -> 별개의 스크립트 파일이라 연동이 안됨. 중요한건 audioPlayer.js가 리로드 되어야한단느 것. 
    // 아예 스크립트 부분을 바꿔주면 리로드하는 것과 같은 결과가 나오지 않을까
    // -> writable로 속성 바꿔서 이것저것 시도해봤는데 삭제하는 것까만 성공했고, 추가는 도저히 되질 않는다. 애초에 htmlcollection을 함부로 건들지 말라고 하네.
    // url change 이벤트를 사용하지 않는 이상, 스크립트 파일을 fired시킬 방법이 없다. 히스토리 관리를 더이상 미룰 수 없겠어.
    // https://stackoverflow.com/questions/6390341/how-to-detect-url-change-in-javascript, https://stackoverflow.com/questions/38667729/is-there-an-event-that-fires-when-url-changes
    e.stopPropagation();
    e.preventDefault();
    const currentHref = window.location.href.split("=")[1]
    const path = `http://localhost:3000/search?search=${currentHref}`
    console.log(window.location.href)


    await fetch(`${e.target.parentNode.href}`, {method: "GET"})
    // 업데이트 된 데이터베이스의 내용을 반영하기 위해선 아래의 페이지를 리로드 해야하기 때문에 새롭게 get요청을 보내는 것이다.
    await fetch(path, {method: "GET"})
        .then(res => {
            return res.text()
        }).then(html => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, "text/html");
            footer[0].innerHTML = doc.getElementsByTagName("footer")[0].innerHTML

            {

                playBtn = document.getElementById("audio-player__btn--play"),
                volumeBtn = document.getElementById("audio-player__btn--volume"),
                repeatBtn = document.getElementById("audio-player__btn--repeat"),
                volumeProgressBar = document.getElementById("volume-progressBar"),
                audio = document.getElementById("audio"),
                progressBar = document.getElementById("progressBar"),
                currentTime = document.querySelector(".currentTime"),
                totalTime = document.querySelector(".totalTime"),
                seeking = false,
                seekingV = false;
            }

            audio.load()
            initinit();
        })
}

const handleUpdateVariables = () => {
    // 왜 그 이전 페이지의 결과값을 가져올까?
    // 내가 원하는 건 ajax 요청이 완료된 이후의 페이지 결관데,
    // 이벤트가 발생할 당시의 페이지 내용이 추출 되는 것 같다. 
    // popstate -> UpdateVariables -> fetchHtml 이 순서로 실행되는 거지. 일단 임시 방편으로 settimeout함수를 걸어 순서를 미뤄놨고 다른 방법은 찬찬히 생각해보자.
    setTimeout(() => {
        playSearch = document.querySelectorAll(".playSearch");
        console.log(playSearch)
        initinit()
    }, 5000);
}

const initinit = () => {
    for(const btn of playMain)
    btn.addEventListener("click", handleMainPlay);
    
    console.log(playSearch.length)
    if(playSearch && (playSearch.length > 1)){
        for(const btn of playSearch) {
            btn.addEventListener("click", handleSearchPlay);
        }
    } else if(playSearch && (playSearch.length === 1)) {
        playSearch[0].addEventListener("click", handleSearchPlay);
        // querySelectorAll로 가져온 요소는 nodeList이기 때문에 인덱스를 지정하지 않고,
        // 배열 자체에 이벤트를 걸면 Uncaught TypeError: playSearch.addEventListener is not a function에러가 뜬다.
    }
        
    
    window.addEventListener('popstate', handleUpdateVariables);



    {

        playBtn.addEventListener("click", handlePlayClick)
        audio.addEventListener('timeupdate', updateProgressBar, false);
        audio.addEventListener('loadedmetadata', () => {
            console.log(audio.duration)
                totalTime.innerHTML = formatTime(audio.duration);
                console.log(totalTime)
                // updateVProgressBar();
        })
        progressBar.addEventListener('mousedown', handlerBar, false);
        progressBar.addEventListener('mousemove', seek, false);
        document.documentElement.addEventListener('mouseup', seekingStop, false);
    
        volumeProgressBar.addEventListener('mousedown', handleVbar, false);
        volumeProgressBar.addEventListener('mousemove', seekV, false);
        document.documentElement.addEventListener('mouseup', seekingVStop, false);
    
        volumeBtn.addEventListener("click", handleVolumeClick);
    
        repeatBtn.addEventListener("click", handleRepeat);
    }

}



if(document.body) {
    // playSearch = document.querySelectorAll(".playSearch")
    initinit();

}

