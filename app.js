const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('./models/index'); // ensure correct path to your sequelize instance
const app = express();
const UserRouter = require('./router/UserRoute')
const ProjectRoute = require('./router/ProjectRoute')
const ProjectAssignRoute = require('./router/ProjectAssignRoute')
const BugRoute = require('./router/BugRoute')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Sync all models with the database
sequelize.sync().then(() => {
    console.log("Database synchronized");
}).catch(err => {
    console.error('Failed to synchronize database:', err);
});




app.use("/users", UserRouter)
app.use("/project", ProjectRoute)
app.use("/projectAssign", ProjectAssignRoute)
app.use("/Bug",BugRoute)

module.exports = app;
