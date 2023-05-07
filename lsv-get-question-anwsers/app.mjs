import { DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb";

const REGION = "ap-southeast-2";
const TABLE_NAME = "LsvQuestionAnswer";

// Export the handler
export const handler = async (event) => {
  console.log(event);
  const client = new DynamoDBClient({ region: REGION });
  try {
    // set up the parameters for the scan command
    const params = {
      TableName: TABLE_NAME,
    };
    // retrieve all data using the scan command
    const response = await client.send(new ScanCommand(params));
    // access the data from the response object
    console.log("Items:", response.Items);
    return { statusCode: 200, body: JSON.stringify(response.Items) };
  } catch (err) {
    console.log("Auth Details:", err);
    return { statusCode: 500, body: "Error getting items" };
  }
};
