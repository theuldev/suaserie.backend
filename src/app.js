const connection = require('./database/connection')

const app = require('./config/express-conf')

require('./migrate');

const PORT = 3000;

connection.authenticate().then(() =>{
    console.log("Connection with database sucessful!")

    app.listen(PORT, ()=>{
        console.log(`Servidor iniciado no endereço http:locahost:${PORT}`);
    })

}).catch((error) =>{
    console.error("connection failed!");
})


