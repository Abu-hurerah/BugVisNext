const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('./helpers/database'); // Ensure the path is correct
const app = express();

// Routes
const UserRouter = require('./router/UserRoute');
const ProjectRoute = require('./router/ProjectRoute');
const ProjectAssignRoute = require('./router/ProjectAssignRoute');
const BugRoute = require('./router/BugRoute');

// Middleware to parse body of HTTP requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Database synchronization
sequelize.sync()
    .then(() => {
        console.log("Database synchronized");
    })
    .catch(err => {
        console.error('Failed to synchronize database:', err);
    });

// Route handlers
app.use("/users", UserRouter);
app.use("/projects", ProjectRoute); // Changed to plural to follow RESTful practices
app.use("/projectAssign", ProjectAssignRoute); // Changed to hyphenated and more descriptive
app.use("/bugs", BugRoute); // Changed to lowercase and plural for consistency

// Catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// Error handling
app.use((err, req, res, next) => {
    // Set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // Render the error page
    res.status(err.status || 500);
    res.send({
        error: {
            message: err.message,
            status: err.status
        }
    });
});

module.exports = app;
