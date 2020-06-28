/*
Reuseable Congroller
- Handles the logic
*/

class Controller {

  constructor(numberOfUsers) {
    this.numberOfUsers = numberOfUsers;
    this.view = new Viewmaster() //instantiates the view this controller will control
    this.model = new Datafetcher('https://randomuser.me/api/') //instantiates the model the controller will manipulate and pass to the view
    this.valueArray = [];
  }

  /*

getUserPromises(number) - accepts a number or users to get profile information for
@async the function awaits userPromise.data before pushing the data onto the promiseArray
- gets a number of userPromises equal to the number passed to it by args
- for each number passed to it, it creates a new Datafetcher object, awaits its data to push its data property into a promise promiseArray
- uses Promise.all to create the initial gallery, and locally store the user information in the Datafetcher model via its setter
  */


  async loadUserPromises() {
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
  create

*/

/*
takes the view object (template), and a data object (to bind to)
creates the gallery item on the screen based on the view's templates
*/

   createGallery(view, data) {
       const galleryItem = view.createGalleryItem(data)
       view.putIn(document.getElementById("gallery"), galleryItem)
    }
}
