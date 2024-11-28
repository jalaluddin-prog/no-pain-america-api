const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose')
require('dotenv').config()

const app = express();
const port = process.env.PORT;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())
app.use(cors({
    origin: '*'
}));

//Sehema
const leadSchema = new mongoose.Schema({
    name: String,
    email: String,
    phoneNo: String,
    insurance: {
        type: String,
        enum: ['Yes', 'No'], // Correct usage of enum
    },
    whichPage: String,
    productCategory: String,
    whatNeed:String
});

//Model
const leadModel = mongoose.model('lead', leadSchema)

// API
app.post('/api/submit', (req, res) => {
    try {
        const { name, email, phoneNo, insurance, whichPage, productCategory,whatNeed } = req.body;
        // console.log('Form Data:', req.body);
        leadModel.create({
            name, email, phoneNo, insurance, whichPage, productCategory,whatNeed
        })
    
        res.status(201).json({message:'Thank you! your request creaete'});
    } catch (error) {
        res.status(500).json({message:"Internal server error"});
    }

});



app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});


// Connect to MongoDB
mongoose.connect(process.env.MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Connected to MongoDB");
});