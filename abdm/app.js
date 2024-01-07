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


//Call-back post functions
//===========================================================================================================================================================
app.post('/v0.5/users/auth/on-fetch-modes', (req, res) => {
     console.log('Received on-fetch-modes callback:', req.body);
     res.status(202).send('Acknowledged'); // Respond with 202 status code as acknowledgment

});


app.post('/v0.5/users/auth/on-init', (req, res) => {
    console.log('Received HIP_on_init_auth callback:', req.body);
	
    console.log(req.body.auth.transactionId);
    const transactionId = req.body.auth.transactionId;
	
    fs.writeFileSync("transaction_Id_after_HIP_auth_init_mobileOtp.txt", transactionId);
    res.status(202).send('Acknowledged'); // Respond with 202 status code as acknowledgment
	
});


app.post('/v0.5/users/auth/on-confirm', (req, res) => {
    console.log('Received HIP_on_confirm callback:', req.body);
	
    res.status(202).send('Acknowledged'); // Respond with 202 status code as acknowledgment
	
});
//============================================================================================================================================================





function updateHealthRepoUrl(accessToken, refreshToken, timestamp) {
  return axios.patch(
    'https://dev.abdm.gov.in/devservice/v1/bridges',
    {
      url: "https://abdm.baavlibuch.com"
    },
    {
      headers: {
        accept: "*/*",
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`
      }
    }
  );
}



function addHipToTheBridgeAndEnterRegistry(accessToken, timestamp) {
  return axios.put(
    'https://dev.abdm.gov.in/devservice/v1/bridges/services',
    {
      id: "baavlibuch",
      name: "YourBestHealthAI",
      type: "HIP",
      active: true,
      alias: ["EG"]
    },
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`
      }
    }
  );
}




async function getAccessToken() {
  let timestamp = new Date();
  const axios = require('axios');
  const url = 'https://dev.abdm.gov.in/gateway/v0.5/sessions';

  const clientSecret = await fs.readFileSync("values.txt", "utf-8").trim();
  const requestData = {
    'clientId': 'SBX_001300',
    'clientSecret': clientSecret
  };

  const headers = {
    'Content-Type': 'application/json;charset=utf-8',
    'User-Agent': 'axios/0.19.2',
    'Content-Length': 80,
    'Accept': 'application/json, text/plain, */*'
  };

  return axios
    .post(url, requestData, { headers })
    .then((response) => {
      console.log("Gateway Auth axios.then. time = ", new Date() - timestamp)
      let { accessToken, expiresIn, refreshExpiresIn, refreshToken, tokenType } = response.data;
      console.log("Authorized clientID and ClientSecret Key");
      console.log(response);
      fs.writeFileSync("accessToken.txt", accessToken);
     return updateHealthRepoUrl(accessToken, refreshToken, timestamp)
       .then(() => {
	       return addHipToTheBridgeAndEnterRegistry(accessToken, timestamp)
        .then((addHipResponse) => {
	  console.log('\n');
	 console.log('Suceesfully Registered as Health Information Provider(HIP)');
          console.log("Configurations of the Response  from addHipToTheBridgeAndEnterRegistry:");
          console.log(addHipResponse.config); // Print the response data
        });
        });

     })
    .catch((error) => {
      console.error('Gateway Auth axios.fetch error caught: ', error);
    });
}




async function App() {
  try {
    await getAccessToken();
    // Start the server
    app.listen(port, () => {
      console.log(`Server listening at http://localhost:${port}`);
    });

    // Ensure register_callback_url is executed and responds first
    const { register_callback_url } = require(path.join(__dirname, './register_callback_url.js'));
    await register_callback_url();
    console.log("Callback URL successfullt created!");
	  
     const abha = await fs.readFileSync("abha.txt", "utf-8").trim();
     console.log(abha);

     const { fetch_modes } = require(path.join(__dirname, './ABHA/verification/BY_OTP/fetch_modes.js'));
     await fetch_modes(abha); 
    
  //  const { HIP_auth_init_mobileOtp } = require(path.join(__dirname, './ABHA/verification/BY_OTP/HIP_auth_init_mobileOtp.js'));
    // await  HIP_auth_init_mobileOtp(abha); 

		 
    //const { HIP_auth_confirm } = require(path.join(__dirname, './ABHA/verification/BY_OTP/HIP_auth_confirm.js'));

   // const transaction_Id_after_HIP_auth_init_mobileOtp = await fs.readFileSync("transaction_Id_after_HIP_auth_init_mobileOtp.txt", "utf-8").trim();
     // Pass the transactionId to HIP_auth_confirm
    //HIP_auth_confirm(transaction_Id_after_HIP_auth_init_mobileOtp,OTP);

  } catch (error) {
    console.error('Error in App():', error);
  }
}

App();
