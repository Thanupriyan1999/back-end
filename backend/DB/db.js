const mongoose = require('mongoose')

const DbConnection = () => {
mongoose.connect("mongodb+srv://bthanupriyan7321:rF2az1I8rtGCfpG3@cluster0.wiqeesb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then(
        (con)=> console.log(`MongoDB is connected to the host: ${con.connection.name}`)
    )
    .catch(
        (err)=>console.log(err)
    )
}

module.exports = DbConnection