const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

// Serve static files (HTML, CSS, JavaScript)
app.use(express.static(path.join(__dirname, 'public')));


app.listen(port, (error) => {
    if (!error){
        console.log("Server is running and App is listening on port http://localhost:"+ port)
    }
    else{
        console.log("Error occured, server can't start")
    }
})