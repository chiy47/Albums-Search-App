//const fetchJsonp = require('fetch-jsonp')

const list = document.querySelector('.list')
const searchBar = document.getElementById('searchbar')
let output = ''

// searchBar.addEventListener('keyup', (e) => {
//   const searchString = e.target.value.toLowerCase()

//   const filteredArtists = output.filter((artist) => {
//     return (
//       artist.artistName.toLowerCase().includes(searchString) ||
//       artist.collectionName.toLowerCase().includes(searchString)
//     )
//   })
//   displayArtists(filteredArtists)
// })

searchBar.addEventListener('keyup', (e) => {
  let searchValue = e.target.value
  // console.log(searchValue)

  //   const filteredArtist = data.results.filter((artist) => {
  //     return (
  //       artist.artistName.toLowerCase().includes(searchValue) ||
  //       artist.collectionName.toLowerCase().includes(searchValue)
  //     )
  //   })

  fetch(
    `https://itunes.apple.com/search?term=${searchValue}&media=music&entity=album&attribute=artistTerm&limit=200`
  )
    .then((res) => res.json())
    .then((data) => {
      console.log('data ', data.results)

      display(data.results)
    })
    .catch(console.error)
})

const display = (lists) => {
  //   const filteredArtist = lists.filter((list) => {
  //     return (
  //       list.artistName.toLowerCase().includes(searchValue) ||
  //       list.collectionName.toLowerCase().includes(searchValue)
  //     )
  //   })

  lists.forEach((list) => {
    output += `
            <li class="artist">
                <img class="artist__img" src="${list.artworkUrl100}"></img>
                <p class="album">${list.collectionName}</p>
            </li>
        `
  })

  list.innerHTML = output
}
