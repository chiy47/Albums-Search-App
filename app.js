const albums = document.querySelector('.lists')
const searchBar = document.querySelector('.searchbar')
const count = document.querySelector('.count')
const searchBtn = document.querySelector('.searchbtn')
const pagination = document.querySelector('.pagination')
let currentPage = 1
let items_per_page = 20

/* keyup in js eventlisteners and hit enter */
searchBar.addEventListener('keyup', (event) => {
  if (event.keyCode === 13) {
    event.preventDefault()
    // Trigger Button Click on Enter
    searchBtn.click()

    // let searchValue = searchBar.value

    // fetch(
    //   `https://itunes.apple.com/search?term=${searchValue}&media=music&entity=album&attribute=artistTerm&limit=200`
    // )
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log('data: ', data.results)

    //     displayLists(data.results, searchValue)
    //   })
    //   .catch(console.error)
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
const clicked = () => {
  let searchValue = searchBar.value

  fetch(
    `https://itunes.apple.com/search?term=${searchValue}&media=music&entity=album&attribute=artistTerm&limit=200`
  )
    .then((res) => res.json())
    .then((data) => {
      displayLists(data, searchValue, currentPage, items_per_page)
      displayPageBtns(data, items_per_page, searchValue)
    })
    .catch(console.error)
}

/* add a new album */

const displayLists = (lists, searchVal, currpage, itemsperpage) => {
  count.innerHTML = lists.resultCount + ' results for ' + '"' + searchVal + '"'

  albums.innerHTML = ''
  currpage-- // 1 - 1 = 0

  let start = currpage * itemsperpage // 0 * 20 = 0
  let end = start + itemsperpage // 0 + 20 = 20

  let ipp = lists.results.slice(start, end) // 0 to 19
  // console.log(ipp)

  for (let i = 0; i < ipp.length; i++) {
    albums.append(displayList(ipp[i].artworkUrl100, ipp[i].collectionName))
  }
}

const displayList = (img, alb) => {
  /* 
  <li class='list__artist'>
    <img class='list__artist-img' src='{img}' />
    <p class='list__artist-album'>{alb}</p>
  </li> 
  */

  const artist = document.createElement('li')
  artist.classList.add('list__artist')

  const image = document.createElement('img')
  image.classList.add('list__artist-img')
  image.setAttribute('src', img)
  artist.append(image)

  const album = document.createElement('p')
  album.classList.add('list__artist-album')
  album.textContent = alb
  artist.append(album)

  return artist
}

const displayPageBtns = (lists, itemsperpage, searchVal) => {
  pagination.innerHTML = ''

  let pageBtnsCount = Math.ceil(lists.results.length / itemsperpage) // 153 / 20 = 8

  for (let i = 1; i <= pageBtnsCount; i++) {
    pagination.append(pageBtn(lists, i, searchVal))
  }
}

const pageBtn = (lists, pageNum, searchVal) => {
  let pagebtn = document.createElement('button')
  pagebtn.textContent = pageNum
  pagebtn.classList.add('pagebtn')

  if (currentPage == pageNum) pagebtn.classList.add('pagebtn-active') // make a current page button active

  pagebtn.addEventListener('click', () => {
    currentPage = pageNum

    displayLists(lists, searchVal, currentPage, items_per_page) // when a button is clicked, display a clicked page

    pagebtn.classList.add('pagebtn-active') // when a button is clicked, make it active

    let currbtn = document.querySelector('.pagebtn-active') // make a previously active button not active
    currbtn.classList.remove('pagebtn-active')
  })

  return pagebtn
}
