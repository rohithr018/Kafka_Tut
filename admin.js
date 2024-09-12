const { kafka } = require("./client");

async function init() {
    const admin = kafka.admin();
    console.log("Admin connecting...");
    await admin.connect();
    console.log("Admin Connected...");

    console.log("creating Topic [rider-updates]");
    await admin.createTopics({
        topics: [
            {
                topic: "rider-updates",
                numPartitions: 2,
            },
        ],
    })
    console.log("Created Topic [rider-updates]");
    console.log("Admin Disconnecting...");
    await admin.disconnect();
    console.log("Admin Disconnected...");
}

init()