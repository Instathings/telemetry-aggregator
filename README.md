# Telemetry Aggregator

The project implements some logic to allow data gathering from iot devices that send read parameters (like temperatures) separately for each message

Shelly devices tipically send multiple message in a single bulk for each parameter with the following format:

```
$ mosquitto_sub -t 'shellies/#' -v

shellies/mydevice2/emeter/0/current 2
shellies/mydevice2/emeter/0/voltage 5
shellies/mydevice2/emeter/0/pf -0.01
```

Some iot devices instead would send tipically a single message with multiple parameters to a different topic and with a json format like this:

```json
topic: emeter/mydevice2/0
{
    "current": 2,
    "voltage": 5,
    "pf": -0.01
}
```

The aggregator knows what parameters to expect and incrementally fills out a memory object for each device until all parameters are received. After that writes a single historical record for the telemetry to a mongodb broker.

Eventually the historical data is processed and aggregated to be sent to a dynamo database.

## Requirements

- nodejs v16+
- yarn 1.22.18+
- docker 18+ (only for containerized installation)
- docker-compose 1.29.2+ (optional for containerized installation)

## Environment variables
```env
TELEMETRY_COLLECTION=mytelemetryCollection
MONGO_CONNECTION_URI=mongodb://user:pass@serverAddress/mytelemetryCollection?authSource=admin
BROKER_CONNECTION_URI=mqtt://brokerUrl
```

## Run without docker
Install node modules and provide the environment variables before the yarn run command
```bash
yarn install
yarn build
ENV1=<value> yarn run
```

## Run with docker
Provide the environment variables to the container and use the provided Dockergile to build your container.

The repository contains an example `docker-compose.yaml` file that runs a local broker and mongo database along with the telemetry aggregator.

Compile the docker image with the following command

```bash
docker build -t telemetry-aggregator .
```

And run with the following command
```bash
docker run -d -e ENV=value telemetry-aggregator
```

### Docker compose

If you want to use the docker compose file in this repository, create the `.env` files referenced by `docker-compose.yaml`

```bash
touch telemetry.env mongo.env
```

and write the environment variables in those files.


Enjoy!