const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env'});
const app = express();

//database connection
mongoose.connect(process.env.MONGODB_URI, {
    useMongoClient: true,
    useNewUrlParser: true,
    useCreateIndex:true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(() =>{
    console.log('Database connected');
}).catch('error', err =>{
    console.log(`Database connection error: ${err.message}`)
});

//middlewares
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

//routes
const userRouter = require('./routes/userRoute');
const subjectRouter = require('./routes/subjectRoute');
const categoryRouter = require('./routes/categoryRoute');
const lessonRouter = require('./routes/lessonRoute');

app.use('/api/v1', userRouter, subjectRouter, categoryRouter, lessonRouter);

app.get('/', (req, res) =>{
    res.send('Hello world');
});

const port = process.env.PORT || 5000;
app.listen(port, () =>{
    console.log(`App Running on port ${port}`);
});