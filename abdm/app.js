

const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});


app.post('/', (req, res) => {
  res.send('Post request recieved');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});











let axios = require("axios");
let { readFileSync } = require("fs")

function updateHealthRepoUrl(accessToken, refreshToken, timestamp){
  axios
    .patch('https://dev.abdm.gov.in/devservice/v1/bridges',
      {
        // "url": "https://yourbhai.baavlibuch.com/"
        // "url": "https://baavlibuch.com"
        // "url": "http://34.131.50.238"
        // "url": "https://34.131.107.243/"
        url: "https://abdm.baavlibuch.com"
      },
      {
        headers: {
          accept: "*/*",
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`
        }
      })
    .then((response) => {
//      console.log('UpdateHealthRepoUrl response = ', response);
      console.log('FINISHED GRACEFULLY');
    })
    .catch((error)=>{
      console.error('HealthRepoUpdateUrl axios.fetch error caught: error = ', error);
      // console.error('HealthRepoUpdateUrl axios.fetch error caught: error.response = ', error.response);
      // console.error('HealthRepoUpdateUrl axios.fetch error caught: error.response.request.res = ', error.response.request.res);
      // console.error('HealthRepoUpdateUrl axios.fetch error caught: error.response.res = ', error.response.res);
      console.error("FAILED. time = ", new Date()-timestamp)
     
    })
}

function addHipToTheBridgeAndEnterRegistry(accessToken, timestamp){
  axios
    .put('https://dev.abdm.gov.in/devservice/v1/bridges/services',
      {
        id:"baavlibuch",
        name:"YourBestHealthAI",
        type:"HIP",
        //type:"HIU",
        active:true,
        alias:["EG"]
      },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`
        }
      })
    .then((response) => {
  //    console.log('addHipToTheBridgeAndEnterRegistry response = ', response)
      console.log('FINISHED GRACEFULLY')
     
    })
    .catch((error)=>{
      console.error('addHipToTheBridgeAndEnterRegistry axios.fetch error caught: ', error.response);
      console.error("FAILED. time = ", new Date()-timestamp)
    })
}

function getAccessToken(){
  let timestamp = new Date()
	const axios=require('axios');
	const url='https://dev.abdm.gov.in/gateway/v0.5/sessions';
	const fs = require('fs');


// Read clientSecret from file
	const clientSecret = fs.readFileSync("values.txt", "utf-8").trim();

	const requestData = {
		  'clientId': 'SBX_001300',
		  'clientSecret': clientSecret
		};

	
	const headers =
		{
  			'Content-Type': 'application/json;charset=utf-8',
  			'User-Agent': 'axios/0.19.2',
  			'Content-Length':80,
  			'Accept': 'application/json, text/plain, */*'
		};
  axios
    .post(url,requestData,{headers})
    .then((response) => {
      console.log("Gateway Auth axios.then. time = ", new Date()-timestamp)
      let {accessToken, expiresIn, refreshExpiresIn, refreshToken, tokenType } = response.data;
      fs.writeFileSync("accessToken.txt", accessToken);
	   // console.log({accessToken, expiresIn, refreshExpiresIn, refreshToken, tokenType })

      // step 1 connect own server
       updateHealthRepoUrl(accessToken, refreshToken, timestamp)
      // step 2 HIP - Health information provider
       addHipToTheBridgeAndEnterRegistry(accessToken, timestamp)
    })
    .catch((error) => {
      console.error('Gateway Auth axios.fetch error caught: ', error);
    });
}

function App(){
  // let timestamp = new Date()
  // absolute first step - auth with gateway
  getAccessToken()
}

App()
// export default App
