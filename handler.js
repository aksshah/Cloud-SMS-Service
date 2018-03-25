'use strict';
const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;
const receiver_no = process.env.RECEIVER_NO;
const AWS = require('aws-sdk'); 
const uuid = require('uuid');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const s3 = new AWS.S3();
const twilio = require('twilio');
const client = new twilio(twilioAccountSid, twilioAuthToken);


module.exports.Add = (event, context, callback) => {
  event.Records.forEach((record) => {
    let name = record.s3.object.key;
    let action = record.eventName
    let date = record.eventTime

    let params = {
      TableName: 'dropboxingrape',
      Item: {
        Id: uuid.v1(),
        Name: name,
        Action: action,
        Date: date
      }
    }

    dynamoDb.put(params, (err, result) => {
      if (err) {
        console.log(err);
        return;
      }
    })

    client.messages.create(
      {
        to: receiver_no,
        from: twilioPhoneNumber,
        body: 'the new file named "' + name + '" was added to your S3 bucket'
      },
      (err, message) => {
        console.log(message);
      }
    )

});
};


module.exports.Remove = (event, context, callback) => {
    event.Records.forEach((record) => {
      let name = record.s3.object.key;
      let action = record.eventName
      let date = record.eventTime
  
      let params = {
        TableName: 'dropboxingrape',
        Item: {
          Id: uuid.v1(),
          Name: name,
          Action: action,
          Date: date
        }
      }
  
      dynamoDb.put(params, (err, result) => {
        if (err) {
          console.log(err);
          return;
        }
      })
  
  });
  };


