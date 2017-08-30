const express = require('express');
const mustacheExpress = require('mustache-express');
const app = express();
const bodyParser = require('body-parser');

app.engine('mustache', mustacheExpress());
app.set('views','./views');
app.set('view engine', 'mustache')
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));

var todo = [];
var done = [];


app.get('/', function(request, response){

  response.render('index',{

    todo: todo,
    done: done

  })

});

app.post('/', function(request, response){

  todo.push(request.body.list)
  response.redirect('/')
});


app.post('/completed', function(request, response){
  const remove = request.body.completed
  todo.splice(todo.indexOf(remove), 1)
  done.push(remove)
  response.redirect('/')
  console.log(remove)
});






app.listen(3000, function(){
  console.log('Live From the Gutter');
});
