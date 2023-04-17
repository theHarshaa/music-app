const menuBtn = document.querySelector('.menu-btn');
container = document.querySelector('.container');

menuBtn.addEventListener('click',()=>{
    container.classList.toggle('active');
});

let playing = false,
currentSong = 0,
shuffle = false,
repeat = false,
favorites =[],
audio = new Audio();

const songs = [
    {
        title: "Muskurahat",
        artist: "MITRAZ",
        img: "music/music-1.jpg",
        src: "music/music-1.mp3"
    },
    {
        title: "Dil Bechara",
        artist: "A.R Rahman",
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
        title: "As it Was",
        artist: "Harry Style",
        img: "music/music-8.mp3",
        src: ""
    },
    {
        title: "Carol of the Bells",
        artist: "Lindsey Stirling",
        img: "music/music-9.jpg",
        src: "music/music-9.mp3"
    },
    {
        title: "Aaj Na",
        artist: "RITVIZ",
        img: "music/music-10.jpg",
        src: "music/music-10.mp3"
    },
]
const playlistContainer = document.querySelector('#playlist');
function init(){
    updatePlaylist(songs);
}

init();


function updatePlaylist(songs){
    //remove any existing element
    playlistContainer.innerHTML='';

    //use for each on songs array

    songs.forEach((song,index)=>{
        //extract data from song

        const { title, src } = song;

            //check if included in fev array
            const isFavorite = favorites.includes(index);
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
                        <h5 >2:03</h5>
                    </td>
                    <td>
                        <i class="fas fa-heart ${isFavorite ? "active" : ""}"></i>
                    </td>`;
        playlistContainer.appendChild(tr);


        const audioForDuration = new Audio(`music/${src}`);
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