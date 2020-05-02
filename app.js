const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const morgan = require('morgan');
dotenv.config({ path: './config.env'});
const app = express();

//database connection
mongoose.connect(process.env.DATABASE_URI, {
    useNewUrlParser: true,
    useCreateIndex:true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(() =>{
    console.log('Database connected');
}).catch('error', err =>{
    console.log(`Database connection error: ${err.message}`)
});

//routes
const userRouter = require('./routes/userRoute');

//middlewares
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/v1', userRouter);

app.get('/', (req, res) =>{
    res.render('Hello world')
});

const port = 8080;
app.listen(port, () =>{
    console.log(`App Running on port ${port}`);
});