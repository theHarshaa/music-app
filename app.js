const menuBtn = document.querySelector('.menu-btn');
container = document.querySelector('.container');

const progressBar =document.querySelector(".bar"),
progressDot =document.querySelector(".dot"),
currentTimeEl =document.querySelector(".current-time"),
durationEl =document.querySelector(".duration");

menuBtn.addEventListener('click',()=>{
    container.classList.toggle('active');
});

let playing = false,
currentSong = 0,
audio = new Audio();

const songs = [
    {
        title: "Muskurahat",
        artist: "MITRAZ",
        img: "music/music-1.jpg",
        src: "music/music-1.mp3"
    },
    {
        title: "𝒄𝒂𝒏 𝒘𝒆 𝒔𝒕𝒂𝒚 𝒇𝒐𝒓𝒆𝒗𝒆𝒓",
        artist: "𝒂 𝒔𝒖𝒔𝒉 & 𝒚𝒐𝒉𝒂𝒏 𝒆𝒙𝒑𝒆𝒓𝒊𝒆𝒏𝒄𝒆",
        img: "music/music-2.jpg",
        src: "music/music-2.mp3"
    },
    {
        title: "The Night",
        artist: "Avicii",
        img: "music/music-3.jpg",
        src: "music/music-3.mp3"
    },
    {
        title: "Ankhiyaan",
        artist: "MITRAZ",
        img: "music/music-4.jpg",
        src: "music/music-4.mp3"
    },
    {
        title: "Sage",
        artist: "RITVIZ",
        img: "music/music-5.jpg",
        src: "music/music-5.mp3"
    },
    {
        title: "Pasoori",
        artist: "Ali Sethi x Shae Gill",
        img: "music/music-6.jpg",
        src: "music/music-6.mp3"
    },
    {
        title: "Night Changes",
        artist: "One Direction",
        img: "music/music-7.jpg",
        src: "music/music-7.mp3"
    },
    {
        title: "Bye",
        artist: "Aditya Bhardwaj",
        img: "music/music-8.jpg",
        src: "music/music-8.mp3"
    },
    {
        title: "Carol of the Bells",
        artist: "Lindsey Stirling",
        img: "music/music-9.jpg",
        src: "music/music-9.mp3"
    },
    {
        title: "Pink Blue",
        artist: "Bharg and Tsumyoki",
        img: "music/music-10.jpg",
        src: "music/music-10.mp3"
    },
]

const playlistContainer = document.querySelector('#playlist'),
infoWrapper = document.querySelector('.info'),
coverImage = document.querySelector('.cover-image'),
currentSongTitle = document.querySelector('.current-song-title'),
currentFavorite = document.querySelector("#current-favourite");
function init(){
    updatePlaylist(songs);
    loadSong(currentSong);
}

init();


function updatePlaylist(songs){
    //remove any existing element
    playlistContainer.innerHTML='';

    //use for each on songs array

    songs.forEach((song,index)=>{
        //extract data from song

        const { title, src } = song;

        //create a tr to wrapped song
    const tr = document.createElement('tr');
    tr.classList.add('song');
    tr.innerHTML = `
                    <td class="no">
                        <h5>${index+1}</h5>
                    </td>
                    <td class="title">
                        <h6>${title}</h6>
                    </td>
                    <td class="length">
                        <h5>2:03</h5>
                    </td>
                    `;
        playlistContainer.appendChild(tr);


        //let's play song when click

        tr.addEventListener("click", (e) => {

            currentSong= index;
            loadSong(currentSong);
            audio.play();
            container.classList.remove("active");
            playPauseBtn.classList.replace("fa-play","fa-pause");
            playing=true;
        })


        const audioForDuration = new Audio(`${src}`);
        audioForDuration.addEventListener("loadedmetadata",()=>{
            const duration = audioForDuration.duration;

            let songDuration = formatTime(duration);
            tr.querySelector(".length h5").innerText = songDuration;
        })
    });
}

function formatTime(time){

    let minutes = Math.floor(time/60);
    let seconds = Math.floor(time%60);

    seconds = seconds < 10 ? `0${seconds}` : seconds;
    return `${minutes}:${seconds}`;
}

//let add audio

function loadSong(num){
    //change all the artist and time 

    infoWrapper.innerHTML=`
    <h2>${songs[num].title}</h2>
    <h3>${songs[num].artist}</h3>`;

    currentSongTitle.innerHTML=songs[num].title;

    //change the cover

    coverImage.style.backgroundImage= `url(${songs[num].img})`;

    audio.src=`${songs[num].src}`;

    
}


//lets add play pause functio

const playPauseBtn = document.querySelector("#playpause"),
nextBtn= document.querySelector("#next"),
prevBtn= document.querySelector("#prev");

playPauseBtn.addEventListener("click",() =>{
    if(playing){
        playPauseBtn.classList.replace("fa-pause","fa-play");
        playing=false;
        audio.pause();
    }else{
        playPauseBtn.classList.replace("fa-play", "fa-pause");
        playing=true;
        audio.play();
    }
})

function nextSong(){

    if(currentSong< songs.length -1){
        currentSong++;
    }else{
        currentSong=0;
    }
    loadSong(currentSong);

    if(playing){
        audio.play();
    }
}

nextBtn.addEventListener("click",nextSong);

function prevSong(){
    
    if(currentSong>0){
        currentSong--;
    }else{
        currentSong= songs.length -1;
    }
    loadSong(currentSong);

    if(playing){
        audio.play();
    }
}

prevBtn.addEventListener("click",prevSong);


function progess(){
    let {duration,currentTime}=audio;

    isNaN(duration)?(duration=0):duration;
    isNaN(currentTime)?(currentTime=0):currentTime;

    currentTimeEl.innerHTML=formatTime(currentTime);
    durationEl.innerHTML=formatTime(duration);
    
    let progressPersentage= (currentTime/duration)*100;
    progressDot.style.left=`${progressPersentage}%`
}

audio.addEventListener("timeupdate",progess);

function setProgress(e){
    let width=this.clientWidth;
    let clickX =e.offsetX;
    let duration=audio.duration;
    audio.currentTime =(clickX/width)*duration;
}
progressBar.addEventListener("click",setProgress);
