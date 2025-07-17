module.exports.config = {
    name: "sendnoti",
    version: "1.0.0",
    hasPermssion: 2, // Admins only
    credits: "vern",
    description: "Sends a message to all groups.",
    usePrefix: true,
    commandCategory: "noti",
    usages: "[Text]",
    cooldowns: 5
};

module.exports.run = async ({ api, event, args }) => {
    const threadList = await api.getThreadList(25, null, ['INBOX']);
    let sentCount = 0;
    const custom = args.join(' ');

    async function sendMessage(thread) {
        try {
            await api.sendMessage(
                `𝙉𝙊𝙏𝙄𝘾𝙀 𝙁𝙍𝙊𝙈 𝘿𝙀𝙑𝙀𝙇𝙊𝙋𝙀𝙍\n----------------\n𝗔𝗗𝗠𝗜𝗡 𝗕𝗢𝗧 𝗠𝗘𝗦𝗦𝗔𝗚𝗘\n---------------\n\n『🇲🇨𝗡𝗼𝘁𝗶𝗰𝗲🇵🇭』 "${custom}"`,
                thread.threadID
            );
            sentCount++;
        } catch (error) {
            console.error("Error sending a message:", error);
        }
    }

    for (const thread of threadList) {
        if (sentCount >= 20) break;
        if (thread.isGroup && thread.name != thread.threadID && thread.threadID != event.threadID) {
            await sendMessage(thread);
        }
    }

    if (sentCount > 0) {
        api.sendMessage(`› Sent the notification successfully to ${sentCount} group(s).`, event.threadID);
    } else {
        api.sendMessage("› No eligible group threads found to send the message to.", event.threadID);
    }
};
