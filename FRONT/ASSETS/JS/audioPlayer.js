let playBtn = document.getElementById("audio-player__btn--play"),
    volumeBtn = document.getElementById("audio-player__btn--volume"),
    repeatBtn = document.getElementById("audio-player__btn--repeat"),
    volumeProgressBar = document.getElementById("volume-progressBar"),
    audio = document.getElementById("audio"),
    progressBar = document.getElementById("progressBar"),
    currentTime = document.querySelector(".currentTime"),
    totalTime = document.querySelector(".totalTime"),
    playMain = document.querySelectorAll(".playMain"),
    playSearch = document.querySelector(".playSearch"),
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


const handelMainPlay = async (e) => {
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

const handelSearchPlay = async (e) => {
    console.log("hi")
    e.preventDefault();
    const currentHref = window.location.href.split("=")[1]
    await fetch(`${e.target.parentNode.href}`, {method: "GET"})
    // 업데이트 된 데이터베이스의 내용을 반영하기 위해선 아래의 페이지를 리로드 해야하기 때문에 새롭게 get요청을 보내는 것이다.
    await fetch(`http://localhost:3000/search?search=${currentHref}`, {method: "GET"})
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

const initinit = () => {
    console.log(playSearch);
    for(const btn of playMain)
        btn.addEventListener("click", handelMainPlay);
    
    if(playSearch && (playSearch.length > 1)){
        console.log("1>")
        for(const btn of playSearch) {
            btn.addEventListener("click", handelSearchPlay);
        }
    } else if(playSearch && (playSearch.length !== 1)) {
        console.log("===1")
        playSearch.addEventListener("click", handelSearchPlay);
    }
        
    

    console.log(playBtn)
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



if(document.getElementsByTagName("body")) initinit();

