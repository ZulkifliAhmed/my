let musicImage = document.querySelector(".images img"),
  songName = document.querySelector(".mp3-name .song"),
  singerName = document.querySelector(".mp3-name .singer"),
  audioSrc = document.querySelector(".mp3-src"),
  progressArea = document.querySelector(".mp3-bar"),
  progressBar = document.querySelector(".bar-progres"),
  musicCurrentTime = document.querySelector("#music-time"),
  musicDuration = document.querySelector("#music-duration"),
  changeIcon = document.querySelector("#change-icon"),
  previous = document.querySelector("#previous"),
  next = document.querySelector("#next"),
  favrit = document.querySelector("#favrit"),
  toggleBtn = document.getElementById("toggleBtn");

let musicIndex = 0;

window.onload = function () {
  loadData(musicIndex);
};

// load Data
function loadData(index) {
  musicImage.src = allAudio[index].img;
  songName.innerHTML = allAudio[index].name;
  singerName.innerHTML = allAudio[index].artist;
  audioSrc.src = allAudio[index].src;
}

//control play and pause button
function playPause() {
  toggleBtn.addEventListener("click", () => {
    if (toggleBtn.classList.contains("fa-play")) {
      toggleBtn.classList.remove("fa-play");
      toggleBtn.classList.add("fa-pause");
      audioSrc.play();
    } else {
      toggleBtn.classList.remove("fa-pause");
      toggleBtn.classList.add("fa-play");
      audioSrc.pause();
    }
  });
}

// next button
next.onclick = function next() {
  if (musicIndex < allAudio.length - 1) {
    musicIndex++;
  } else {
    musicIndex = 0;
  }
  loadData(musicIndex);
  if (toggleBtn.classList.contains("fa-pause")) {
    audioSrc.play();
  } else {
    audioSrc.pause();
  }
  progressBar.style.width = 0;
};

// previous button
previous.onclick = function () {
  if (musicIndex > 0) {
    musicIndex--;
  } else {
    musicIndex = allAudio.length - 1;
  }
  loadData(musicIndex);
  if (toggleBtn.classList.contains("fa-pause")) {
    audioSrc.play();
  } else {
    audioSrc.pause();
  }
  progressBar.style.width = 0;
};
playPause();

// progress area control
progressArea.addEventListener("click", (e) => {
  let progressWidth = progressArea.clientWidth,
    clickedoffsetX = e.offsetX,
    songDuration = audioSrc.duration;
  audioSrc.currentTime = (clickedoffsetX / progressWidth) * songDuration;
  if (toggleBtn.classList.contains("fa-pause")) {
    audioSrc.play();
  } else {
    audioSrc.pause();
  }
});

//playe and pause audio controll
audioSrc.addEventListener("timeupdate", (e) => {
  const currentT = e.target.currentTime;
  const duration = e.target.duration;
  let progressWidth = (currentT / duration) * 100;
  progressBar.style.width = `${progressWidth}%`;
  if (currentT == duration) {
    toggleBtn.classList.remove("fa-pause");
    toggleBtn.classList.add("fa-play");
  }
  audioSrc.addEventListener("loadeddata", () => {
    const interval = setInterval(() => {
      musicCurrentTime.innerHTML = formatTime(audioSrc.currentTime);
    }, 1000);
    musicDuration.innerHTML = formatTime(audioSrc.duration);
    audioSrc.addEventListener("ended", () => {
      clearInterval(interval);
    });
  });
});

// format audio time
function formatTime(time) {
  if (time && !isNaN(time)) {
    const minutes =
      Math.floor(time / 60) < 10
        ? `0${Math.floor(time / 60)}`
        : Math.floor(time / 60);
    const seconds =
      Math.floor(time % 60) < 10
        ? `0${Math.floor(time % 60)}`
        : Math.floor(time % 60);
    return `${minutes}:${seconds}`;
  }
  return "00:00";
}

// change reapet shuffle button
changeIcon.addEventListener("click", () => {
  if (changeIcon.classList.contains("fa-repeat")) {
    changeIcon.classList.remove("fa-repeat");
    changeIcon.classList.add("fa-rotate-right");
  } else if (changeIcon.classList.contains("fa-rotate-right")) {
    changeIcon.classList.remove("fa-rotate-right");
    changeIcon.classList.add("fa-shuffle");
  } else if (changeIcon.classList.contains("fa-shuffle")) {
    changeIcon.classList.remove("fa-shuffle");
    changeIcon.classList.add("fa-repeat");
  }
});

// change reapet shuffle logec
audioSrc.addEventListener("ended", () => {
  if (changeIcon.classList.contains("fa-repeat")) {
    if (musicIndex < allAudio.length - 1) {
      musicIndex++;
    } else {
      musicIndex = 0;
    }
    loadData(musicIndex);
    audioSrc.play();
    progressBar.style.width = 0;
    toggleBtn.classList.remove("fa-play");
    toggleBtn.classList.add("fa-pause");
  } else if (changeIcon.classList.contains("fa-rotate-right")) {
    audioSrc.currentTime = 0;
    audioSrc.play();
    progressBar.style.width = 0;
    toggleBtn.classList.remove("fa-play");
    toggleBtn.classList.add("fa-pause");
  } else if (changeIcon.classList.contains("fa-shuffle")) {
    let rNumber = Math.floor(Math.random() * allAudio.length);
    do {
      rNumber = Math.floor(Math.random() * allAudio.length);
    } while (musicIndex == rNumber);
    musicIndex = rNumber;
    loadData(musicIndex);
    audioSrc.play();
    progressBar.style.width = 0;
    toggleBtn.classList.remove("fa-play");
    toggleBtn.classList.add("fa-pause");
  }
});

// favrit icon
favrit.addEventListener("click", () => {
  favrit.classList.toggle("active");
favrit.style.color = favrit.classList.contains("active") ? "red" : "#9659ff";

});
