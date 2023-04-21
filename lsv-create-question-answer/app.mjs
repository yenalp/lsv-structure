import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";

const REGION = "ap-southeast-2";
const TABLE_NAME = "LsvQuestionAnswer";

// Export the handler
export const handler = async (event) => {
  console.log(event);

  const client = new DynamoDBClient({ region: REGION });
  const params = {
    TableName: TABLE_NAME,
    Item: {
      "questionId" : {S:"123"},
      "question" : {S: "this is a question"},
      "correctAnswer" : {S : "3"},
      "media": {S : "https://somepath" },
      "answers" : {M : 
        {
          1 : { S: "Answer One"} ,
          2 : { S:  "Answer Two"},
          3 : { S:  "Answer Three"},
          4 : { S:  "Answer Four"},
          5 : { S:  "Answer Five"},
        }
      }
    }
  };

  const command = new PutItemCommand(params);

  try {
    const data = await client.send(command);
    console.log("Item inserted successfully:", data);
    return { statusCode: 200, body: "Item inserted successfully" };
  } catch (error) {
    console.error("Error inserting item:", error);
    return { statusCode: 500, body: "Error inserting item" };
  }
};
