import { CognitoIdentityProviderClient, SignUpCommand } from "@aws-sdk/client-cognito-identity-provider";

// Set the AWS region
const region = 'ap-southeast-2';
const userPoolId = 'ap-southeast-2_JooVrMDto'
const clientId = 'hsrgcarl1k9t7jrujdg9v61jj';  

// Export the handler
export const handler = async (event) => {
  console.log(event);

  const client = new CognitoIdentityProviderClient({
    region: region
  });

  console.log(JSON.parse(event.body));

  const payLoad = JSON.parse(event.body);
  const email = payLoad["email"];
  const password = payLoad["password"];
  const name = payLoad["name"];
  // Define the user attributes
  const params = {
    ClientId: clientId,
    Username: email,
    Password: password,
    UserAttributes: [
      {
        Name: "email",
        Value: email,
      }
    ],
  };

  // Call the SignUp method to create the user
  const signUpCommand = new SignUpCommand(params);

  try {
    const response = await client.send(signUpCommand);
    console.log("Sign up successfully:", response);
    return { statusCode: 200, body: "Sign up successfully" };

  } catch (error) {
    console.error("Error Signing up:", error);
    return { statusCode: 500, body: "Error Signing up" };
  }
};
