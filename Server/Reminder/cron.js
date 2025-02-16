import cron from "node-cron";
import sendMail from "./mailTo.js";

const getTodaysDocs = async (date) => {
    console.log("Fetching docs.... for...", date);
    const res = await fetch(`${process.env.PORT}/doc/todays/${date}`, {
        headers: { "Content-Type": "application/json" },
    });
    const data = await res.json()
    console.log("data", data);
    return data.todaysDocs;
};

getTodaysDocs(new Date().toISOString().split('T')[0])

const reminderSystem = () => {
    cron.schedule(`18 16 * * *`, async () => {
        const today = new Date().toISOString().split('T')[0]
        const docs = await getTodaysDocs(today);    
        //console.log(docs, today);
        console.log(`Fetching docs...., For ${docs.length} docs`);
        docs.forEach(doc => {
            console.log("doc", doc.user_name, doc.user_email);
            console.log("Sending email... to:", doc.user_email);
            sendMail(doc);
        });
    });
};

reminderSystem();