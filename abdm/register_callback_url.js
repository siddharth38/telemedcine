const fs = require('fs').promises; // Use fs.promises for asynchronous file reading
const path = require('path');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const { format } = require('date-fns');

async function register_callback_url() {

  // Construct the relative path to accessToken.txt
  const accessTokenFilePath = path.join(__dirname, './accessToken.txt');

  try {
	    // Read the content of accessToken.txt asynchronously
	    const accessToken = await fs.readFile(accessTokenFilePath, 'utf-8');

	    const apiUrl = 'https://dev.abdm.gov.in/devservice/v1/bridges';
	    const authToken = "Bearer " + accessToken;
	    const headers = {
	      'Authorization': authToken,
	      'Content-Type': 'application/json',
	      'User-Agent': 'axios/0.21.4',
	      'Accept': '*/*',
	      'Accept-Encoding': 'gzip, deflate, br',
	      'Connection': 'keep-alive',
	    };

	    const requestBody = {
		  "url": "http://34.131.119.20:80"
		}
      
 

	    const response = await axios.patch(apiUrl, requestBody, { headers });
	    console.log('Response to register_callback_url: ', response.status); 
     } catch (error) {
           console.error('Error:', error.message);
     }
}

module.exports ={ register_callback_url };
