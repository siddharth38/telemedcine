const axios = require('axios');
const jwt = require('jsonwebtoken');
const fs = require('fs');


const accessToken = 'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJBbFJiNVdDbThUbTlFSl9JZk85ejA2ajlvQ3Y1MXBLS0ZrbkdiX1RCdkswIn0.eyJleHAiOjE2OTU4NjQ2MTcsImlhdCI6MTY5NTg0MzAxNywianRpIjoiMmI3NzZlYjItZWQ1NS00OWI1LTg1MzItYjA5YTRhYzM0Mjk5IiwiaXNzIjoiaHR0cHM6Ly9kZXYubmRobS5nb3YuaW4vYXV0aC9yZWFsbXMvY2VudHJhbC1yZWdpc3RyeSIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiIzMjQ5NGU3Mi0wOTAwLTRiOTUtOTlmMS0zOTczZDY2ZTBjMjYiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJTQlhfMDAxMzAwIiwic2Vzc2lvbl9zdGF0ZSI6IjczMzllODc0LTFkZWEtNDMzNC1iYjZmLWZiNTkxYTQ1ZjhmZCIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiaHR0cDovL2xvY2FsaG9zdDo5MDA3Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJoaXUiLCJvZmZsaW5lX2FjY2VzcyIsImhlYWx0aElkIiwiT0lEQyIsImhpcCJdfSwicmVzb3VyY2VfYWNjZXNzIjp7IlNCWF8wMDEzMDAiOnsicm9sZXMiOlsidW1hX3Byb3RlY3Rpb24iXX0sImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJjbGllbnRIb3N0IjoiMTAuMjMzLjcyLjE3NSIsImNsaWVudElkIjoiU0JYXzAwMTMwMCIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwicHJlZmVycmVkX3VzZXJuYW1lIjoic2VydmljZS1hY2NvdW50LXNieF8wMDEzMDAiLCJjbGllbnRBZGRyZXNzIjoiMTAuMjMzLjcyLjE3NSJ9.diN3fwCS_Zfq8QMsPd0Gw7iBkdwjok7Q6nAnLKInx2y1SZRMukgRxZ3H9njuy9bMzY6rchTmF8KqPb1Fw6dKcFa0or91XZbpwytUj96H3hmF7o0FiHLFApCYEC0Wme8jm4Z8zNV2cW4hxDnkgkh8K4fuA1zLx2Khx-YBdMp7N7soBU4oia4amsWrdtzc0Pw_qPmXrPsJ7292uzvqaoKmXAIaXzQ295yb1YvzWn1cybL0vesMCAWceN_toI5S9i0HrymL1VveMFdhWM7uds4YrnsLQxC1nZajQ3CJewRf4HpHxye9j7y2eUebUqi_ppN7yKt5c1TDMdU96mGYru5TdA';

const clientSecret = fs.readFileSync("values.txt", "utf-8").trim();



// Decode the JWT header without verifying
const decodedHeader = jwt.decode(accessToken, { complete: true });

// Check the algorithm specified in the header
if (decodedHeader && decodedHeader.header) {
  const algorithmUsed = decodedHeader.header.alg;
  console.log('Algorithm used:', algorithmUsed);
} else {
  console.error('Invalid JWT format.');
}


const publicKey = fs.readFileSync('./crypto/public_key.pem');
jwt.verify(accessToken, publicKey, { algorithms: ['RS256'] }, (err, decoded) => {
  if (err) {
    console.error('Token verification failed:', err);
  } else {
    // Decoded JWT claims
    console.log('Decoded JWT claims:', decoded);
  }
});

