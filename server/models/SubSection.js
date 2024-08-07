const mongoose = require('mongoose');

const SubSection = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    timeDuration: {
        type: String,
        required: false,
    },
    videoUrl: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model('SubSection', SubSection);