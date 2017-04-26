const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');
const path = require('path');

//Database
const models = require('./models');

//Subrouters
const wikiRouter = require('./routes/wiki');
const userRouter = require('./routes/users');

//setting up nunjucks
const env = nunjucks.configure('views', {noCache: true});
app.set('view engine', 'html');
app.engine('html', nunjucks.render);

//setting up morgan middleware
app.use(morgan('dev'));
//setting up bodyParser
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

//serving up files from public folder
app.use(express.static(path.join(__dirname, './public')));

app.use('/wiki', wikiRouter);
app.use('/user', userRouter);

//base app get route
app.get('/', function (rec, res, next) {
  res.render('index');
})

models.db.sync({force: true})
  .then(() => {
    //starting the server after the db has synced
    app.listen(3030, function () {
      console.log('Server is up and ready on port 3030!')
    });
  })
  .catch(console.error);

