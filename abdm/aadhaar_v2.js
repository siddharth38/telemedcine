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
	console.log(response.data);
        return response.data; // Replace with the appropriate key from the response if needed

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
      console.log(`Response status for aadhar_v2 : ${response.status}`)
      console.log('TxnID is : ', response.data.txnId);
      	     
     // fs.writeFileSync("txnID.txt", response.data.txnId);
      txnID_after_OTP_Generation = response.data.txnId;
      return txnID_after_OTP_Generation;
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
      console.log(`Response status for verifyOTP : ${response.status}`)
      console.log('Response : ', response);
      	     
      txnID_after_OTP_Verfication = response.data.txnId;
      const phone = response.data.phone;
      
      return { txnID_after_OTP_Verfication, phone };
  } catch (error) {
    console.error('Error:', error.message);
   }
   
}

async function checkAndGenerateMobileOTP(txnID_after_OTP_Verfication,mobileNumber){

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
	  "mobile": mobileNumber,
	  "txnId": txnID_after_OTP_Verfication 
        };


 
      // Use async/await with axios.post
      const response = await axios.post(apiUrl, requestBody, { headers });
      console.log(`Response status for checkAndGenerateMobileOTP : ${response.status}`)
      console.log('Response : ', response);
      	     
  } catch (error) {
    console.error('Error:', error);
   }
}


async function createHealthIdByAdhaar(txnID_after_OTP_Verfication){

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
	  "txnId": txnID_after_OTP_Verfication 
        };


 
      // Use async/await with axios.post
      const response = await axios.post(apiUrl, requestBody, { headers });
      console.log(`Response status for  createHealthIdByAdhaar : ${response.status}`)
      console.log('Response : ', response);
      	     
  } catch (error) {
    console.error('Error:', error.message);
   }
}




async function aadhaar_v2() {
    try {
        const publicKey = await fetchPublicKey();
        const encryptedAadhaar = encryptData(publicKey, aadhaarNumber);
	const txnID_after_OTP_Generation = await generateOTP(encryptedAadhaar);
       
	// Use a promise to wrap the asynchronous code
        const userOTP = await new Promise((resolve) => {
                     rl.question("Enter OTP to continue the further process: ", (OTP) => {
                     resolve(OTP);
                 });
        });

        const parsedOTP = String(userOTP);
	const { txnID_after_OTP_Verification, phone } = await verifyOTP(publicKey,txnID_after_OTP_Generation,parsedOTP);

	    //checkAndGenerateMobileOTP(txnID_after_OTP_Verification,mobileNumber);
	await createHealthIdByAdhaar(txnID_after_OTP_Verification);     
	rl.close();
       
    } catch (error) {
        console.error('An error occurred:', error);
    }
}



aadhaar_v2();
