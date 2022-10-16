// document.addEventListener('DOMContentLoaded', () => {
console.log('%c HI', 'color: firebrick')
const imgURL = 'https://dog.ceo/api/breeds/image/random/4'
const breedUrl = 'https://dog.ceo/api/breeds/list/all'
const breedList = document.getElementById('dog-breeds')
const dropDown = document.getElementById('breed-dropdown')
const clearFilterButton = document.getElementById('filter')

let breedsObj = {}

function getImageData() {
  fetch(imgURL)
    .then((response) => response.json())
    .then((data) => {
      const imagesObj = data
      const imagesArray = imagesObj.message
      console.log(imagesArray)
      imageRender(imagesArray)
    })
}

getImageData()

function imageRender(array) {
  array.forEach((element) => {
    const imageContainer = document.getElementById('dog-image-container')
    let img = document.createElement('img')
    img.src = element
    console.log(img)
    imageContainer.append(img)
  })
}

function getBreedData() {
  breedList.innerHTML = ''
  fetch(breedUrl)
    .then((response) => response.json())
    .then((data) => {
      breedsObj = data
      console.log(breedsObj.message)
      for (const [key, value] of Object.entries(breedsObj.message)) {
        const firstLetter = key.charAt(0)
        const li = document.createElement('li')
        li.innerHTML = `${key}: ${value}`
        li.style.cursor = 'pointer'
        li.addEventListener('click', function() {
          li.style.color = 'blue'
        })
        breedList.append(li)
      }
    })
}

dropDown.addEventListener('change', () => {
  breedList.innerHTML = ''
  for (const [key, value] of Object.entries(breedsObj.message)) {
    let firstLetter = key.charAt(0)
    if (firstLetter === dropDown.value) {
      const li = document.createElement('li')
      li.innerHTML = `${key}: ${value}`
      breedList.append(li)
    }
  }
})

clearFilterButton.addEventListener('click', () => {
  dropDown.selectedIndex = 0
  getBreedData()
})
getBreedData()
// })
