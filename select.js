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
  let params = {
    TableName: tableName,
    Key: {
      "todo_id": "1"
    }
  };
  
  // docClient.get(params, (err, data) => {
  //   if (err) {
  //     console.log(err);
  //     context.succeed();
  //     return err;
  //   } else {
  //     console.log(data);
  //     callback(null, data.Item);
  //     context.succeed();
  //   }
  // });
  
  var param2 = {
    TableName: tableName
  }
  docClient.scan(param2, (err, data) => {
    if (err) {
      console.log(err);
      context.succeed();
      return err;
    } else {
      console.log(data);
      callback(null, data.Items);
      context.succeed();
    }
  });
};


