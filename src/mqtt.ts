import mqtt, { Client } from "mqtt";
import MqttDispatcher from "mqtt-dispatcher";
import { logger } from "./logger";

export class MqttManager {
    private client: Client;
    private dispatcher;

    constructor() {
        logger.info(`connecting to broker...`)
        this.client = mqtt.connect(process.env.BROKER_CONNECTION_URI as string);
        this.client.on("error", e => {
            logger.error(`error while connecting to broker ${e}`)
        })
        this.dispatcher = new MqttDispatcher(this.client);

    }
    getClient() {
        return this.client
    }

    getDispatcher() {
        return this.dispatcher
    }
}