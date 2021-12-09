import {createConnection, Transaction} from "typeorm"
import {Client} from "./entities/Client"
import {Banker} from "./entities/Banker"
import { Transactions } from "./entities/Transactions"
import express, { application } from "express"
import { createClientRouter } from "./routes/create_client"
import { createBankerRouter } from "./routes/create_banker"
import { createTransactionRouter } from "./routes/create_transaction"
import { connectBankerToClientRouter } from "./routes/connect_banker_to_client"
import { deleteClientRouter } from "./routes/delete_client"
import { fetchClientRouter } from "./routes/fetch_clients"

const app = express();

const main = async () => {
    try{
        await createConnection({
            type: "postgres",
            host: "localhost",
            port: 3300,
            username: "vik",
            password: undefined,
            database: "typeorm",
            entities: [Client, Banker, Transactions],
            synchronize: true,
        })
        console.log("Connected to Postgres")
        app.use(express.json())
        app.use(createClientRouter)
        app.use(createBankerRouter)
        app.use(createTransactionRouter)
        app.use(connectBankerToClientRouter)
        app.use(deleteClientRouter)
        app.use(fetchClientRouter)

        app.listen(8080, () => {
            console.log("Server started 8080...")
        })
    }catch(err){
        console.log(err)
        console.log("Could not connect to Postgres")
    }
}

main()