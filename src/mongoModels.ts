import mongoose, { Schema } from "mongoose";

export interface TelemetryModel {
    _id: string
    ts: number
    relay: string
    emeter_0_energy: number
    emeter_0_returned_energy: number
    emeter_0_total: number
    emeter_0_total_returned: number
    emeter_0_power: number
    emeter_0_voltage: number
    emeter_0_current: number
    emeter_0_pf: number
    emeter_1_energy: number
    emeter_1_returned_energy: number
    emeter_1_total: number
    emeter_1_total_returned: number
    emeter_1_power: number
    emeter_1_voltage: number
    emeter_1_current: number
    emeter_1_pf: number
    emeter_2_energy: number
    emeter_2_returned_energy: number
    emeter_2_total: number
    emeter_2_total_returned: number
    emeter_2_power: number
    emeter_2_voltage: number
    emeter_2_current: number
    emeter_2_pf: number
    ctime: string
    mtime: string
}


export const Telemetry = mongoose.model(process.env.TELEMETRY_COLLECTION as string, new Schema({
    ts: Number, // js timestamp
    relay: String, // on | off | overpower
    deviceId: String,
    emeter_0_energy: Number,
    emeter_0_returned_energy: Number,
    emeter_0_total: Number,
    emeter_0_total_returned: Number,
    emeter_0_power: Number,
    emeter_0_voltage: Number,
    emeter_0_current: Number,
    emeter_0_pf: Number,
    emeter_1_energy: Number,
    emeter_1_returned_energy: Number,
    emeter_1_total: Number,
    emeter_1_total_returned: Number,
    emeter_1_power: Number,
    emeter_1_voltage: Number,
    emeter_1_current: Number,
    emeter_1_pf: Number,
    emeter_2_energy: Number,
    emeter_2_returned_energy: Number,
    emeter_2_total: Number,
    emeter_2_total_returned: Number,
    emeter_2_power: Number,
    emeter_2_voltage: Number,
    emeter_2_current: Number,
    emeter_2_pf: Number
}, {timestamps: {createdAt: "ctime", updatedAt: "mtime"}, versionKey: false}))