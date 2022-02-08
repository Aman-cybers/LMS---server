const mongoose = require('mongoose')

const UserF = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    password: { type: String, required: true }

},
    { collection: 'userF-data' }
)

const model = mongoose.model('UserFData', UserF)

module.exports = model