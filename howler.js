const howler = require('howler');
const mm = require('music-metadata');

let song;
let songQueue = [];

let loaded = false;
let playing = false;
let muted = false;
let volume = 1;

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

function volumeUp() {
    if (volume <= 0.95) {
        volume = howler.Howler.volume((volume+0.05));
    }
}

function volumeDown() {
    if (volume >= 0)
    {
        volume = howler.Howler.volume((volume-0.05));
    }
}

const formatTime = (time) => {
    const minutes = parseInt(time / 60);
    let seconds = parseInt(time - minutes * 60);
    if (seconds < 10) seconds = "0" + seconds;
    return (minutes + ":" + seconds);
}

window.onkeydown = (key) => {
    const spacebar = 32;
    if (key.keyCode == spacebar) {
        toggleSong();
    }
}

const changeSong = (file) => {
    const src = file.path;

    song = new Howl({
        src: [src],
        format: ['ogg', 'mp3'],
        html5: true,
        onplay: () => {
            const playButton = document.getElementById("playButton");
            playButton.src = "./Images/pause-circle.svg";
        },
        onpause: () => {
            const playButton = document.getElementById("playButton");
            playButton.src = "./Images/play-circle.svg";
        },
        onstop: () => {
            const playButton = document.getElementById("playButton");
            playButton.src = "./Images/play-circle.svg";
        },
        onend: () => {
            songQueue.shift();
            const next = songQueue[0];
            changeSong(next);
        }
    });

    mm.parseFile(src).then(metadata => {
        const title = `[${metadata.common.title}] - Flips Music Player`;
        document.title = title;
    });

    playing = true;
    song.play();
}

const showQueue = async () => {
    const listElement = document.getElementById("playlist");
    let list = "";

    await songQueue.reduce(async (memo, item) => {
        await memo;
        await mm.parseFile(item.path).then(metadata => {
            list += `<li>${metadata.common.title} - ${metadata.common.artist}</li>`;
        });
        listElement.innerHTML = list;
    }, undefined);
}

const loadFile = (event) => {
    songQueue = Array.from(event.target.files).filter(
        file => file.type == "audio/ogg" || file.type == "audio/mp3"
    );

    loaded = true;
    if (playing) stopSong();

    changeSong(songQueue[0]);

    if (songQueue.length > 1) showQueue();
}

{
    const songInput = document.getElementById("songFile");
    const playlistInput = document.getElementById("playlistFile");
    songInput.addEventListener('change', loadFile);
    playlistInput.addEventListener('change', loadFile);
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
