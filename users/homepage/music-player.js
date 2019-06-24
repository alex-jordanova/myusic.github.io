const MAX_PERCENT = 100;
const SECONDS_IN_MINUTE = 60;
const songs = [
    kamiiro = {
        src: "https://a.tumblr.com/tumblr_oayuabviNM1tzonq7o1.mp3",
        cover: "https://66.media.tumblr.com/tumblr_oayuabviNM1tzonq7o1_1469609939_cover.jpg",
        title: "Kami-iro Awase",
        artist: "Binaria"
    },
    tank = {
        src: "https://a.tumblr.com/tumblr_omb2yp8oB01si4ar2o1.mp3",
        cover: "https://66.media.tumblr.com/8a8177009a395b517ad4dd0b2fc7e186/tumblr_ohnc595L821qa1yy4o1_400.jpg",
        title: "Tank!",
        artist: "The Seatbelts"
    }
]


let playedSongs = 0;
let currentSong = 0;
let isNotPlayed = true;

let song = new Audio();
//song.src = "https://a.tumblr.com/tumblr_nogt7vfvJb1ti7hf6o1.mp3";

function loadSongInfo() {
    document.getElementById("album-cover").setAttribute("src", songs[currentSong].cover);
    document.getElementById("song-title").innerText = songs[currentSong].title;
    document.getElementById("artist-name").innerText = songs[currentSong].artist;
}

function loadSong() {
    song.src = songs[currentSong].src;
}


function playPause() {
    if(playedSongs === 0 && isNotPlayed) {
       loadSongInfo();
       loadSong();
       isNotPlayed = false;
    } 

    if (song.paused) {
       song.play();
       document.getElementById("playpause").setAttribute("src", "img/pause.png");
    } else {
        song.pause();
        document.getElementById("playpause").setAttribute("src", "img/play.png");
    }

}

function getMinutes() {
    return Math.floor(song.currentTime / SECONDS_IN_MINUTE);
}

function getSeconds() {
    let seconds = Math.round(song.currentTime) - getMinutes()*SECONDS_IN_MINUTE;
    if (seconds < 10) return '0' + seconds;
    return seconds;
}


let songProgress = document.getElementById("progress-bar");
song.addEventListener("timeupdate", function() {
    let progress = song.currentTime / song.duration;
    document.getElementById("progress-bar").style.width = progress*MAX_PERCENT + '%';
    document.getElementById("current-time").innerText = getMinutes() + ':' + getSeconds();
});

function next() {
    playedSongs++; 
    currentSong++;
    loadSongInfo();
    loadSong();
    song.play();
}

function previous() {
    if (currentSong > 0) {
        playedSongs++;
        currentSong--;
        loadSongInfo();
        loadSong();
        song.play();
    } 
}

song.addEventListener("ended", function() {
    if (currentSong === songs.length) {
        document.getElementById("playpause").setAttribute("src", "img/play.png");
    } else {
        next();
    }
});