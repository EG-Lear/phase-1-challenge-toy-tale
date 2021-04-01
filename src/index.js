let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

//my code below, code provided for assignment above

document.addEventListener('DOMContentLoaded', () => {
  fetchToys()
  document.querySelector('.add-toy-form').addEventListener('submit', newToy)
})

const baseUrl = 'http://localhost:3000/toys'

function fetchToys() {  //fetches toys from server
  fetch(baseUrl)
  .then(res => res.json())
  .then(data => {
    console.log(data)
    addToys(data)
  })
}

function addToys(toys) {  //adds toys to DOM
  toys.forEach(toy => {
    const loc = document.getElementById('toy-collection')
    const cont = document.createElement('div')
    cont.classList.add('card')
    const id = toy.id.toString()
    cont.innerHTML = `
      <h2>${toy.name}</h2>
      <img class='toy-avatar' src=${toy.image}>
      <p id=${toy.id}s>${toy.likes} likes</p>
      <button class='like-btn' id=${toy.id} type='button'>like!</button>
    `
    loc.appendChild(cont)
    document.getElementById(`${id}`).addEventListener('click', likeCheck)
  })
}

function newToy(event) {  //adds a new toy to server and DOM
  event.preventDefault()
  console.log(event)
  fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': "application/json",
      'Accept': "application/json"
    },
    body: JSON.stringify({
      'name': `${document.querySelector('input[name=name]').value}`,
      'image': `${document.querySelector('input[name=image]').value}`,
      'likes': 0
    }),
  })
  .then(res => res.json())
  .then(toy => {
    console.log(toy)
    const loc = document.getElementById('toy-collection')
    const cont = document.createElement('div')
    cont.classList.add('card')
    const id = toy.id.toString()
    cont.innerHTML = `
      <h2>${toy.name}</h2>
      <img class='toy-avatar' src=${toy.image}>
      <p id=${toy.id}s>${toy.likes} likes</p>
      <button class='like-btn' id=${toy.id} type='button'>like!</button>
    `
    loc.appendChild(cont)
    document.getElementById(`${id}`).addEventListener('click', likeCheck)
  })
}

function likeCheck(event) {  //checks like count
  console.log(event)
  let likeCount
  let ids = event.target.id
  ids = ids.toString()
  fetch(baseUrl + `/${ids}`)
  .then(res => res.json())
  .then(data => {
    console.log(data)
    console.log(data.likes)
    likeCount = data.likes
    likeCount++
    likePlus(likeCount, ids)
  })
  .catch(res => {
    console.log(res)
  })
}

function likePlus(count, url) {  //increases like count
  fetch(baseUrl + `/${url}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': "application/json",
      'Accept': "application/json"
    },

    body: JSON.stringify({
      'likes': count
    })
  })
  .then(ress => ress.json())
  .then(newLike => {
    console.log(newLike)
    document.getElementById(`${newLike.id}s`).textContent = newLike.likes + ' likes' 
  })
}