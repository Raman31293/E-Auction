const express = require('express');
const cors = require('cors');
const http = require('http'); // Import Node.js HTTP module
const websocketServer = require('./wsServer'); // Import WebSocket library
require('dotenv').config();

const app = express();
const server = http.createServer(app); // Create HTTP server
//json middleware
app.use(express.json());

// apply CORS middleware before routes
app.use(cors());
// Initialize WebSocket server
websocketServer;

// calling routes
const userRoutes = require('./routes/userroutes')
const productRoutes = require('./routes/productroutes')
app.use('/user',userRoutes)
app.use('/product',productRoutes)

app.get('/hello',(req,res)=>{
    res.send('hello hii')
});


app.listen(3001, ()=>{
    console.log('server start at port 3001')
})