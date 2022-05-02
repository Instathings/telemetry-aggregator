import mongoose from "mongoose";
import { logger } from "./logger";
import { MqttManager } from "./mqtt";

export function checkEnvironmentVariables() {
    const required = ["TELEMETRY_COLLECTION", "MONGO_CONNECTION_URI", "BROKER_CONNECTION_URI"];
    if (!required.map(item => process.env[item]).some(s => !s)) return
    throw Error(`required environment variables missing: ${required}`);
}

export function connectToMongoDatabase() {
    logger.info("connecting to database...");
    let retries = parseInt(process.env.DB_BOOT_CONNECTION_RETRIES as string) || 5;
    let retry = 0;
    const connectFn = () => new Promise<void>((resolve, reject) => {
        retry++;
        mongoose.connect(process.env.MONGO_CONNECTION_URI as string).then(() => resolve()).catch(e => {
           logger.error(`error while connecting to db, retry #${retry}`);
           logger.debug(e.toString())
           if (retry === retries) return reject(`max retries reached while connecting to db`);
           setTimeout(async () => {
               await connectFn()
           }, parseInt(process.env.RETRY_INTERVAL_SECONDS as string) || 5000);
       })
    })
    return connectFn();
}

export function createMqttManager() {
    return new MqttManager()
}

export async function boot() {
    await checkEnvironmentVariables();
    await connectToMongoDatabase();
}