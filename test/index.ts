import mqtt from "mqtt";

async function main() {
    const client = mqtt.connect("mqtt://localhost");
    setInterval(() => {
        client.publish("shellies/mydevice1/emeter/0/current", "2");
        client.publish("shellies/mydevice1/emeter/0/voltage", "5");
        client.publish("shellies/mydevice1/emeter/0/pf", "-0.01");
        client.publish("shellies/mydevice1/emeter/1/current", "2");
        client.publish("shellies/mydevice1/emeter/1/voltage", "5");
        client.publish("shellies/mydevice1/emeter/1/pf", "-0.01");
        client.publish("shellies/mydevice1/emeter/2/current", "2");
        client.publish("shellies/mydevice1/emeter/2/voltage", "5");
        client.publish("shellies/mydevice1/emeter/2/pf", "-0.01");
    }, 1000);
    setInterval(() => {
        client.publish("shellies/mydevice2/emeter/0/current", "2");
        client.publish("shellies/mydevice2/emeter/0/voltage", "5");
        client.publish("shellies/mydevice2/emeter/0/pf", "-0.01");
        client.publish("shellies/mydevice2/emeter/1/current", "2");
        client.publish("shellies/mydevice2/emeter/1/voltage", "5");
        client.publish("shellies/mydevice2/emeter/1/pf", "-0.01");
        client.publish("shellies/mydevice2/emeter/2/current", "2");
        client.publish("shellies/mydevice2/emeter/2/voltage", "5");
        client.publish("shellies/mydevice2/emeter/2/pf", "-0.01");
    }, 1200)
}

main()