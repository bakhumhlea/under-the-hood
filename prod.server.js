const express = require('express');
const path = require('path');
const app = express();
const PORT = 8080;

app.use('/dist', express.static('dist'));
app.get('*', (req,res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});
app.listen(PORT, () => console.log('Production app running on port:' + PORT))