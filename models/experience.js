const mongoose = require('mongoose');

const positionSchema = new mongoose.Schema({
    position_number: {
        required: true,
        type: Number
    },
    position: {
        required: true,
        type: String
    },
    pos_start: {
        required: true,
        type: Date
    },
    pos_end: { type: Date },
    pos_len: { type: String },
    position_desc: [{ type: String }]
});

const dataSchema = new mongoose.Schema({
    job_number: {
        required: true,
        type: Number,
    },
    job: {
        required: true,
        type: String
    },
    company: {
        required: true,
        type: String
    },
    start: {
        required: true,
        type: Date
    },
    end: {
        type: Date
    },
    len: {
        required: true,
        type: String
    },
    job_type: {
        required: true,
        type: String
    },
    positions: [positionSchema]
});

module.exports = mongoose.model('Experience', dataSchema);