const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./html/index.html"));
});

app.post("/myform", (req, res) => {
  require("dotenv").config();
  const accountSid = process.env.ACCOUNT_SID;
  const authToken = process.env.AUTH_TOKEN;
  const client = require("twilio")(accountSid, authToken);

  const sms = req.body.msg;
  const mnumber = req.body.mnumber;

  client.messages
    .create({
      body: `${sms}`,
      from: "(224) 257-3367 ",
      to: `+91${mnumber} `,
    })
    .then((message) =>
      console.log("message send Succesfully......" + message.sid)
    );
  res.sendFile(path.join(__dirname, "./html/index.html"));
  res.send("Message Send Succefully...");
});

app.listen(port, () =>
  console.log(`Example app listening http://localhost:${port}/ `)
);
