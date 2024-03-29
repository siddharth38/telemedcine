const fs = require('fs');
const path = require('path');
const axios = require('axios');
const crypto = require('crypto');


//TimeStamp

async function HIP_auth_init_mobileOtp(abha) {

  //UUID (Random)
  const { v4: uuidv4 } = require('uuid');
  const uuid = uuidv4();
  const now = new Date();

  const { format } = require('date-fns');
  const timestamp = format(now, "yyyy-MM-dd'T'HH:mm:ss.SSSXXX");

  // Construct the relative path to accessToken.txt
  const accessTokenFilePath = path.join(__dirname, '../../../accessToken.txt');

  try {
    // Read the content of accessToken.txt asynchronously
    const accessToken = await new Promise((resolve, reject) => {
      fs.readFile(accessTokenFilePath, 'utf-8', (err, data) => {
        if (err) reject(err);
        else resolve(data);
      });
    });

    const apiUrl = 'https://dev.abdm.gov.in/gateway/v0.5/users/auth/init';
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
        "authMode": "MOBILE_OTP",
        "requester": {
          "type": "HIP",
          "id": "baavlibuch"
        }
      }
    };

    // Use async/await with axios.post
    const response = await axios.post(apiUrl, requestBody, { headers });
    console.log(`Response status for HIP_auth_init_mobileOtp : ${response.status}`);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

module.exports = { HIP_auth_init_mobileOtp };








