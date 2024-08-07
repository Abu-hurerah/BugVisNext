const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('./helpers/database'); // Ensure the path is correct
const app = express();
const cors = require('cors');

// Routes
const UserRouter = require('./router/UserRoute');
const ProjectRoute = require('./router/ProjectRoute');
const BugRoute = require('./router/BugRoute');

// Middleware to parse body of HTTP requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({
    origin: 'http://localhost:8081', // Allow this origin to access the resources
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'], // Allowed request methods
    credentials: true // Allow credentials (cookies) to be sent with requests
}));

// Database synchronization
sequelize.sync() // Be cautious with this in production environments
    .then(() => {
        console.log("Database synchronized");
    })
    .catch(err => {
        console.error('Failed to synchronize database:', err);
    });

// Route handlers
app.use("/users", UserRouter);
app.use("/projects", ProjectRoute); // Changed to plural to follow RESTful practices
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
