function on_fetch_modes_post_handler(req, res) {
  // Handle the POST request here
  const requestBody = req.body; // Accessing  the request body
  console.log('on_fetch_modes_post_handler');
	console.log(req.body)
  // Processing logic .... (later)
  res.status(202).send('POST request received'); // Sending  a response
};

module.exports = {on_fetch_modes_post_handler};

