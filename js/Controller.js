/*
Reuseable Controller
@Class
- initiated with number as an argument (this represents the number of employees the company has)
- Handles all the application logic
*/

class Controller {

  constructor(numberOfUsers) {
    this.numberOfUsers = numberOfUsers;
    this.view = new Viewmaster(); //instantiates the view this controller will control
    this.model = new Datafetcher(); //instantiates the model the controller will manipulate and pass to the view
    this.selectedUserIndex = null;
  }


/*
loadUp()
@async the function awaits the return result of the model's goFetch() method (which passess employees into the model)
- call the createGallery method, passing it the view and each data object in the model
- if there is an error with the fetch, an error message displays to the screen
*/

  async loadUp() {
      try {
        this.showSearch(this.view)
        await this.model.goFetch(this.numberOfUsers)
        for (let i=0 ; i < this.numberOfUsers; i+=1) {
          this.createGallery(this.view,this.model.data[i])
        }
      } catch(error) {
          this.showFailure(this.view)
        }
      }
/*
selectProfile()
- accepts a card element
- find the email contained with the card element
- finds the associated index of the employee who has that email within model
- calls for createModal, passing the view and associated employee data object from the model
*/

  selectProfile(card) {
    const queryEmail = card.lastElementChild.children[1].innerHTML //the email of the card selected
    this.selectedUserIndex = this.model.visibleData.findIndex(index => index.email == queryEmail) //find the index of the user based on their email
    this.createModal(this.view, this.model.visibleData[this.selectedUserIndex]) //calls for the select modal
  }

/*
createGallery()
- accepts a view object (template), and a data object (to bind to), as arguments
- creates the gallery item on the screen based on the view's template
*/

   createGallery(view, data) {
       const galleryItem = view.createGalleryItem(data)
       view.putIn(document.getElementById("gallery"), galleryItem)
       //adds an event listener to each gallery card added
       galleryItem.addEventListener('click', (e) => {
         switch(e.target.className) {
           case 'card-img-container':
             theFatController.selectProfile(e.target.parentNode)
             break;
           case 'card-img':
             theFatController.selectProfile(e.target.parentNode.parentNode)
             break;
           case 'card-info-container':
             theFatController.selectProfile(e.target.parentNode)
             break;
           case 'card-name cap':
             theFatController.selectProfile(e.target.parentNode.parentNode)
             break;
           case 'card-text':
             theFatController.selectProfile(e.target.parentNode.parentNode)
             break;
           case 'card-text-cap':
             theFatController.selectProfile(e.target.parentNode.parentNode)
             break;
         }})
    }

/*
createModal()
- accepts a view object (template), and a data object (to bind to), as arguments
- creates a modal based on the view's template
*/

    createModal(view, data) {
        //remove Modal if its there
        if(document.querySelector(".modal-container") != undefined) {
          document.querySelector("body").removeChild(document.querySelector(".modal-container"))
        } //create and append the modal
        const modalWindow = view.createModal(data)
        document.querySelector("body").insertBefore( document.querySelector(".modal-container"), document.querySelector("script"))
        document.getElementById("modal-close-btn").addEventListener("click", (e) => {
          this.closeModal()
        })
        //put in the click handlers
        document.getElementById("modal-prev").addEventListener("click", (e) => {
          this.prevModal()
          })
        document.getElementById("modal-next").addEventListener("click", (e) => {
          this.nextModal()
          })
        //hide the previous button if it shouldn't be there
        if(this.selectedUserIndex == 0) {
          document.getElementById("modal-prev").style.display = "none"
        }
        //hide the next button if it shouldn't be there
        if(this.selectedUserIndex == this.model.visibleData.length - 1) {
          document.getElementById("modal-next").style.display = "none"
        }
      }

/* closeModal()
- takes no argument.
- closes the current model, and resets the selectedUserIndex to null
*/

    closeModal() {
      this.selectedUserIndex = null;
      document.querySelector("body").removeChild(document.querySelector(".modal-container"))
    }

/* closeModal()
  - takes no argument.
  - increments the selectedUserIndex, and calls createModal to recreate the modal using the new data object
  - nextModal creates new modals based on the cards that are visible at the time the initial modal is created
*/

    nextModal() {
      this.selectedUserIndex = this.selectedUserIndex + 1;
      this.createModal(this.view, this.model.visibleData[this.selectedUserIndex])
    }

/* closeModal()
  - takes no argument.
  - decrements the selectedUserIndex, and calls createModal to recreate the modal using the new data object
  - prevModal creates new modals based on the cards that are visible at the time the initial modal is created
*/

    prevModal() {
      this.selectedUserIndex = this.selectedUserIndex - 1;
      this.createModal(this.view, this.model.visibleData[this.selectedUserIndex])
    }

/* closeModal(view)
  - takes a view object as an argument
  - shows a failure message on the screen, based on the template within that view
*/

    showFailure(view) {
      const message = view.failureMessage()
      view.putIn(document.getElementById("gallery"), message)
    }

/* showSearch(view)
  - takes a view object as an argument
  - shows a search widget on the screen, based on the view's template
*/

    showSearch(view) {
     const search = view.createSearchForm()
     view.putIn(document.querySelector(".search-container"), search)
     document.querySelector(".search-submit").addEventListener("click", (e) => {
      e.preventDefault() //stops the search button from submitting a form and reloading new users!
      this.handleSearch()
     })
   }

/* handleSearch()
  - hides all the cards
*/

    handleSearch() {
      const query = document.getElementById("search-input").value.toString()
      const cards = document.querySelectorAll(".card")
      const regex = /@[A-Za-z\.]/
      //if there is a search message from a previous search, remove it
      if(document.querySelector(".search-failure-message") != undefined) {
          document.getElementById("gallery").removeChild(document.querySelector(".search-failure-message"))
      }
      //if the search is empty, show all the cards, and give them all a className of searchHit
      if(query == "") {
        cards.forEach(element => {
          element.style.display = ""
          element.className = element.className + " searchHit"
          })
      } //else, set the card to disappear and take away the searchHit class, unless the employee's name matches includes the string
        else {
        cards.forEach(element => {
          element.style.display = "none"
          element.className = "card"
          const cardemailSearch = element.children[1].children[1].innerHTML.replace(regex, '') //truncates the email - removes the @example.com from email addresses
          if(cardemailSearch.toLowerCase().includes(query.toLowerCase())) { //compares the search input field against the truncated email
            element.style.display = ""
            element.className = element.className + " searchHit"
          }
        })
      }
      this.updateVisible()
      //if the visibleData array is now empty (because there were no search results), show a message to the screen
      if(this.model.visibleData.length === 0) {
        this.view.putIn(document.getElementById("gallery"), this.view.createEmptySearchMessage())
      }
      //clear the search
      document.getElementById("search-input").value = null;
    }

/* updateVisible()
  - forces the model to update its visibleData array with only data objects presented on the screen
*/

    updateVisible() {
    //empties the visibleData array
    this.model.visibleData = [];
    //stores a nodeList for all cards with the searchHit class
    const visibleCards = document.querySelectorAll(".searchHit")
    //for each card, find the matching dataObject in the model data array, and then push it into the visibleDataArray
    visibleCards.forEach(card => {
      const queryEmail = card.lastElementChild.children[1].innerHTML
      const modelIndex = this.model.data.findIndex(index => index.email == queryEmail)
      this.model.visibleData.push(this.model.data[modelIndex])
    })
  }
}
