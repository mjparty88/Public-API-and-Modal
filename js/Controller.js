/*
Reuseable Congroller
- Handles the logic
*/

class Controller {

  constructor(numberOfUsers) {
    this.numberOfUsers = numberOfUsers;
    this.view = new Viewmaster(); //instantiates the view this controller will control
    this.model = new Datafetcher('https://randomuser.me/api/'); //instantiates the model the controller will manipulate and pass to the view
    this.selectedUserIndex = null;
  }


  /*

getUserPromises(number) - accepts a number or users to get profile information for
@async the function awaits userPromise.data before pushing the data onto the promiseArray
- gets a number of userPromises equal to the number passed to it by args
- for each number passed to it, it creates a new Datafetcher object, awaits its data to push its data property into a promise promiseArray
- uses Promise.all to create the initial gallery, and locally store the user information in the Datafetcher model via its setter
  */


  async loadUpUsers() {
      try {
        for (let i=0 ; i < this.numberOfUsers; i+=1) {
          await this.model.goFetch()
          this.createGallery(this.view,this.model.data[i])
        }
      } catch(error) {
          console.log(error)
        }
      }

/*
  selectUser()
accepts a selected card element

*/

  selectProfile(card) {
    const queryEmail = card.lastElementChild.children[1].innerHTML //the email of the card selected
    this.selectedUserIndex = this.model.data.findIndex(index => index.email == queryEmail) //find the index of the user based on their email
    this.createModal(this.view, this.model.data[this.selectedUserIndex]) //calls for the select modal
  }

/*
takes the view object (template), and a data object (to bind to)
creates the gallery item on the screen based on the view's templates
*/

   createGallery(view, data) {
       const galleryItem = view.createGalleryItem(data)
       view.putIn(document.getElementById("gallery"), galleryItem)
       //adds an event listener to each gallery item added
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
takes the view object (template), and a data object (to bind to)
creates the gallery item on the screen based on the view's templates
*/

    createModal(view, data) {
        //remove Modal if its there
        if(document.querySelector(".modal-container") != undefined) {
          document.querySelector("body").removeChild(document.querySelector(".modal-container"))
        } //create append the modal
        const modalWindow = view.createModal(data)
        document.querySelector("body").insertBefore( document.querySelector(".modal-container"), document.querySelector("script"))
        document.getElementById("modal-close-btn").addEventListener("click", (e) => {
          console.log(e.target.tagName)
          this.closeModal()
        })
        document.getElementById("modal-prev").addEventListener("click", (e) => {
          console.log(e.target.tagName)
          this.prevModal()
          })
        document.getElementById("modal-next").addEventListener("click", (e) => {
          console.log(e.target.tagName)
          this.nextModal()
          })
        if(this.selectedUserIndex == 0) {
          document.getElementById("modal-prev").style.display = "none"
        }
        if(this.selectedUserIndex == this.numberOfUsers - 1) {
          document.getElementById("modal-next").style.display = "none"
        }
      }

  /* closeModal()
  - takes no argument.
  - closes the current model, and resets the selects the selectedUserIndex to null
  */

    closeModal() {
      this.selectedUserIndex = null;
      document.querySelector("body").removeChild(document.querySelector(".modal-container"))
    }

    /* closeModal()
    - takes no argument.
    - increments the selectedUserIndex, and calls createModal to recreate the modal using the new data object
    */

    nextModal() {
      this.selectedUserIndex = this.selectedUserIndex + 1;
      this.createModal(this.view, this.model.data[this.selectedUserIndex])
    }

    /* closeModal()
    - takes no argument.
    - decrements the selectedUserIndex, and calls createModal to recreate the modal using the new data object
    */

    prevModal() {
      this.selectedUserIndex = this.selectedUserIndex - 1;
      this.createModal(this.view, this.model.data[this.selectedUserIndex])
    }

}
