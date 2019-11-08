var currentPlaylist = []
var shufflePlaylist = []
var tempPlaylist = []
var audioElement
var mouseDown = false
var currentIndex = 0
var repeat = false
var shuffle = false
var shu;

function formateTime(seconds) {
    var time = Math.round(seconds)
    var minutes = Math.floor(time/60)
    var seconds = time - (minutes*60)

    var zero;
    if(seconds < 10) {
        zero = "0"
    } else {
        zero=""
    }

    return minutes+ ":" + zero + seconds
}

function updateTimeProgressBar(audio) {
    $('.progressTime.current').text(formateTime(audio.currentTime))
    $('.progressTime.remainig').text(formateTime(audio.duration - audio.currentTime))

    var progress = ( audio.currentTime / audio.duration )*100
    $('.playbackBar .progressCurrent').css('width', progress + "%")
}

function updateVolumeProgressBar(audio) {
    var volume =  audio.volume * 100 
    $('.volumeBar .progressCurrent').css('width', volume + "%")
}

function Audio() {
   
    this.currentPlaying
    this.audio = document.createElement('audio')

    this.audio.addEventListener('ended', function() {
        nextSong()
    })

    this.audio.addEventListener('canplay', function() {
        var duration = formateTime(this.duration)
        $('.remainig').text(duration)
    })

    this.audio.addEventListener('timeupdate', function() {
        if(this.duration) {
            updateTimeProgressBar(this)
        }
    })

    this.audio.addEventListener('volumechange', function() {
        updateVolumeProgressBar(this)
    })
    

    this.setTrack = function(src) {
        this.audio.src = src
    }

    this.play = function() {
        this.audio.play()
    }

    this.pause = function() {
        this.audio.pause()
    }

    this.setTime= function(seconds) {
        this.audio.currentTime = seconds
    }
}