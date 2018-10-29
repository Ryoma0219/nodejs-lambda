'use strict';

const aws = require('aws-sdk');
const docClient = new aws.DynamoDB.DocumentClient({ region: 'ap-northeast-1'});

const tableName = 'todo';

const createErrorResponse = (status, message) => {
  return {
    "statuscode": status,
    "message": message
  };
};

exports.handler = (event, context, callback) => {
  console.log(event.queryString)
  var param2 = {
    TableName: tableName,
    Key: {
      "todo_id": event.queryString.todo_id
    }
  }
  docClient.delete(param2, (err, data) => {
    if (err) {
      console.log(err);
      context.succeed();
      return err;
    } else {
      console.log(data);
      callback(null,event);
      context.succeed();
    }
  });
};


