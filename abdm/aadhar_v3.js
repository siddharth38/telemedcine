const axios = require('axios');
const { v4: uuidv4 } = require('uuid');

const currentTimestamp = new Date();
// Format the timestamp as desired (e.g., ISO 8601 format)
const formattedTimestamp = currentTimestamp.toISOString();

const randomUUID = uuidv4();
const apiUrl = 'https://abhasbx.abdm.gov.in/abha/api/v3/enrollment/request/otp';
const authToken ="Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJBbFJiNVdDbThUbTlFSl9JZk85ejA2ajlvQ3Y1MXBLS0ZrbkdiX1RCdkswIn0.eyJleHAiOjE2OTk1Mzc2NTYsImlhdCI6MTY5OTUxNjA1NiwianRpIjoiZTMzNjRjMmUtYzU0Ny00ZDU0LTk2OTQtOWVjM2I3MGFlOGYxIiwiaXNzIjoiaHR0cHM6Ly9kZXYubmRobS5nb3YuaW4vYXV0aC9yZWFsbXMvY2VudHJhbC1yZWdpc3RyeSIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiIzMjQ5NGU3Mi0wOTAwLTRiOTUtOTlmMS0zOTczZDY2ZTBjMjYiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJTQlhfMDAxMzAwIiwic2Vzc2lvbl9zdGF0ZSI6ImRhNTNjNDk4LTE4MjEtNGI0ZS04ZWZjLTA0MDY0ZDU2ZTg0OCIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiaHR0cDovL2xvY2FsaG9zdDo5MDA3Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJoaXUiLCJvZmZsaW5lX2FjY2VzcyIsImhlYWx0aElkIiwiT0lEQyIsImhpcCJdfSwicmVzb3VyY2VfYWNjZXNzIjp7IlNCWF8wMDEzMDAiOnsicm9sZXMiOlsidW1hX3Byb3RlY3Rpb24iXX0sImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJjbGllbnRIb3N0IjoiMTAuMjMzLjcyLjIyNiIsImNsaWVudElkIjoiU0JYXzAwMTMwMCIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwicHJlZmVycmVkX3VzZXJuYW1lIjoic2VydmljZS1hY2NvdW50LXNieF8wMDEzMDAiLCJjbGllbnRBZGRyZXNzIjoiMTAuMjMzLjcyLjIyNiJ9.IbE5GSAI7D57AmVR0LjqLUFWHmIgYQdC3HzTHpF6tuNw0kIPJ3O-7YiUqr8mGo3P2shPiacAUpM6CteaALVdzmqRn9jGSdaf8QUhIesgh-x3sjSE8bxoJoCmeH8MGrpjBHrVwbWwMUL72tozZj2kNrDxd1jktydGJ4XGti6HfFIX2XbNZVW-e2vbJIyypcMZe45Da13tzH-Odq4vX9SY95gkLWA1-4oAs4wCFKAcQzv849biObqtN6O3pQs3ymn-xvZMsMZaSSUEEh10yr0R1VaNQV1nGRcgvbjqc7KgbZvYdBGHiVSEv438wAioZj7khtUnXJ7WQMAK1LfT0jQ3-A"
const headers = {
  'Authorization': authToken,
  'Content-Type': 'application/json',
  'Host': 'abhasbx.abdm.gov.in',
  'User-Agent': 'axios/0.21.4', // Replace with your user agent
  'Accept': '*/*',
  'Accept-Encoding': 'gzip, deflate, br',
  'Connection': 'keep-alive', 
	'REQUEST-ID': randomUUID,
//'TIMESTAMP': formattedTimestamp,	

};

const requestBody ={
    "scope": [
        "abha-enrol"
    ],
    "loginHint": "aadhaar",
    "loginId": "kiHQVUa78TpG+OHmzwhxZrkQo8l/NWyme//23NAzmazHrYmHvCHAlc5zpHJ3h7hb0ILEB/CMZF8aMSUmkeyakb6p9ngqtvNR5D3+Z0hADtXEXmObJ35Ea1QrACc7e5Rb9nHQEbSvq/5hUbdl3kofoszBIdw3DS75ZZCAA71+/VzpyxK7k6/A3pGCDqNeI9hYW7JodiBJlO6ibKH00roiFu9OguIttdZxUlDY4UdnuqAJUBPn7/b54JupFct7arl9Epq0K5iOecIOMio6ECt99IXv4V0tkvvdf95uyzQ9kynbvp0s8dJuwyTfrYOzZpvhVC2OIrPbUD6IPfOxSwrmo3BZ8SYivXfoxlzHB+IiCcvmvZdXsuNok88RuKlXXWxe7OmTT+VaxQiWDG2uscrHminnzZgA8IasGOANaJmaBoWQ8ykQ0vqwXlTXs4kirz/YXUGCI5y4Ml/KMtsyUFv9hLrXtQjaIVn09Szjv0PeKYXYfEhua6ZT5Q7P6LBKFWYLGnjlEdMVx5r7MLPuVXcRKNY8WhdYcxBEdIEV8jnWZIB0CiKsKi9rMeed6jQvOel0i2XWOjToLhmByVQNRamJVehmbJ1ObQrLkJIsH9GISGtSlmSkiCvrUngCthFyYLtvIvp8/dTcZHGhsy9t4m+PgKpuqIhyNbA3Wqkn12ZYzMY=",
	"otpSystem": "aadhaar"
};

axios.post(apiUrl, requestBody, { headers })
  .then(response => {
    console.log('Response:', response.data);
  })
  .catch(error => {
    console.error('Error:', error.message);
  });

