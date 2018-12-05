//write a function to retrieve a blob of json
//make an ajax request! Use the 'fetch' function.
//https://rallycoding.herokuapp.com/api/music_albums

function fetchAlbums() {
  fetch('https://rallycoding.herokuapp.com/api/music_albums')
  .then(res => res.json())
  .then(json => console.log(json));
}
fetchAlbums();

asnyc function fetchAlbums1() {
  const res = await fetch('https://rallycoding.herokuapp.com/api/music_albums');
  const json = await res.json();

  console.log(json);
}
fetchAlbums1();

const fetchAlbums2 = async () => {
  const res = await fetch('https://rallycoding.herokuapp.com/api/music_albums');
  const json = await res.json();

  console.log(json);
}
fetchAlbums2();
