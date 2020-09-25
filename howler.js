const howler = require('howler');

let song = new Howl({
    src: ['song.ogg']
});

let playing = false;

function toggleSong() {
    playing = !playing;
    if (playing) song.play();
    else song.pause();
}

function stopSong() {
    playing = false;
    song.stop();
}

setInterval(
    () => {
        const progressBar = document.getElementById("songDuration");
        const current = song.seek() * 100;
        const duration = song.duration();
        const percentage = current / duration;
        progressBar.value = percentage;
    }, 100
);
