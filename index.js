var express = require('express');
var app = express();

const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.sqlite'
});


const Comments = sequelize.define('Comments', {
  content: {
    type: DataTypes.STRING,
    allowNull: false
  },
  
}, {
});
(async () => {
await Comments.sync();
console.log("The table for the User model was just (re)created!");
}) ();


app.set('view engine', 'ejs');
app.use(express.json()) 
app.use(express.urlencoded({ extended: true })) 

app.get('/', async function(req, res) {
  const comments = await Comments.findAll();
  res.render('index',{ comments: comments});
}); //READ

app.post('/create', async function(req, res) {
  const { content } = req.body

  await Comments.create({ content: content });

  res.redirect('/')
}); //Create

app.post('/update/:id', async function(req, res) {
  const { content } = req.body
  const { id } = req.params

  await Comments.update({ content: content }, {
    where: {
      id: id
    }
  }); // Update

  res.redirect('/')
});

app.post('/delete/:id', async function(req, res) {
  const { id } = req.params

  await Comments.destroy({
    where: {
      id: id
    }
  });
  res.redirect('/')
}); // Delete


app.listen(8080);
console.log('Server is listening on port 8080');
