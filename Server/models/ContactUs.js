const moongoose = require('mongoose');

const contactSchema = new moongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    mobileNumber: {
        type: Number,
        required: true
    },
    queryRegarding: {
        type: String,
        enum: ['Course Enrollment', 'Technical Support', 'Billing & Payment', 'General Inquiry' , 'Instructor Guidance']
    },
    message: {
        type: String,
        required: true
    }
}, { timestamps: true })

module.exports = moongoose.model('Contact', contactSchema);
