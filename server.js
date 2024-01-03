const express = require('express');
const path = require('path');
const fs = require('fs');
const uniqid = require('uniqid'); 

const PORT = process.env.PORT || 3001;


const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

//add api routes below this
app.get('/api/notes',(req,res)=>{
  fs.readFile('./db/db.json','utf-8',(err,data)=>{
  console.log(data)
  let notes = JSON.parse(data)
  console.log(notes)
  res.json(notes)
  })
   
});

app.post('/api/notes',(req,res)=>{
  fs.readFile('./db/db.json','utf-8',(err,data)=>{
  let notes = JSON.parse(data)
  console.log(notes)
  console.log(req.body)
  let newNote ={
    ...req.body,
    id:uniqid()
  }

  notes.push(newNote)
  fs.writeFile('./db/db.json',JSON.stringify(notes),(err)=>{
    res.json(notes)

  })

  })
   
});



app.delete('/api/notes/:id',(req,res)=>{
  fs.readFile('./db/db.json','utf-8',(err,data)=>{
  console.log(req.params.id)
  let notes = JSON.parse(data)
  console.log(notes)
  const result = notes.filter((note) => note.id !== req.params.id);
  console.log(result)
  fs.writeFile('./db/db.json',JSON.stringify(result),(err)=>{
    res.json(result)

  })
  })
   
});




//add HTML Routes below this

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.listen(PORT,()=>{console.log(`App listening at http://localhost:${PORT}`)})