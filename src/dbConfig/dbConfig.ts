import mongoose from "mongoose"

export async function connect(){
    try{
        const isConnected = mongoose.connect(process.env.MONGO_URL!)
        const connection = mongoose.connection
        connection.on('connected', () => {
            console.log(`Mongo DB connected`);
        })

        connection.on('error',() => {
            console.log(`Error occured in connecting to the DB make sure that the db is up and running`)
            process.exit(404)
        })
    }catch(err){
        console.log(`Something went wrong while connecting to the DB: ${err}`)
    }
}