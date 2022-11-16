require("dotenv").config();

const accountSid = "AC1c15dbccc6e50f1d721e06ffb4bd4b12";
const authToken = "9b77bd9356a65a0e1c99a45780358c1d";

const sendSms = async (phone, message) => {
  let result;
  const client = require("twilio")(accountSid, authToken);
  const phoneNo = "+14322397382";
  await client.messages
    .create({
      body: message,
      from: phoneNo,
      to: phone,
    })
    .then((message) => {
      result = message;
      console.log(result);
    })

    .catch((error) => {
      result = error;
      console.log(result);
    });

  if (result.status == "queued") {
    let verify = {
      success: true,
      message: "Message has been delivered",
    };
    return verify;
  }
  else{
    let verify = {
      success: false,
      message: "Plz  specify verified number",
    };
    return verify;
  }
};

module.exports = sendSms;
