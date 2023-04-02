const express = require('express');
const app = express();

app.use(express.static(__dirname));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.listen(3010, function() {
    console.log('Server running on port 3010');
    console.log('Server link: http://localhost:3010');
});