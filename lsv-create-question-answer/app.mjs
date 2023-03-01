import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";

const REGION = "ap-southesast-2";
const TABLE_NAME = "LsvQuestionAnswer";

// Export the handler
export const handler = async (event) => {
  console.log(event);

  const client = new DynamoDBClient({ region: REGION });
  const params = {
    TableName: TABLE_NAME,
    Item: {
      id: { S: "123" },
      name: { S: "John Doe" },
      age: { N: "30" },
      email: { S: "john.doe@example.com" },
    },
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
