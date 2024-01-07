const axios = require('axios');
const fs = require('fs');
const express = require('express');
const app = express();
const port = 80;
//const port = 443;
//const port = 3000;
const path = require('path');
const bodyParser = require('body-parser'); // Add body-parser middleware to parse JSON requests



// Use bodyParser to parse JSON requests
app.use(bodyParser.json());








app.post('http://34.131.119.20:80/v0.5/links/link/on-add-contexts', (req, res) => {
     console.log('Received on Add Contexts callback:', req.body);
     res.status(202).send('Acknowledged'); // Respond with 202 status code as acknowledgment
});




async function HIP_App() {
  try {
    // Start the server
    app.listen(port, () => {
      console.log(`Server listening at http://localhost:${port}`);
    });


    const { HIP_Initiated_Linking } = require(path.join(__dirname, './HIP_Initiated_Linking.js'));
    await  HIP_Initiated_Linking (); 
    
  } catch (error) {
    console.error('Error ', error);
  }
}

HIP_App();
