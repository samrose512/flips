const howler = require('howler');

let song;

let loaded = false;
let playing = false;

function toggleSong() {
    if (!loaded) return;
    playing = !playing;
    if (playing) song.play();
    else song.pause();
}

function stopSong() {
    if (!loaded) return;
    playing = false;
    song.stop();
}

function loadSong() {
    loaded = true;
    const songFile = document.getElementById("songFile").files[0];
    const src = URL.createObjectURL(songFile);
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

setInterval(
    () => {
        if (!loaded || !playing) return;
        const progressBar = document.getElementById("songDuration");
        const current = song.seek() * 100;
        const duration = song.duration();
        const percentage = current / duration;
        if (!isNaN(percentage)) progressBar.value = percentage;
    }, 100
);
