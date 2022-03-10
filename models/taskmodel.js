const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    task: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    }
}, { collection: 'userTask-data' }
)

module.export = mongoose.model("task", taskSchema)