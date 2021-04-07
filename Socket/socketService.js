const io = require("socket.io");
const Bet = require('../models/Bets');
const Product = require('../models/Products');

function dateDiff(date1, date2) {
    let time = (new Date(date1).getTime() - new Date(date2).getTime()) / 1000;
    console.log(time, '$$$$$$$$$$$$$$$$')
    return time * 1000;
    // return 10 * 1000; // todo change comments
}

const activeProducts = [];

function startAndStopInterval(product, socket) {
    let candidateProductInterval = activeProducts.find(item => item._id === product._id);
    console.log(candidateProductInterval);
    clearInterval(candidateProductInterval.interval);
    candidateProductInterval.interval = setInterval(async () => {
        let product = await Product.findOne({_id: candidateProductInterval._id});
        if (product) {
            let idx = product.liveUsers.findIndex(item => item === product._id);
            if (idx === product.liveUsers.length - 1) {
                idx = 0;
            } else {
                ++idx;
            }

            console.log('&&&&&&&&&&&&&&', product);
            console.log('&&&&&&&&&&&&&&', idx);
            console.log('&&&&&&&&&&&&&&', product.liveUsers[idx]);
            product.activeUser = product.liveUsers[idx];
            await Product.findByIdAndUpdate(
                {_id: product._id},
                {$set: product},
                {new: true});
            socket.broadcast.emit('getProduct');
            socket.broadcast.emit('changeUser');
            socket.emit('changeUser');
            socket.emit('getProduct');
        }
    }, 30 * 1000) // todo change 10 to 30
}


const socketService = {
    init(server) {
        this.io = io(server);
        this.startListening();
    },

    startListening() {
        this.io.of('/auction').on('connection', socket => {

            socket.on('userJoin', async ({productId, userId}) => {
                let product = Product.findOne({_id: productId});

                if (product) {
                    await Product.findByIdAndUpdate(
                        {_id: product._id},
                        {
                            $set: {
                                ...product,
                                liveUsers: [...product.liveUsers, userId]
                            }
                        },
                        {new: true});
                    socket.broadcast.emit('userJoin', {userId});
                    socket.emit('userJoin', {userId});
                }
            })

            socket.on('userDisconnect', async ({productId, userId}) => {
                let product = Product.findOne({_id: productId});
                if (product) {
                    await Product.findByIdAndUpdate(
                        {_id: product._id},
                        {
                            $set: {
                                ...product,
                                liveUsers: product.liveUsers.filter(user => user !== userId)
                            }
                        },
                        {new: true});
                    socket.broadcast.emit('userDisconnect', {userId});
                    socket.emit('userDisconnect', {userId});
                }
            })

            socket.on('addProduct', async ({product}) => {
                setTimeout(async () => {
                    let candidateProduct = await Product.findOne({_id: product._id});
                    console.log(candidateProduct, 'start')
                    if (candidateProduct) {
                        candidateProduct.isStarted = true;
                        await Product.findByIdAndUpdate(
                            {_id: candidateProduct._id},
                            {$set: candidateProduct},
                            {new: true});
                        socket.broadcast.emit('addProduct');
                        socket.emit('addProduct');
                        socket.broadcast.emit('getProduct');
                        socket.emit('getProduct');
                    }
                    setTimeout( async () => {
                        console.log(product, 'finish')
                        candidateProduct.isFinished = true;
                        if (candidateProduct) {
                            await Product.findByIdAndUpdate(
                                {_id: candidateProduct._id},
                                {$set: candidateProduct},
                                {new: true});
                            let candidateProductInterval = activeProducts.find(item => item._id === product._id);
                            clearInterval(candidateProductInterval.interval);
                            socket.broadcast.emit('addProduct');
                            socket.emit('addProduct');
                            socket.broadcast.emit('getProduct');
                            socket.emit('getProduct');
                        }
                    }, 60 * 2 * 1000); // todo change 10 to 60
                    if (!activeProducts.find(item => item._id === product._id)) {
                        activeProducts.push({
                            _id: product._id,
                            interval: null
                        })
                        startAndStopInterval(product, socket);
                    }
                }, dateDiff(product.date, new Date()));
                socket.broadcast.emit('addProduct');
                socket.emit('addProduct');
            })

            socket.on('changeUser', async ({productId}) => {
                let product = await Product.findOne({_id: productId});
                if (product) {
                    startAndStopInterval(product, socket);
                    socket.broadcast.emit('changeUser');
                    socket.emit('changeUser');
                }
            })

            socket.on('onBet', async ({productId}) => {
                let product = await Product.findOne({_id: productId});
                if (product) {
                    startAndStopInterval(product, socket);
                    socket.broadcast.emit('changeUser');
                    socket.emit('changeUser');
                }
            })
        })
    }
}

module.exports = socketService;
