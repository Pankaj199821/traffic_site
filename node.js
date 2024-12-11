// Importing the Express framework
const express = require('express');
// Importing the body-parser middleware to parse JSON request bodies
const bodyParser = require('body-parser');
// Initializing the Express application
const app = express();

// Default traffic light timings
let timings = { redTime: 10, yellowTime: 3, greenTime: 10 }; // Red, yellow, and green light durations in seconds

// Use body-parser middleware to parse JSON request bodies
app.use(bodyParser.json());

/* 
   Route to get the current timings
   Responds with the current timings in JSON format
*/
app.get('/api/timings', (req, res) => {
    res.json(timings); // Sends the `timings` object as a JSON response
});

/* 
   Route to update timings
   Accepts a POST request with the new red, yellow, and green light durations
*/
app.post('/api/update-timings', (req, res) => {
    // Destructures the new timings from the request body
    const { redTime, yellowTime, greenTime } = req.body;

    // Validates that the timings meet the minimum required values
    if (redTime < 5 || yellowTime < 2 || greenTime < 5) {
        return res.status(400).send('Invalid timings'); // Responds with an error if timings are invalid
    }

    // Updates the `timings` object with the new values
    timings = { redTime, yellowTime, greenTime };

    // Sends a success response
    res.status(200).send('Timings updated');
});

/* 
   Starts the server on port 3000
   Logs a message indicating that the server is running and where it's accessible
*/
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
