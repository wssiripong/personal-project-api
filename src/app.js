// const { sequelize } = require('./models');
// sequelize.sync({ alter: true });

require('dotenv').config();
const express = require('express');
const cors = require('cors');

const authRoute = require('./routes/authRoute');
const movieRoute = require('./routes/movieRoute');
const commentLikeRoute = require('./routes/commentLikeRoute');
const notFound = require('./middlewares/notFound');
const error = require('./middlewares/error');
const authenticate = require('./middlewares/authenticate');
const authenticateAdmin = require('./middlewares/authenticateAdmin');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/auth', authRoute);
app.use('/movies', movieRoute);
app.use('/admin/movies', authenticateAdmin, movieRoute);
app.use('/commentlikes', authenticate, commentLikeRoute);

app.use(notFound);
app.use(error);

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`server running on port ${port}`));
