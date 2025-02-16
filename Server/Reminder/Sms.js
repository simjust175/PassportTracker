import twilio from 'twilio';
import { config } from 'dotenv';
config();

const sendSms = async(info)=>{
    const client = new twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);
    return client.messages
    .create({
        body: `The ${info.type} of ${info.user_name} is set to expire soon`,
        from: process.env.TWILIO_NUMBER,
        to: info.user_phone
    })
    .then(message => console.log('Message sent', message))
    .catch(err=> console.log("Error", err))
}

const info = {
    id: 15,
    user_email: 'bunim175@gmail.com',
    user_phone: '+3249108666',
    user: 1,
    user_name: 'simcha justman',
    type: 'I.D. card',
    country: 'Belgium',
    state: null,
    six_months: 0,
    reminder_period: 'Week in advance',
    deleted_at: null
  }

  sendSms(info)