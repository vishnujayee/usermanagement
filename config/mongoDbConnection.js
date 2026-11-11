 require('dotenv').config();
        const moongose = require('mongoose');
        const connection_str = process.env.MONGODBURL;
            moongose.connect(connection_str, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }).then(() => { console.log("connected to mogodb") }).catch((error) => {
                console.log("some error occur in connecting mongodb")
            });
            moongose.connection.on('error', err => {
                console.log(err);
            })
        
        module.exports = module;