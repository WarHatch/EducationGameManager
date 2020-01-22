const express = require('express');
const path = require('path');
const cors = require("cors");

const app = express();

app.use(cors());

// the __dirname is the current directory from where the script is running
app.use(express.static(__dirname));

// send the user to notfound.html page inspite of the url
// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, 'notfound.html'));
// });

const port = process.env.PORT || 8081;
app.listen(port, () => console.log("Server running on port " + port));
