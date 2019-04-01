


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