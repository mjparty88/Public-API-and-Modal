/*
Reuseable Viewmaster
- Handles creation of views to inject data into
*/

class Viewmaster {
 constructor() {


 }

 /* putIn()
 - gets an HTML component, and appends it to the child
 */

 putIn(targetElement, componentElement) {
   targetElement.appendChild(componentElement)
 }


 createSearchForm() {

  const form = document.createElement("form")
  form.setAttribute("action","#")
  form.setAttribute("method","get")

  const searchInput = document.createElement("input")
  searchInput.setAttribute("type","search")
  searchInput.setAttribute("id","search-input")
  searchInput.setAttribute("placeholder","Search...")
  searchInput.className = "search-input"

  const searchSubmit = document.createElement("input")
  searchSubmit.setAttribute("type","search")
  searchSubmit.setAttribute("value","&#x1F50D")
  searchSubmit.setAttribute("id", "search-submit")
  searchSubmit.className = "search-submit"

  this.putIn(form,searchInput)
  this.putIn(form,searchSubmit)
  return form

 }

 /*
 takes a data objects
 creates a gallery for the data
 */

 createGalleryItem(dataObject) {

/*
 <div class="card">
       <div class="card-img-container">
           <img class="card-img" src="https://placehold.it/90x90" alt="profile picture">
       </div>
       <div class="card-info-container">
           <h3 id="name" class="card-name cap">first last</h3>
           <p class="card-text">email</p>
           <p class="card-text cap">city, state</p>
       </div>
   </div>
*/

  const galleryDiv = document.createElement("div")
  galleryDiv.className = "card"

  const cardContainer = document.createElement("div")
  cardContainer.className = "card-img-container"

  const cardImage = document.createElement("img")
  cardImage.setAttribute("src", dataObject.picture.large)
  cardImage.setAttribute("alt",`profile picture of ${dataObject.picture.first} ${dataObject.picture.last}`)
  cardImage.className = "card-img"

  const cardInfoDiv = document.createElement("div")
  cardInfoDiv.className = "card-info-container"

  const cardName = document.createElement("h3")
  cardName.setAttribute("id","name")
  cardName.className = "card-name cap"
  cardName.innerHTML = dataObject.name.first + " " + dataObject.name.last//replace

  const cardEmail = document.createElement("p")
  cardEmail.className = "card-text"
  cardEmail.innerHTML = dataObject.email //replace

  const cardLocation = document.createElement("p")
  cardLocation.className = "card-text-cap"
  cardLocation.innerHTML = dataObject.location.city + " " + dataObject.location.state//replace

  this.putIn(cardContainer, cardImage)
  this.putIn(cardInfoDiv, cardName)
  this.putIn(cardInfoDiv, cardEmail)
  this.putIn(cardInfoDiv, cardLocation)
  this.putIn(galleryDiv, cardContainer)
  this.putIn(galleryDiv, cardInfoDiv)

  return galleryDiv

 }


}
