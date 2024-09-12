const { kafka } = require("./client");
const readline = require('readline')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

async function init() {
    const producer = kafka.producer();
    console.log("Producer Connecting...");
    await producer.connect();
    console.log("Producer Connected...");

    rl.setPrompt('>')
    rl.prompt()

    rl.on('line', async function (line) {
        const [riderName, location] = line.split(' ')


        await producer.send({
            topic: "rider-updates",
            messages: [
                {
                    partition: location.toLowerCase() === "north" ? 0 : 1,
                    key: "location-update",
                    value: JSON.stringify({ name: riderName, location }),
                }
            ]
        })
        // console.log(`Sending message to partition ${location.toLowerCase() === "north" ? 0 : 1}`);

        rl.prompt()

    }).on('close', async () => {


        console.log("Producer Disonnecting...");
        await producer.disconnect();
        console.log("Producer Disonnected...");
    })
}

init()