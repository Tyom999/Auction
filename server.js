const app = require('./app');
const mongoose = require('mongoose');
const keys = require('./config/keys');

mongoose.connect(keys.mongoURl, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
    .then(data => {
        console.log("MongoDB has connected...");
    }).catch(e => console.log('MongoDB error', e));

app.listen(keys.port, () => console.log('Server is running ...'));
