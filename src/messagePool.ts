import { logger } from "./logger"

interface Telemetry {
    relay
    emeter_0_energy
    emeter_0_returned_energy
    emeter_0_total
    emeter_0_total_returned
    emeter_0_power
    emeter_0_voltage
    emeter_0_current
    emeter_0_pf
    emeter_1_energy
    emeter_1_returned_energy
    emeter_1_total
    emeter_1_total_returned
    emeter_1_power
    emeter_1_voltage
    emeter_1_current
    emeter_1_pf
    emeter_2_energy
    emeter_2_returned_energy
    emeter_2_total
    emeter_2_total_returned
    emeter_2_power
    emeter_2_voltage
    emeter_2_current
    emeter_2_pf
}

interface MessagePoolMap {
    [deviceId: string]: {
        data: Telemetry,
        timer: NodeJS.Timeout
    }
}

type OnDataCallBack = (deviceId: string, data: Telemetry) => void | Promise<void>

export class MessagePool {
    protected messages: MessagePoolMap = {}
    protected onDeviceFlush: OnDataCallBack | undefined;

    constructor(callback?: OnDataCallBack) {
        this.onDeviceFlush = callback
    }

    getData(deviceId: string) {
        if (!this.exists(deviceId)) return
        return this.messages[deviceId].data
    }

    addPropToDevice(deviceId: string, propName: string, value: any, onDataCallBack?: OnDataCallBack) {
        if (onDataCallBack) {
            if (this.onDeviceFlush !== onDataCallBack) this.onDeviceFlush = onDataCallBack;
        }
        if (this.exists(deviceId)) {
            this.messages[deviceId].data[propName] = value
        } else {
            this.messages[deviceId] = { data: {[propName]: value}} as any;
        }
        this.setupTimer(deviceId)
    }

    protected setupTimer(deviceId: string) {
        if (this.messages[deviceId].timer !== undefined) return
        this.messages[deviceId].timer = setTimeout(async () => {
            await this.flush(deviceId);
        }, parseInt(process.env.FLUSH_TIMER_MILLISECONDS as string) || 500);
    }

    exists(deviceId: string) {
        return this.messages[deviceId] !== undefined
    }

    removeDevice(deviceId: string) {
        delete this.messages[deviceId]
    }

    protected async safeFlush(data: Telemetry, deviceId: string) {
        try {
            await this.onDeviceFlush?.(deviceId, data);
        } catch (e: any) {
            logger.error(`error while flushing data for ${deviceId ? "device " + deviceId : "all devices"}: ${e.toString()}`)
        }
    }

    async flush(deviceId?: string) {
        logger.info(`flushing ${!deviceId ? "all devices" : deviceId}`);
        if (!deviceId) {
            for (const _deviceID of Object.keys(this.messages)) {
                await this.safeFlush(this.messages[_deviceID].data, _deviceID)
                this.removeDevice(_deviceID)
            }
        } else {
            if (!this.exists(deviceId)) {
                logger.warn(`device ${deviceId} doesn't exist. skipping flush`);
                return
            }
            await this.safeFlush(this.messages[deviceId].data, deviceId)
            this.removeDevice(deviceId)
        }
    }
}