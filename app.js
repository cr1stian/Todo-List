const express = require('express');
const mustacheExpress = require('mustache-express');
const app = express();
const bodyParser = require('body-parser');

app.engine('mustache', mustacheExpress());
app.set('views','./views');
app.set('view engine', 'mustache')
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
//empty arrays for storing strings
var todo = [];
var done = [];

//rending the arrays
app.get('/', function(request, response){

  response.render('index',{

    todo: todo,
    done: done

  })
console.log(todo)
});
//pushing the List values to the Todo array and keeping user on the same page
app.post('/', function(request, response){

  todo.push(request.body.list)
  response.redirect('/')
});


app.post('/completed', function(request, response){
  const remove = request.body.completed //creating var for complete tasks
  todo.splice(todo.indexOf(remove), 1) //removing completed task from Todo array
  done.push(remove) //pushing task to Done array
  response.redirect('/') //keeping user on the same page(no refresh)
});




app.listen(3000, function(){ //node is looking for port 3000 and function proves it's
  console.log('Live From the Gutter');
});
