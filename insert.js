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

// 入力値の定義
exports.handler = (event, context, callback) => {
  let body = event.body;
  let params = {
    TableName: tableName,
    Item: {
        "todo_id": event.body.todo_id,
        "content": event.body.content,
        "category_id": event.body.category_id,
        "expire_date": event.body.expire_date,
        "create_date": event.body.create_date,
        "sub_task_ids": event.body.sub_task_ids,
        "is_finished": event.body.is_finished,
        "title": event.body.title,
        "icon": event.body.icon
    }
  };
  
  // データの登録 or 更新
  // todo_id is exist ? insert : update
  docClient.put(params, (err, data) => {
    if (err) {
      console.log(err);
      context.succeed();
      return err;
    } else {
      console.log(data);
      callback(null, data);
      context.succeed();
    }
  });
};

