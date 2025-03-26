// Loads the express module
const express = require("express");
const hbs = require("hbs");
const bodyParser = require("body-parser");
const path = require("path");

// Creates our express server
const app = express();

// Serves static files (we need it to import a CSS file)
app.use(express.static(path.join(__dirname, "public")));

// Sets Handlebars as the view engine
app.set("view engine", "hbs");

// Middleware to parse form data from POST requests
app.use(bodyParser.urlencoded({ extended: true }));

// Redirects "/happy" route to "index" (ensure index.hbs exists)
app.get("/happy", (req, res) => {
  res.redirect("index");
});

// Handles POST requests from the form submission on "index.hbs"
app.post("/happy", (req, res) => {
  const { myName, gender, number } = req.body; // Extracts form data
  let names = []; // Stores all entered names
  let singers = []; // Stores names of guests who will sing

  // Loops through the number of guests and collects their names
  for (let i = 0; i < number; i++) {
    let name = req.body[`name${i + 1}`]; // Retrieves each guest's name
    names.push(name);
    
    // Checks if the guest is attending (checkbox is checked)
    const isGoing = req.body[`checkbox${i + 1}`] ? true : false;
    if (isGoing) {
      singers.push(name); // Adds guest to singers list if attending
    }
  }

  let infos = {}; // Stores whether each guest is attending
  let going = "";

  // Loops through guests again to store their attendance status
  for (let i = 0; i < number; i++) {
    let nameAgain = req.body[`name${i + 1}`];
    const isGoing = req.body[`checkbox${i + 1}`] ? true : false;

    going = isGoing ? "Yes" : "No"; // Converts attendance status to "Yes" or "No"
    infos[nameAgain] = going; // Saves attendance info
  }

  let noSingers = singers.length; // Counts how many guests are singing

  let pronoun = "";
  if (gender == "Male") pronoun = "he's";
  if (gender == "Female") pronoun = "she's"; 

  // Defines the final song line for "For He's a Jolly Good Fellow"
  const songLine = `For,${pronoun},a,jolly,good,fellow.,For,${pronoun},a,jolly,good,fellow.,For,${pronoun},a,jolly,good,fellow,,which,nobody,can,deny!`;

  // Creates an array of objects, assigning lyrics to guests in a cyclic manner
  const song = [
    { singer: singers[0 % singers.length], word: "Happy" },
    { singer: singers[1 % singers.length], word: "birthday" },
    { singer: singers[2 % singers.length], word: "to" },
    { singer: singers[3 % singers.length], word: "you." },

    { singer: singers[4 % singers.length], word: "Happy" },
    { singer: singers[5 % singers.length], word: "birthday" },
    { singer: singers[6 % singers.length], word: "to" },
    { singer: singers[7 % singers.length], word: "you." },

    { singer: singers[8 % singers.length], word: "Happy" },
    { singer: singers[9 % singers.length], word: "birthday" },
    { singer: singers[10 % singers.length], word: "dear" },
    { singer: singers[11 % singers.length], word: myName + "." },

    { singer: singers[12 % singers.length], word: "Happy" },
    { singer: singers[13 % singers.length], word: "birthday" },
    { singer: singers[14 % singers.length], word: "to" },
    { singer: singers[15 % singers.length], word: "you!" },

    { singer: singers[16 % singers.length], word: songLine }
  ];

  // Renders "happy.hbs" and passes all collected data
  res.render("happy", { myName, gender, number, names, song, noSingers, infos });
});

// Renders the initial index page
app.get("/", (req, res) => {
  res.render("index");
});

// Makes the app listen to port 3000
app.listen(3000, () => console.log(`App listening to port 3000`));
