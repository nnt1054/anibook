


function toggleGenre(btn) {
  var genreName = btn.getAttribute("for");
  var cb = document.getElementById(genreName);
  cb.click()
}

function toggleGenreOnChange(cb) {
  var genreName = cb.getAttribute("btn");
  var btn = document.getElementById(genreName);
  if (cb.checked) {
    btn.classList.add('checked');
  } else {
    btn.classList.remove('checked');
  }
  console.log(cb.checked)
}

function toggleGenreList() {
  var lst = document.getElementById('genre-container')
  lst.classList.toggle('show')
}

// title, countdown + next ep(/ep count), image, star, rating, genres

var example = { 
      "mal_id":33352,
      "url":"https:\/\/myanimelist.net\/anime\/33352\/Violet_Evergarden",
      "title":"Violet Evergarden",
      "image_url":"https:\/\/cdn.myanimelist.net\/images\/anime\/1795\/95088.jpg?s=e2e6133e60a7f5351826fc9f72bdddb8",
      "synopsis":"The Great War finally came to an end after four long years of conflict; fractured in two, the continent of Telesis slowly began to flourish once again. Caught up in the bloodshed was Violet Evergarden, a young girl raised for the sole purpose of decimating enemy lines. Hospitalized and maimed in a bloody skirmish during the War's final leg, she was left with only words from the person she held dearest, but with no understanding of their meaning.\r\n\r\nRecovering from her wounds, Violet starts a new life working at CH Postal Services after a falling out with her new intended guardian family. There, she witnesses by pure chance the work of an \"Auto Memory Doll,\" amanuenses that transcribe people's thoughts and feelings into words on paper. Moved by the notion, Violet begins work as an Auto Memory Doll, a trade that will take her on an adventure, one that will reshape the lives of her clients and hopefully lead to self-discovery.\r\n\r\n[Written by MAL Rewrite]",
      "type":"TV","airing_start":"2018-01-10T15:00:00+00:00",
      "episodes":13,
      "members":500720,
      "genres":[
        {"mal_id":10,
        "type":"anime",
        "name":"Fantasy",
        "url":"https:\/\/myanimelist.net\/anime\/genre\/10\/Fantasy"},
        {"mal_id":8,
        "type":"anime",
        "name":"Drama",
        "url":"https:\/\/myanimelist.net\/anime\/genre\/8\/Drama"},
        {"mal_id":36,
        "type":"anime",
        "name":"Slice of Life",
        "url":"https:\/\/myanimelist.net\/anime\/genre\/36\/Slice_of_Life"}
      ],
      "source":"Light novel",
      "producers":[
        {"mal_id":2,"type":"anime","name":"Kyoto Animation","url":"https:\/\/myanimelist.net\/anime\/producer\/2\/Kyoto_Animation"}],
      "score":8.61,"licensors":[],
      "r18":false,
      "kids":false,
      "continuing":false
    }