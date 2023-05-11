import { DynamoDBClient, ScanCommand, QueryCommand } from "@aws-sdk/client-dynamodb";

const REGION = "ap-southeast-2";
const TABLE_NAME = "LsvQuestionAnswer";

// Export the handler
export const handler = async (event) => {
  console.log(event);
  const client = new DynamoDBClient({ region: REGION });
  // try {
  //   // set up the parameters for the scan command
  //   const params = {
  //     TableName: TABLE_NAME,
  //   };
  //   // retrieve all data using the scan command
  //   const results = await client.send(new ScanCommand(params));
  //   // access the data from the response object
  //   console.log("Items:", results.Items);

  //   const formattedResults = results.Items.map((item) => {
  //     const formattedItem = {};
  //     for (const [key, value] of Object.entries(item)) {
  //       formattedItem[key] = Object.values(value)[0];
  //     }
  //     return formattedItem;
  //   });

  //   return { statusCode: 200, body: JSON.stringify(formattedResults) };
  // } catch (err) {
  //   console.log("Auth Details:", err);
  //   return { statusCode: 500, body: "Error getting items" };
  // }



    const params = {
    TableName: TABLE_NAME,
    KeyConditionExpression: "pk = :pk",
    ExpressionAttributeValues: {
      ":pk": { S: "questionId" },
    },
    IndexName: "id-index",
    ScanIndexForward: true,
  };

  try {
    const command = new QueryCommand(params);
    const results = await client.send(command);

    const formattedResults = results.Items.map((item) => {
      const formattedItem = {};
      for (const [key, value] of Object.entries(item)) {
        formattedItem[key] = Object.values(value)[0];
      }
      return formattedItem;
    });

    const orderedResults = formattedResults.sort((a, b) => a.id - b.id);

    console.log("Ordered items:", orderedResults);
    return { statusCode: 200, body: JSON.stringify(orderedResults) };
  } catch (error) {
    console.error("Error retrieving items:", error);
   return { statusCode: 500, body: "Error getting items" };

  }

};
