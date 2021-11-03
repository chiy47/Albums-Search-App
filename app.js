const albums = document.querySelector('.lists')
const searchBar = document.querySelector('.searchbar')
const count = document.querySelector('.count')
const searchBtn = document.querySelector('button')

/* keyup in js eventlisteners and hit enter */
searchBar.addEventListener('keyup', () => {
  if (event.key === 'Enter') {
    let searchValue = searchBar.value

    fetch(
      `https://itunes.apple.com/search?term=${searchValue}&media=music&entity=album&attribute=artistTerm&limit=200`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log('data: ', data.results)

        displayLists(data.results, searchValue)
      })
      .catch(console.error)
  }
})

/* onkeyup in HTML and hit enter */
// const typed = (input) => {
//   if (event.key === 'Enter') {
//     let searchValue = input.value

//     fetch(
//       `https://itunes.apple.com/search?term=${searchValue}&media=music&entity=album&attribute=artistTerm&limit=200`
//     )
//       .then((res) => res.json())
//       .then((data) => {
//         displayLists(data.results, searchValue)
//       })
//       .catch(console.error)
//   }
// }

/* click a button in js eventlisteners */
// searchBtn.addEventListener('click', () => {
//   let searchValue = searchBar.value

//   console.log(searchValue)

//   fetch(
//     `https://itunes.apple.com/search?term=${searchValue}&media=music&entity=album&attribute=artistTerm&limit=200`
//   )
//     .then((res) => res.json())
//     .then((data) => {
//       displayLists(data.results, searchValue)
//     })
//     .catch(console.error)
// })

/* click a button in HTML */
// const clicked = () => {
//   let searchValue = searchBar.value

//   fetch(
//     `https://itunes.apple.com/search?term=${searchValue}&media=music&entity=album&attribute=artistTerm&limit=200`
//   )
//     .then((res) => res.json())
//     .then((data) => {
//       displayLists(data.results, searchValue)
//     })
//     .catch(console.error)
// }

const displayLists = (lists, searchVal) => {
  count.innerHTML = lists.length + ' results for ' + '"' + searchVal + '"'

  for (let i = 0; i < lists.length; i++) {
    albums.append(displayList(lists[i].artworkUrl100, lists[i].collectionName))
  }
}

const displayList = (img, alb) => {
  const artist = document.createElement('li')
  artist.classList = 'list__artist'

  const image = document.createElement('img')
  image.classList = 'list__artist-img'
  image.setAttribute('src', img)
  artist.append(image)

  const album = document.createElement('p')
  album.classList = 'list__artist-album'
  album.textContent = alb
  artist.append(album)

  return artist
}
