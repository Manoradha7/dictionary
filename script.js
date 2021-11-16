var audio;

function searchtext() {
    var url = `https://api.dictionaryapi.dev/api/v2/entries/en/`;
    //to get the input value choose the input field and store the value
    var word = document.querySelector("input").value;

    // fetch data from free dictionary api  
    fetch(url + word)
        //fetch give the response as json format
        .then((response) => response.json())
        .then(data => {
            console.log(data);
            audio = new Audio(`https://${data[0].phonetics[0].audio}`)

            //show the fetched data to the details class div 
            var details = document.querySelector(".details");
            details.innerHTML = `
                <div class="meaning">
                    <span>${word.toUpperCase()}</span>
                    <button class="btn" onclick="playaudio()"><i class="fas fa-volume-up" ></i></button><br>
                    <p>${data[0].meanings[1].partOfSpeech}</p>
                    <hr>
                     <p><b> Meaning </b></p>
                     <p class="definition">${data[0].meanings[0].definitions[0].definition}</p><hr>
                     <div>
                     <p><b> Synonyms </b></p>
                     <p class="col-3">${data[0].meanings[0].definitions[0].synonyms}</p><hr>
                     </div>
                </div>
            `
        }) //catch the error throw catch block
        .catch(err => {
            var details = document.querySelector(".details");
            var message = "Sorry pal, we couldn't find definitions for the word you were looking for.";
            var solution = "You can try the search again at later time or head to the web instead.";
            details.innerHTML = `
            <div class="err">
            <p class="errmsg">${message}</p><hr>
            <p>Solution : ${solution}</p>
            </div>        
        `});
}

//create function component  for playing the audio
function playaudio() {
    audio.play();
}
