const axios = require('axios');
const NodeRSA = require('node-rsa');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const readLine = require('readline');

//Created interface to read from the console

const rl = readLine.createInterface({
	input: process.stdin,
	output: process.stdout
});


// Function to fetch the public key
async function fetchPublicKey() {
    try {
        const response = await axios.get('https://healthidsbx.abdm.gov.in/api/v2/auth/cert');
	console.log("Public Key succesfully fetched ", response.status);
	console.log("\n",response.data);
	console.log('\n');
        return response.data; 

    } catch (error) {
        console.error('Error fetching public key:', error);
        throw error;
    }
}


// Function to encrypt the Aadhaar number using RSA/ECB/PKCS1Padding
function encryptData(publicKey, data) {
    const buffer = Buffer.from(data, 'utf-8');
    const encrypted = crypto.publicEncrypt(
        {
            key: publicKey,
            padding: crypto.constants.RSA_PKCS1_PADDING,
        },
        buffer
    );
    return encrypted.toString('base64');
}

// Function to send the POST request with encrypted data
async function generateOTP(encryptedAadhaar) {
//	console.log(encryptedData);
     const accessTokenFilePath = path.join(__dirname, './accessToken.txt'); 
     try {
       // Read the content of accessToken.txt asynchronously
        const accessToken = await fs.promises.readFile(accessTokenFilePath, { encoding: 'utf-8' });

        const apiUrl = 'https://healthidsbx.abdm.gov.in/api/v2/registration/aadhaar/generateOtp';
        const authToken = "Bearer " + accessToken.trim();
    
        const headers = {
          'Authorization': authToken,
	  'Content-Type': 'application/json',
	  'Host': 'healthidsbx.abdm.gov.in',
	  'User-Agent': 'axios/0.21.4', 
	  'Accept': '*/*',
	  'Accept-Encoding': 'gzip, deflate, br',
	  'Connection': 'keep-alive',
	  'Accept-Language': 'en-US', 
	};
    

        const requestBody = {
//"aadhaar": "kiHQVUa78TpG+OHmzwhxZrkQo8l/NWyme//23NAzmazHrYmHvCHAlc5zpHJ3h7hb0ILEB/CMZF8aMSUmkeyakb6p9ngqtvNR5D3+Z0hADtXEXmObJ35Ea1QrACc7e5Rb9nHQEbSvq/5hUbdl3kofoszBIdw3DS75ZZCAA71+/VzpyxK7k6/A3pGCDqNeI9hYW7JodiBJlO6ibKH00roiFu9OguIttdZxUlDY4UdnuqAJUBPn7/b54JupFct7arl9Epq0K5iOecIOMio6ECt99IXv4V0tkvvdf95uyzQ9kynbvp0s8dJuwyTfrYOzZpvhVC2OIrPbUD6IPfOxSwrmo3BZ8SYivXfoxlzHB+IiCcvmvZdXsuNok88RuKlXXWxe7OmTT+VaxQiWDG2uscrHminnzZgA8IasGOANaJmaBoWQ8ykQ0vqwXlTXs4kirz/YXUGCI5y4Ml/KMtsyUFv9hLrXtQjaIVn09Szjv0PeKYXYfEhua6ZT5Q7P6LBKFWYLGnjlEdMVx5r7MLPuVXcRKNY8WhdYcxBEdIEV8jnWZIB0CiKsKi9rMeed6jQvOel0i2XWOjToLhmByVQNRamJVehmbJ1ObQrLkJIsH9GISGtSlmSkiCvrUngCthFyYLtvIvp8/dTcZHGhsy9t4m+PgKpuqIhyNbA3Wqkn12ZYzMY="
	    "aadhaar" : encryptedAadhaar
        };


 
      // Use async/await with axios.post
      const response = await axios.post(apiUrl, requestBody, { headers });
      console.log(`Response status for aadhaar_v2 : ${response.status}`);
      	     
      return response.data.txnId;
  } catch (error) {
    console.error('Error:', error.message);
   }
   
}

async function verifyOTP(publicKey,txnID_after_OTP_Generation , parsedOTP){
     	
     const encryptedOTP = encryptData(publicKey, parsedOTP);
     const accessTokenFilePath = path.join(__dirname, './accessToken.txt'); 
     try {
       // Read the content of accessToken.txt asynchronously
        const accessToken = await fs.promises.readFile(accessTokenFilePath, { encoding: 'utf-8' });

        const apiUrl = 'https://healthidsbx.abdm.gov.in/api/v2/registration/aadhaar/verifyOTP';
        const authToken = "Bearer " + accessToken.trim();
    
        const headers = {
          'Authorization': authToken,
	  'Content-Type': 'application/json',
	  'Host': 'healthidsbx.abdm.gov.in',
	  'User-Agent': 'axios/0.21.4', 
	  'Accept': '*/*',
	  'Accept-Encoding': 'gzip, deflate, br',
	  'Connection': 'keep-alive',
	  'Accept-Language': 'en-US', 
	};
    

        const requestBody = {
	  "otp": encryptedOTP,
          "txnId": txnID_after_OTP_Generation 
        };


 
      // Use async/await with axios.post
      const response = await axios.post(apiUrl, requestBody, { headers });
      console.log(`OTP Successfully Verified: ${response.status}`)
      console.log('Response after OTP verification : ', response.data);
      	     
      txnID_after_OTP_Verfication = response.data.txnId;
      
      return txnID_after_OTP_Verfication;
  } catch (error) {
    console.error('Error:', error.message);
   }
   
}

async function checkAndGenerateMobileOTP(txnID_after_OTP_Verfication){

     const accessTokenFilePath = path.join(__dirname, './accessToken.txt'); 
     try {
        const accessToken = await fs.promises.readFile(accessTokenFilePath, { encoding: 'utf-8' });

        const apiUrl = 'https://healthidsbx.abdm.gov.in/api/v2/registration/aadhaar/checkAndGenerateMobileOTP';
        const authToken = "Bearer " + accessToken.trim();
    
        const headers = {
          'Authorization': authToken,
	  'Content-Type': 'application/json',
	  'Host': 'healthidsbx.abdm.gov.in',
	  'User-Agent': 'axios/0.21.4', 
	  'Accept': '*/*',
	  'Accept-Encoding': 'gzip, deflate, br',
	  'Connection': 'keep-alive',
	  'Accept-Language': 'en-US', 
	};
    

        const requestBody = {
	  "mobile": 9861917365,
	  "txnId": txnID_after_OTP_Verfication 
        };


 
      // Use async/await with axios.post
      const response = await axios.post(apiUrl, requestBody, { headers });
      console.log(`Response status for checkAndGenerateMobileOTP : ${response.status}`)
      //console.log(response.data);
      return response.data.txnId;
      	     
  } catch (error) {
    console.error('Error:', error);
   }
}


async function createHealthIdByAdhaar( txnID_after_checkAndGenerateMobileOTP){
     //console.log("txnID_after_OTP_Verification is: " ,txnID_after_OTP_Verification);
     const accessTokenFilePath = path.join(__dirname, './accessToken.txt'); 
     try {
        const accessToken = await fs.promises.readFile(accessTokenFilePath, { encoding: 'utf-8' });

        const apiUrl = 'https://healthidsbx.abdm.gov.in/api/v2/registration/aadhaar/createHealthIdByAdhaar';
        const authToken = "Bearer " + accessToken.trim();
    
        const headers = {
          'Authorization': authToken,
	  'Content-Type': 'application/json',
	  'Host': 'healthidsbx.abdm.gov.in',
	  'User-Agent': 'axios/0.21.4', 
	  'Accept': '*/*',
	  'Accept-Encoding': 'gzip, deflate, br',
	  'Connection': 'keep-alive',
	  'Accept-Language': 'en-US', 
	};
    

        const requestBody = {
          "consent": true,
          "consentVersion": "v1.0",
	  "txnId":txnID_after_checkAndGenerateMobileOTP
        };


 
      // Use async/await with axios.post
      const response = await axios.post(apiUrl, requestBody, { headers });
      console.log(`ABHA number and ABHA ID successfully created : ${response.status}`)
      console.log('Response : ', response.data);
      	     
  } catch (error) {
    console.error('Error for createHealthIdByAadhaar :', error.message);
   }
}



async function aadhaar_v2() {
//     const aadhaarNumber = '897922887303';
 const aadhaarNumber = '281716321407';
    // const aadhaarNumber = '825941094719';
  // const aadhaarNumber = '270009154726';
    try {
        const publicKey = await fetchPublicKey();
        const encryptedAadhaar = encryptData(publicKey, aadhaarNumber);
        console.log("Encrypted Aadhaar Card: ", encryptedAadhaar);
        console.log('\n');

        const txnID_after_OTP_Generation = await generateOTP(encryptedAadhaar);

        // Call rl.question only if generateOTP is successful
        if (txnID_after_OTP_Generation) {
            const userOTP = await new Promise((resolve) => {
                rl.question("Enter OTP to continue the further process: ", (OTP) => {
                    resolve(OTP);
                });
            });
            const parsedOTP = String(userOTP);
            const txnID_after_OTP_Verification = await verifyOTP(publicKey, txnID_after_OTP_Generation, parsedOTP);
            const txnID_after_checkAndGenerateMobileOTP = await checkAndGenerateMobileOTP(txnID_after_OTP_Verification);
            await createHealthIdByAdhaar(txnID_after_checkAndGenerateMobileOTP);
            rl.close();
        }
    } catch (error) {
        console.error('An error occurred:', error);
        rl.close(); // Close readline in case of error
    }
}

aadhaar_v2();

