'use strict';
const AWS = require('aws-sdk'); 
const uuid = require('uuid');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const s3 = new AWS.S3();

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