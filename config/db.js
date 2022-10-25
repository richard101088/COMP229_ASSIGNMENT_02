
// My mongodb connection string

let atlasDB = "mongodb+srv://DB_user:WyVEbF1SM1uO7qF6@cluster018.tqgnut7.mongodb.net/products?retryWrites=true&w=majority";

let localDB = "mongodb://localhost:27017/products";

let mongoose = require('mongoose');

module.exports = function(){

    // Connect to the database
    mongoose.connect(atlasDB);

    // To monitor the conncetion
    //Connection error to trigger connectio error
    let mongodb = mongoose.connection;
    mongodb.on('error', console.error.bind(console, 'Connection Error:'));
    mongodb.once('open', ()=>{
        console.log('Connected to MongoDB----->>---->>>>');
    });

    return mongodb;
}