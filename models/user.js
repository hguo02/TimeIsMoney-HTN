const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { builtinModules } = require("module");

const recordSchema = new Schema({
    goalType: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    goal: {
        type: String,
        required: true
    },
    value: {
        type: Number,
        required: true
    },
    progress: {
        type: Number,
        required: false
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
});

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    goals: [recordSchema],
    log: [recordSchema]
    //log: [recordSchema]
    //log: list of records
});

exports.user = mongoose.model('User', UserSchema);
exports.records = mongoose.model('records', recordSchema);