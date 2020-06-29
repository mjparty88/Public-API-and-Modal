/*
Reuseable Viewmaster
@Class
- Creates HTML templates for inclusion into the DOM
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

 /* createSearchForm()
 - returns a search form
 */
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
  searchSubmit.setAttribute("type","submit")
  searchSubmit.setAttribute("value","Search")
  searchSubmit.setAttribute("id", "search-submit")
  searchSubmit.className = "search-submit"

  this.putIn(form,searchInput)
  this.putIn(form,searchSubmit)
  return form

 }

 /* createGalleryItem()
 - takes a data object
 - returns a template for a galleryItem using the data provided
 */

 createGalleryItem(dataObject) {

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

 /* createModal()
 - takes a data object
 - returns a modal template containing the data
 */

createModal(dataObject){

   const modalContainer = document.createElement("div")
   modalContainer.className = "modal-container"

   const modalDiv = document.createElement("div")
   modalDiv.className = "modal"

   const closeButton = document.createElement("button")
   closeButton.setAttribute("type","button")
   closeButton.setAttribute("id","modal-close-btn")
   closeButton.className = "modal-close-btn"
   closeButton.innerHTML = "<strong>X</strong>"

   const modalInfo = document.createElement("div")
   modalInfo.className = "modal-info-container"

   const modalImg = document.createElement("img")
   modalImg.setAttribute("src",dataObject.picture.large)
   modalImg.setAttribute("alt","Profile picture of " + dataObject.name.first + " " + dataObject.name.last)
   modalImg.className = "model-img"

   const modalName = document.createElement("h3")
   modalName.setAttribute("id","name")
   modalName.className = "modal-name cap"
   modalName.innerHTML = dataObject.name.first + " " + dataObject.name.last

   const modalEmail = document.createElement("p")
   modalEmail.className = "modal-text"
   modalEmail.innerHTML = dataObject.email

   const modalCity = document.createElement("p")
   modalCity.className = "modal-text cap"
   modalCity.innerHTML =  dataObject.location.city

   const modalHr = document.createElement("hr")

   const modalPhone = document.createElement("p")
   modalPhone.className = "modal-text"
   modalPhone.innerHTML = dataObject.phone

   const modalAddress = document.createElement("p")
   modalAddress.className = "modal-text"
   modalAddress.innerHTML = dataObject.location.street.number + " " + dataObject.location.street.name + ", " + dataObject.location.city + ", " + dataObject.location.state + " " + dataObject.location.postcode

   const modalDob = document.createElement("p")
   modalDob.className = "modal-text"
   modalDob.innerHTML = "Birthday: "+ dataObject.dob.date.substring(0,10)

   const modalButtonContainer = document.createElement("div")
   modalButtonContainer.className = "modal-btn-container"

   const modalPrevButton = document.createElement("button")
   modalPrevButton.setAttribute("type","button")
   modalPrevButton.setAttribute("id","modal-prev")
   modalPrevButton.className = "modal-prev btn"
   modalPrevButton.innerHTML = "Prev"

   const modalNextButton = document.createElement("button")
   modalNextButton.setAttribute("type","button")
   modalNextButton.setAttribute("id","modal-next")
   modalNextButton.className = "modal-next btn"
   modalNextButton.innerHTML = "Next"

   //assemble the modalDiv
   this.putIn(modalInfo,modalImg)
   this.putIn(modalInfo,modalName)
   this.putIn(modalInfo,modalEmail)
   this.putIn(modalInfo,modalCity)
   this.putIn(modalInfo,modalHr)
   this.putIn(modalInfo,modalPhone)
   this.putIn(modalInfo,modalAddress)
   this.putIn(modalInfo,modalDob)
   this.putIn(modalDiv,closeButton)
   this.putIn(modalDiv,modalInfo)

   //assemble the modalButton
   this.putIn(modalButtonContainer,modalPrevButton)
   this.putIn(modalButtonContainer,modalNextButton)

   //assemble the overall modalContainer and put it in the body
   this.putIn(modalContainer,modalDiv)
   this.putIn(modalContainer,modalButtonContainer)
   this.putIn(document.querySelector("body"),modalContainer)

   return modalContainer

 }

 /* createModal()
 - returns a p element with an error message
 */

 failureMessage() {
   const message = document.createElement("p")
   message.className = "failure-message"
   message.innerHTML = "Sorry, we couldn't get the employees at this time"
   return message
 }

 createEmptySearchMessage() {
   const message = document.createElement("p")
   message.className = "search-failure-message"
   message.innerHTML = "None of our employees have a name with that character. Please search with an alphabetical letter, or hit search with a blank input to return all employees"
   return message
 }

}
