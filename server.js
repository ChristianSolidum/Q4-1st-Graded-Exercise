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

//Sets a basic route

// Render the initial page with the number input form
app.get("/happy", (req, res) => {
  res.redirect("index"); // Ensure you have index.hbs
});

// Create express route binder for draw.hbs and get the data from the url as parameters
// that came from index.hbs



app.post("/happy", (req, res) => {
  const { myName, gender, number } = req.body;
  let names = [];
  let singers = [];

  for (let i = 0; i<number; i++){
      let name = req.body[`name${i+1}`];
      names.push(name);
      const isGoing = req.body[`checkbox${i+1}`] ? true : false; // checks whether a close friend/relative is going or not
    if (isGoing == true) {
      singers.push(name); // if the guest is going, add them to the singers array
    }
  }

  let infos = {};
  let going = ""

    for (let i = 0; i < number; i++){
    let nameAgain = req.body[`name${i+1}`];
    const isGoing = req.body[`checkbox${i+1}`] ? true : false;

    if (isGoing == true) {
      going = "Yes"
    }
    else {
      going = "No"
    }
    infos[nameAgain] = going;
  }


  let noSingers = singers.length;

  let pronoun = "";
  if (gender == "Male") pronoun = "he's";
  if (gender == "Female") pronoun = "she's"; 
  
  // declare the song line for the Jolly Good Fellow
  const songLine = `For,${pronoun},a,jolly,good,fellow.,For,${pronoun},a,jolly,good,fellow.,For,${pronoun},a,jolly,good,fellow,,which,nobody,can,deny!`;

  // creates an array containing the guests and their corresponding word/lyric
  const song = [
    {singer: singers[0 % singers.length], word: "Happy"},
    {singer: singers[1 % singers.length], word: "birthday"},
    {singer: singers[2 % singers.length], word: "to"},
    {singer: singers[3 % singers.length], word: "you."},
    
    {singer: singers[4 % singers.length], word: "Happy"},
    {singer: singers[5 % singers.length], word: "birthday"},
    {singer: singers[6 % singers.length], word: "to"},
    {singer: singers[7 % singers.length], word: "you."},
    
    {singer: singers[8 % singers.length], word: "Happy"},
    {singer: singers[9 % singers.length], word: "birthday"},
    {singer: singers[10 % singers.length], word: "dear"},
    {singer: singers[11 % singers.length], word: myName + "."},
    
    {singer: singers[12 % singers.length], word: "Happy"},
    {singer: singers[13 % singers.length], word: "birthday"},
    {singer: singers[14 % singers.length], word: "to"},
    {singer: singers[15 % singers.length], word: "you!"},
    
    {singer: singers[16 % singers.length], word: songLine}
  ]

  res.render('happy', { myName, gender, number, names, song, noSingers, infos }); // Use "names" instead of "name"
});

app.get("/", (req, res) => {
  res.render("index")
});


//Makes the app listen to port 3000
app.listen(3000, () => console.log(`App listening to port 3000`));
