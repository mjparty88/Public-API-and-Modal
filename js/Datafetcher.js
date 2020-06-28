/*
Reuseable Datafetcher Class
- constructed with a URL
- Its job is to fetch data from APIs and provide responses.
- It also masters the data model for the website
*/

class Datafetcher {

 constructor(url) {
   this.url = url; //the URL being passed to the data fetcher
   this.data = [];
 }

 async goFetch() {

   await fetch(this.url)
          .then(this.checkStatus)
          .then(response => response.json())
          .then(data => this.data.push(data['results'][0]))
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
