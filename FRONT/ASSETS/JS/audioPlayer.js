

const playBtn = document.getElementById("audio-player__btn--play"),
      volumeBtn = document.getElementById("audio-player__btn--volume"),
      repeatBtn = document.getElementById("audio-player__btn--repeat"),
      volumeProgressBar = document.getElementById("volume-progressBar"),
      audio = document.getElementById("audio"),
      progressBar = document.getElementById("progressBar"),
      currentTime = document.querySelector(".currentTime"),
      totalTime = document.querySelector(".totalTime"),
      playMain = document.querySelectorAll(".playMain")

let seeking = false,
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
    console.log(e)
    const percentage = (audio.currentTime * 100) / audio.duration;
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
    const response = await fetch(`${e.currentTarget.href}`, {method: "GET"})
    console.log(response)

}

const init = () => {
    
    for(const btn of playMain){
        console.log(btn)
        btn.addEventListener("click", handelMainPlay)
    }

    console.log(playBtn)
    playBtn.addEventListener("click", handlePlayClick)
    audio.addEventListener('timeupdate', updateProgressBar, false);
    audio.addEventListener('loadedmetadata', () => {
            totalTime.innerHTML = formatTime(audio.duration);
            updateVProgressBar();
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



if(playBtn) {
    init();
}
