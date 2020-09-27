const howler = require('howler');
const mm = require('music-metadata-browser');

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

{
    const songInput = document.getElementById("songFile");
    songInput.addEventListener('change',
        () => {
            const file = songInput.files[0];
            const src = URL.createObjectURL(file);

            loaded = true;
            if (playing) stopSong();
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
                }
            });

            mm.parseBlob(file)
                .then(metadata => {
                    const title = `[${metadata.common.title}] - Flips Music Player`;
                    document.title = title;
                })
        }
    )
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
