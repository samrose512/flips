const howler = require('howler');

let song;

let loaded = false;
let playing = false;
let muted = false;

function toggleSong() {
    if (!loaded) return;
    playing = !playing;
    if (playing) song.play();
    else song.pause();
}

function toggleMute() {
    if (!muted) {
        howler.Howler.mute(true);
        muted = true;
    }
    else {
        howler.Howler.mute(false);
        muted = false;
    }
}

function stopSong() {
    if (!loaded) return;
    playing = false;
    song.stop();
}

function loadSong() {
    const songFile = document.getElementById("songFile").files[0];
    const src = URL.createObjectURL(songFile);

    loaded = true;
    if (playing) stopSong();

    song = new Howl({
        src: [src],
        format: ['ogg', 'mp3'],
        html5: true,
        onplay: () => {
            const playButton = document.getElementById("playButton");
            playButton.src = "./Images/play-circle.svg";
        },
        onpause: () => {
            const playButton = document.getElementById("playButton");
            playButton.src = "./Images/pause-circle.svg";
        },
        onstop: () => {
            const playButton = document.getElementById("playButton");
            playButton.src = "./Images/pause-circle.svg";
        }
    });
}

const formatTime = (time) => {
    const minutes = parseInt(time / 60);
    let seconds = parseInt(time - minutes * 60);
    if (seconds < 10) seconds = "0" + seconds;
    return (minutes + ":" + seconds);
}

setInterval(
    () => {
        if (!loaded || !playing) return;
        const timeElement = document.getElementById("songTime");
        const progressBar = document.getElementById("songDuration");

        const current = song.seek();
        const duration = song.duration();
        if (isNaN(current)) return;

        const percentage = current * 100 / duration;
        progressBar.value = percentage;

        timeElement.innerHTML = formatTime(current) + " / " + formatTime(duration);
    }, 100
);
