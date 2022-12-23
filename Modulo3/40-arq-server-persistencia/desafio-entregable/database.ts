import {connect} from "mongoose"
import {MONGO_URI} from "./config/index"
import { logger } from "./utils/logger_config";

// "Singleton" MongoConnection

export class MongoConnection {
    private static connected = false;

    private constructor (){}

   public static async connect(): Promise<boolean>{
    if(!MongoConnection.connected){
        try {
            await connect(MONGO_URI || "");
            MongoConnection.connected = true
            logger.log("info", "Connected to Mongo successfully")
            return true
        } catch (error) {
            logger.log("error", "Couldn't connect to Mongo")
            return false
            
        }
    }
    return false
   }
}


