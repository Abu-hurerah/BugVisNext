const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('./helpers/Database'); 
const app = express();
const cors = require('cors');
const UserRouter = require('./router/UserRoute');
const ProjectRoute = require('./router/ProjectRoute');
const BugRoute = require('./router/BugRoute');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:8081',
  methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
  credentials: true
}));

sequelize.sync()
  .then(() => {
    console.log("Database synchronized");
  })
  .catch(err => {
    console.error('Failed to synchronize database:', err);
  });

app.use("/users", UserRouter);
app.use("/projects", ProjectRoute);
app.use("/bugs", BugRoute);

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.send({
    error: {
      message: err.message,
      status: err.status
    }
  });
});

module.exports = app;
