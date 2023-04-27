import { CognitoIdentityProviderClient, AdminInitiateAuthCommand } from "@aws-sdk/client-cognito-identity-provider";

// Set the AWS region
const region = 'ap-southeast-2';
const userPoolId = 'ap-southeast-2_JooVrMDto'
const clientId = 'hsrgcarl1k9t7jrujdg9v61jj';

// Export the handler
export const handler = async (event) => {

  const client = new CognitoIdentityProviderClient({
    region: region
  });

  const payLoad = JSON.parse(event.body);
  const email = payLoad["email"];
  const password = payLoad["password"];
  const paramsAuth = {
    AuthFlow: "ADMIN_USER_PASSWORD_AUTH",
    UserPoolId: userPoolId,
    ClientId: clientId,
    AuthParameters: {
      USERNAME: email,
      PASSWORD: password
    },
  };
  try {
    const responseAuth = await client.send(new AdminInitiateAuthCommand(paramsAuth));
    const body = {
      "full_name" : name,
      "email": email,
      "access_token" : responseAuth["AuthenticationResult"]["AccessToken"],
      "refresh_token": responseAuth["AuthenticationResult"]["RefreshToken"],
      "id_token": responseAuth["AuthenticationResult"]["IdToken"]
      // "uid": uid
    };
    console.log("Auth Details:", body);
    return { statusCode: 200, body: JSON.stringify(body) };

  } catch (error) {
    console.log("Auth Details:", error);
    return { statusCode: 500, body: "Error Signing up" };
  }
};
