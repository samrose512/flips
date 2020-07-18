const howler = require('howler');

var song = new Howl({
  src: ['song.mp3', song.ogg']
});

function playSong() {
  song.play();
}

function stopSong() {
  song.stop();
}

function pauseSong() {
  song.pause();
}