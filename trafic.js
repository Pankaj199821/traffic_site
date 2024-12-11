// Selects the red, yellow, and green light elements from the DOM
const redLight = document.querySelector('.light.red');
const yellowLight = document.querySelector('.light.yellow');
const greenLight = document.querySelector('.light.green');

// Default timings for each light in seconds
let redTime = 10; // Duration for red light
let yellowTime = 3; // Duration for yellow light
let greenTime = 10; // Duration for green light

// Tracks the current active light
let currentLight = 'red';

// Function to start and manage the traffic light sequence
function startTrafficLight() {
    // Runs the sequence periodically based on the combined red and green light durations
    setInterval(() => {
        // If the current light is red
        if (currentLight === 'red') {
            // Turn off red light
            redLight.classList.remove('active');
            // Turn on yellow light
            yellowLight.classList.add('active');
            // Update current light to yellow
            currentLight = 'yellow';
            
            // After yellow light duration, switch to green light
            setTimeout(() => {
                // Turn off yellow light
                yellowLight.classList.remove('active');
                // Turn on green light
                greenLight.classList.add('active');
                // Update current light to green
                currentLight = 'green';
            }, yellowTime * 1000); // Convert seconds to milliseconds
        } 
        // If the current light is green
        else if (currentLight === 'green') {
            // Turn off green light
            greenLight.classList.remove('active');
            // Turn on red light
            redLight.classList.add('active');
            // Update current light to red
            currentLight = 'red';
        }
    }, (redTime + greenTime) * 1000); // Interval duration based on combined red and green light times
}

// Event listener for the form submission to update light timings
document.getElementById('timingForm').addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevents the default form submission behavior

    // Retrieves new timings entered by the user
    redTime = parseInt(document.getElementById('redTime').value);
    yellowTime = parseInt(document.getElementById('yellowTime').value);
    greenTime = parseInt(document.getElementById('greenTime').value);

    // Sends the updated timings to the server
    await fetch('/api/update-timings', {
        method: 'POST', // HTTP POST method to send data
        headers: { 'Content-Type': 'application/json' }, // Sets the content type to JSON
        body: JSON.stringify({ redTime, yellowTime, greenTime }), // Sends updated timings as JSON
    });

    // Alerts the user that timings have been updated
    alert('Timings updated successfully!');
});

// Starts the traffic light system
startTrafficLight();
