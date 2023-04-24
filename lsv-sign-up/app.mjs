import { CognitoIdentityProviderClient, SignUpCommand,  AdminInitiateAuthCommand } from "@aws-sdk/client-cognito-identity-provider";

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

  let uid = '';
  const length = 32;
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    uid += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

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
        Name: "custom:full_name",
        Value: name,
      },
      {
        Name: "custom:uid",
        Value: uid,
      }
    ],
  };

  // Call the SignUp method to create the user
  const signUpCommand = new SignUpCommand(params);

  try {
    const response = await client.send(signUpCommand);
    const userSub = response["UserSub"];

    const params = {
      AuthFlow: "ADMIN_NO_SRP_AUTH",
      UserPoolId: userPoolId,
      ClientId: clientId,
      AuthParameters: {
        USERNAME: userSub,
      },
    };

    try {
      const responseAuth = await client.send(new AdminInitiateAuthCommand(params));
      // return response.AuthenticationResult;


      console.log("Sign up successfully:", response);
      console.log("Auth Details:", responseAuth);
      console.log("Auth Details - 2 :", responseAuth["AuthenticationResult"]);
      return { statusCode: 200, body: response };



    } catch (error) {
      console.error(error);
      console.error("Auth Details Error:", error);
      return { statusCode: 500, body: "Error Signing up" };
    }

  } catch (error) {
    console.error("Error Signing up:", error);
    return { statusCode: 500, body: "Error Signing up" };
  }
};
