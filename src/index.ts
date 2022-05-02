import {boot, createMqttManager} from "./boot";
import {logger} from "./logger";
import { MessagePool } from "./messagePool";
import {Telemetry} from "./mongoModels"

async function main() {
    await boot();
    const manager = createMqttManager();
    const messagePool = new MessagePool();

    await manager.getDispatcher().addRule("shellies/+/emeter/+/+", async (topic, message) => {
        const [,deviceId,,emeterIndex, field] = topic.split("/");
        messagePool.addPropToDevice(deviceId, `emeter_${emeterIndex}_${field}`, message.toString(), (deviceId, data) => {
            return Telemetry.create({...data, deviceId})
        });
    })
    logger.info("started")
}

main().catch(e => {
    logger.error(e);
    process.exit(1);
})