/*
Reuseable Datafetcher Class
@Class
- constructed with a URL
- Fetches, stores, and filters data for the controller
*/

class Datafetcher {

 constructor() {
   this.url = 'https://randomuser.me/api/'; //the URL being passed to the data fetcher
   this.data = [];
   this.visibleData = [];
 }

 /*
 goFetch()
 @async
 - accepts a number as an argument
 - the number gets added to the results query string at the end of the API URL
 - awaits the result of fetch, and then spreads the result into its own data array
 */

 async goFetch(number) {
   await fetch(this.url + "?results=" + number)
          .then(this.checkStatus)
          .then(response => response.json())
          .then(data => {
            this.data = [...data['results']]
            this.visibleData = this.data;
          })
          .catch(error => console.log("there was a problem getting the data", error))
    //the actual response received by the fetch()
 }

/*
checkStatus()
- checks the status of a response, before setting the Promise to resolved or rejected
- when it sets the status of a response, it assigns the DataFetcher object a responseStatus of 'ok' or 'error' so the promise state can be easily accessed.
*/

 checkStatus(response){
   if(response.ok) {
     return Promise.resolve(response);
   } else {
     return Promise.reject(new Error(response.statusText));
   }
 }

}
