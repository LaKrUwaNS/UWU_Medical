import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

// COFIG
const app = express(); 
app.use(express.json());


//Variables
const PORT = process.env.PORT;


// ROutes
app.get('/', (req, res) => {
    res.send('Hello from Express!');
});




app.listen(PORT, () => {
    console.log('Server is running on http://localhost:5000');
});
