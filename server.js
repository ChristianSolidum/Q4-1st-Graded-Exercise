// Loads the express module
const express = require("express");
const hbs = require("hbs");

const bodyParser = require("body-parser");

const path = require("path");

//Creates our express server
const app = express();

//Serves static files (we need it to import a css file)
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "hbs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Sets a basic route

// Render the initial page with the number input form
app.get("/", (req, res) => {
  res.redirect("index"); // Ensure you have index.hbs
});

// Create express route binder for draw.hbs and get the data from the url as parameters
// that came from index.hbs



app.post("/happy", (req, res) => {
  const { myName, gender, number } = req.body;
  res.render('happy', { myName, gender, number }); // Use "names" instead of "name"
});


//Makes the app listen to port 3000
app.listen(3000, () => console.log(`App listening to port 3000`));
