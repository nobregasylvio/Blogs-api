const express = require('express');
const categoriesRoute = require('./routes/categories.routes');
const loginRoute = require('./routes/login.routes');
const postRoute = require('./routes/post.routes');
const userRoute = require('./routes/user.routes');

// ...

const app = express();

app.use(express.json());

// ...

app.use('/login', loginRoute);
app.use('/user', userRoute);
app.use('/categories', categoriesRoute);
app.use('/post', postRoute);

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
