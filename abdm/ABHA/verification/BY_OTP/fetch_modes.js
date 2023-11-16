const fs = require('fs').promises; // Use fs.promises for asynchronous file reading
const path = require('path');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const { format } = require('date-fns');

async function fetch_modes(abha) {
  const uuid = uuidv4();
  const now = new Date();
  const timestamp = format(now, "yyyy-MM-dd'T'HH:mm:ss.SSSXXX");

  // Construct the relative path to accessToken.txt
  const accessTokenFilePath = path.join(__dirname, '../../../accessToken.txt');

  try {
    // Read the content of accessToken.txt asynchronously
    const accessToken = await fs.readFile(accessTokenFilePath, 'utf-8');

    const apiUrl = 'https://dev.abdm.gov.in/gateway/v0.5/users/auth/fetch-modes';
    const authToken = "Bearer " + accessToken;
    const headers = {
      'Authorization': authToken,
      'Content-Type': 'application/json',
      'X-CM-ID': 'sbx',
      'User-Agent': 'axios/0.21.4',
      'Accept': '*/*',
      'Accept-Encoding': 'gzip, deflate, br',
      'Connection': 'keep-alive',
    };

    const requestBody = {
      "requestId": uuid,
      "timestamp": timestamp,
      "query": {
       "id": abha,  
       "purpose": "KYC_AND_LINK",
       "requester": {
          "type": "HIP",
          "id": "baavlibuch"
       }
      }
    };

    // Use async/await with axios.post
    const response = await axios.post(apiUrl, requestBody, { headers });
    console.log(`Response status for fetch_modes : ${response.status}`)
    //console.log('Response : ', response);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

module.exports ={ fetch_modes };

