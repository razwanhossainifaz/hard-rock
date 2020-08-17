const result = document.getElementById("result");
const resultLyrics = document.getElementById("resultLyrics");

// api Url

const apiURL = 'https://api.lyrics.ovh';

/// adding event listener in form

form.addEventListener('submit', e=> {
    e.preventDefault();
    searchValue = search.value.trim()

    if(!searchValue){
        alert("There is nothing to search")
    }
    else{ 
        searchSong(searchValue)
    }
})

async function searchSong(searchValue){
    const searchResult = await fetch(`${apiURL}/suggest/${searchValue}`)
    const data = await searchResult.json();

    // console.log(finaldata)
    showData(data)
}

//display final result in DO

function showData(data){
  
    result.innerHTML = `
    <ul class="song-list">
      ${data.data
        .map(song=> `<li>
                    <div>
                        <p class="author lead"><strong style="font-weight: 700;">${song.artist.name}</strong> Album by <span style="font-weight: 400;">${song.title}</span><button class="btn btn-success ml-2"><span data-artist="${song.artist.name}" data-songtitle="${song.title}">Get Lyrics</span></button></p> 
                    </div>
                </li>`
        )
        .join('')}
    </ul>
  `;
}

//event listener in get lyrics button

result.addEventListener('click', e=>{
    const clickedElement = e.target;

    //checking clicked element is button or not
    if (clickedElement.tagName === 'SPAN'){
        const artist = clickedElement.getAttribute('data-artist');
        const songTitle = clickedElement.getAttribute('data-songtitle');
        
        getLyrics(artist, songTitle)
    }
})

// get lyrics

async function getLyrics(artist , songTitle){
    const res = await fetch(`${apiURL}/v1/${artist}/${songTitle}`);
    const data = await res.json();

    const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');;
  
    resultLyrics.innerHTML = `<div class="single-lyrics text-center">
    <h2 class="text-success mb-4"><strong>${artist}</strong> - ${songTitle}</h2>
    <pre class="lyric text-white">${lyrics}</pre>
    </div>`;
};

