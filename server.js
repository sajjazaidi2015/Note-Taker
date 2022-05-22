const express = require("express");
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require('uuid');
const termData = require("./db/db.json");

const app = express();
const PORT = process.env.PORT || 3001;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Middleware for parsing application/json and urlencoded data
app.use(express.static("public"));

// Three endpoints
/*

1 - /api/notes for Get

2 - /api/notes for Post

3 - /api/notes for Delete

*/

app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "public/index.html"))
);

app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "public/notes.html"))
);

// fs.readFile("./db/db.json", "utf8", (error, data) => {
//   error ? console.log(error) : res.json(data)
// })

app.get("/api/notes", (req, res) =>  res.json(termData));

app.post("/api/notes", (req, res) => {
  // Log that a POST request was received
  console.info(`${req.method} request received`);

  //Destructuring the notes in req.body
  const { title, text } = req.body;
  let newNote = { text: "", title: "", id: "" };
  //if all the required properties are present
  if (title && text) {
    //Variable for the object we will save
    newNote = {
      title,
      text,
      id: uuidv4(),
    };
    const response = {
      status: "success",
      body: newNote,
    };
    console.log(response);
    termData.push(newNote);
  }

  fs.writeFile("./db/db.json", JSON.stringify(termData), function (err) {
    if (err) {
      return console.log(err);
    }
    console.log("Your note was saved!");
  });


  // Gives back the response, which is the user's new note.
  res.json(newNote);
});

app.delete("/api/notes/:id", (req, res) => {
  console.log('params', req.params.id)
  console.log(`${req.method} request received`)

  for (let i = 0; i < termData.length; i++) {

    if (termData[i].id == req.params.id) {
        // Splice takes i position, and then deletes the 1 note.
        termData.splice(i, 1);
        break;
    }
}
  /*
    get id from param
    filter out the id you got from param to get an array that does not include
  */
  fs.writeFile("./db/db.json", JSON.stringify(termData), function (err) {
    if (err) {
      return console.log(err);
    }
    console.log("Your note is deleted!");
    res.json({ noteId: req.params.id }) 
  });
 
    
})

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);