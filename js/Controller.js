/*
Reuseable Congroller
- Handles the logic
*/

class Controller {

  constructor(numberOfUsers) {
    this.numberOfUsers = numberOfUsers;
    this.data = [];
    this.view = new Viewmaster()
  }

  /*

getUserPromises(number) - accepts a number or users to get profile information for
@async the function awaits userPromise.data before pushing the data onto the promiseArray
- gets a number of userPromises equal to the number passed to it by args
- for each number passed to it, it creates a new Datafetcher object, awaits its data to push its data property into a promise promiseArray
- uses Promise.all to push individal response data into the controllers data array
  */


  async getUserPromises() {
      try {
        let promiseArray = [];
        for (let i=0 ; i < this.numberOfUsers; i+=1) {
          let userPromise = new Datafetcher('https://randomuser.me/api/')
          await promiseArray.push(userPromise.data)
        }
        Promise.all(promiseArray).then( values => {
          for(let i = 0; i < values.length; i+=1){
            console.log(values[i])
            this.data.push(values[i])
            this.createGallery(this.view, values[i])
          }
        })

      } catch(error) {
          console.log(error)
        }
      }

/*
takes the view object (template), and a data object (to bind to)
creates the gallery item on the screen based on the view's templates
*/

   createGallery(view, data) {
       const galleryItem = view.createGalleryItem(data)
       view.putIn(document.getElementById("gallery"), galleryItem)
    }
}
