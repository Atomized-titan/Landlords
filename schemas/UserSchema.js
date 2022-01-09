const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    username: {
        type: mongoose.SchemaTypes.String,
        required: true,
        unique:true,

    },
    discordId: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    address: {
        type: mongoose.SchemaTypes.String,
        required: true,
        unique:true,
    },    
})

module.exports = mongoose.model("User",UserSchema);