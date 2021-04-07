const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const betsSchema = new Schema(
    {
        productId: Schema.Types.ObjectId,
        lastBid: String,
        bets: [{
            userId: Schema.Types.ObjectId,
            cost: String,
            data: Date
        }]
    }
);


module.exports = mongoose.model("Bets", betsSchema);
