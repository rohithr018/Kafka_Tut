const { kafka } = require("./client");
const group = process.argv[2];

async function init() {
    // const groupId = group;
    const consumer = kafka.consumer({ groupId: group });

    console.log("Consumer Connecting...");
    await consumer.connect();
    console.log("Consumer Connected...");

    await consumer.subscribe({ topics: ["rider-updates"] });


    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            console.log(`${group}: [${topic}]: PART:${partition}:`, message.value.toString());
            //console.log(topic);
        },
    });
}

init();
