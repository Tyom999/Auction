const express = require('express');
const app = express();

const http = require('http').createServer(app);
const socketService = require('./Socket/socketService');

const cors = require('cors');
const morgan = require('morgan');


const authRouter = require('./routes/auth');
const productRouter = require('./routes/product');

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(cors());
app.use(morgan('dev'));


app.use('/auth', authRouter);
app.use('/product', productRouter);

app.use((req, res, next) => {
    const error = new Error('not found route');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
});

socketService.init(http);

module.exports = http;
