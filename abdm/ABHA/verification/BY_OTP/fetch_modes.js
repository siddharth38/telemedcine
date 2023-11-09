const fs = require('fs');
const path = require('path');
const axios = require('axios');
const crypto = require('crypto');

//UUID (Random)
const { v4: uuidv4 } = require('uuid');
const uuid = uuidv4();

//TimeStamp
const { format } = require('date-fns');
const now = new Date();
const timestamp = format(now, "yyyy-MM-dd'T'HH:mm:ss.SSSXXX");

// Construct the relative path to accessToken.txt
const accessTokenFilePath = path.join(__dirname, '../../../accessToken.txt');

// Read the content of accessToken.txt
fs.readFile(accessTokenFilePath, 'utf-8', (err, data) => {
  if (err) {
    console.error('Error reading accessToken.txt:', err);
    return;
  }


  const apiUrl = 'https://dev.abdm.gov.in/gateway/v0.5/users/auth/fetch-modes';
  const authToken = "Bearer "+data;
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
        "id": "71585437060845@adbmd",
        "purpose": "KYC_AND_LINK",
        "requester": {
            "type": "HIU",
            "id": "baavlibuch"
        }
    }
  };
  axios.post(apiUrl, requestBody, { headers })
    .then(response => {
          console.log("Successful");
          console.log('Response:', response);
   })
  .catch(error => {
         console.error('Error:', error.message);
   });


});
