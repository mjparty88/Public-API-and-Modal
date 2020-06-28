/*
app.js
- set up objects
- set up event handlers
*/

//initiate the application with 12 profiles
const theFatController = new Controller(12)
theFatController.loadUserPromises()

//initatie the view object, containing all the templates
