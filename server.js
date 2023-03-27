// import app 
const app = require ("./backend/app");
// important : backend server is listening on http://localhost:3000
app.listen(3000,()=> {
    console.log("Express Application is listening on PORT 3000 ...");
});