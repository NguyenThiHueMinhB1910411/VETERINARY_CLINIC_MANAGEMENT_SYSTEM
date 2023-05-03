// const app = require("./app");
// const config = require("./app/config");


// const PORT = config.app.port;
// app.listen(PORT,() =>{
//     console.log('Server is running on port ${PORT}');
// });
const app = require("./app");
const config = require("./app/config");
const MongoDB = require("./app/utils/mongodb.util");

app.get("/", async (req, res) => {
    const clientId = process.env.ATEMg2mbQ8vBzjmJe5BlUjR-E2swm1lCz5O5c9JhrcNFnIsHKYcoFd881yFPObcHnj05gN3ERU30IIGO;
    const clientToken = await paypal.generateClientToken();
    res.render("checkout", { clientId, clientToken });
  });

async function startServer(){
    try{
        await MongoDB.connect(config.db.uri);
        console.log("Connected to the database!");

        const PORT = config.app.port;
        app.listen(PORT, () => {
            console.log(`Server is rurning on port ${PORT}`);
        });
    }catch (error){
        console.log("Cannot connect to the database!", error);
        process.exit();
    }
}

startServer();

