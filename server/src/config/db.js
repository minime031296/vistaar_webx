const {connect} = require('mongoose')

const connectToDb = async(URL) => {
    try {
        await connect(URL)
    } catch (error) {
        console.error(`error in connectToDb`)
    }
}

module.exports = connectToDb

