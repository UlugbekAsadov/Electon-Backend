
// import { Vonage } from "@vonage/server-sdk"

// const vonage = new Vonage({
//   apiKey: '98e12f3b',
//   apiSecret: "OtdSM6iJsE5mSXuK"
// })
// const from = "Vonage APIs"
// const to = "998939225885"
// const text = 'A text message sent using the Vonage SMS API'

// async function sendSMS() {
//     await vonage.sms.send({to, from, text})
//         .then(resp => { console.log('Message sent successfully'); console.log(resp); })
//         .catch(err => { console.log('There was an error sending the messages.'); console.error(err); });
// }

// sendSMS();

import jwt from "jsonwebtoken"

const secretKey = 'sizning_xavfsizlik_kalitingiz';

const payload = {
  username: 'foydalanuvchi',
  exp: Math.floor(Date.now() / 1000) + (60 * 60) // Token amal qilish muddati: 1 soat
};

const token = jwt.sign(payload, secretKey);
console.log(token);