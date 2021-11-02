const albums = document.querySelector('.lists')
const searchBar = document.querySelector('.searchbar')
const count = document.querySelector('.count')

searchBar.addEventListener('keyup', (e) => {
  let searchValue = e.target.value

  fetch(
    `https://itunes.apple.com/search?term=${searchValue}&media=music&entity=album&attribute=artistTerm&limit=200`
  )
    .then((res) => res.json())
    .then((data) => {
      console.log('data: ', data.results)

      displayLists(data.results, searchValue)
    })
    .catch(console.error)
})

const displayLists = (lists, searchVal) => {
  count.innerHTML = lists.length + ' results for ' + '"' + searchVal + '"'

  albums.innerHTML = ''

  for (let i = 0; i < lists.length; i++) {
    albums.appendChild(
      displayList(lists[i].artworkUrl100, lists[i].collectionName)
    )
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
