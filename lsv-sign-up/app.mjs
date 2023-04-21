import { CognitoIdentityProviderClient, SignUpCommand } from "@aws-sdk/client-cognito-identity-provider";

// Set the AWS region
const region = 'ap-southeast-2';
const userPoolId = 'ap-southeast-2_OTygxTTfD'
const clientId = 'kd6r7hdl67ds3fevm7rfc1h5b';  

// Export the handler
export const handler = async (event) => {
  console.log(event);

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const name = document.getElementById('name').value;
  // Define the user attributes
  const params = {
    ClientId: clientId,
    Username: email,
    Password: password,
    UserAttributes: [
      {
        Name: "email",
        Value: email,
      },
      {
        Name: "name",
        Value: name,
      }
    ],
  };

  // Call the SignUp method to create the user
  const signUpCommand = new SignUpCommand(params);

  try {
    const response = await client.send(signUpCommand);
    console.log("Sign up successfully:", data);
    return { statusCode: 200, body: "Sign up successfully" };
    console.log(response);
  } catch (error) {
    console.error("Error Signing up:", error);
    return { statusCode: 500, body: "Error Signing up" };
  }







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
