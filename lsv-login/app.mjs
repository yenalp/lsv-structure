import { CognitoIdentityProviderClient, AdminInitiateAuthCommand, GetUserCommand } from "@aws-sdk/client-cognito-identity-provider";

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

  console.log(payLoad);
  const email = payLoad["login_email_field"];
  const password = payLoad["login_password_field"];

  const paramsAuth = {
    AuthFlow: "ADMIN_NO_SRP_AUTH",
    UserPoolId: userPoolId,
    ClientId: clientId,
    AuthParameters: {
      USERNAME: email,
      PASSWORD: password
    },
  };

  try {
    const responseAuth = await client.send(new AdminInitiateAuthCommand(paramsAuth));

    const accessToken = responseAuth["AuthenticationResult"]["AccessToken"];
    const idToken = responseAuth["AuthenticationResult"]["IdToken"];
    const refreshToken = responseAuth["AuthenticationResult"]["RefreshToken"];
    let fullName = "";
    let uid = "";

    try {

      const getUserInput = { // GetUserRequest
        AccessToken: accessToken, // required
      };
      const getUserResponse = await client.send(new GetUserCommand(getUserInput));

      getUserResponse["UserAttributes"].forEach((element) => {
        if (element["Name"] == "custom:full_name") {
          fullName = element["Value"];
        } else if (element["Name"] == "custom:uid") {
          uid = element.Value;
        }

      });


      const body = {
        "full_name" : fullName,
        "email": email,
        "access_token" : accessToken,
        "refresh_token": refreshToken,
        "id_token": idToken,
        "uid": uid
      };
      console.log("Auth Details:", body);
      return { statusCode: 200, body: JSON.stringify(body) };

    } catch (err) {
      console.log("Auth Details:", err);
      return { statusCode: 500, body: "Error Signing up" };
    }

  } catch (error) {
    console.log("Auth Details:", error);
    return { statusCode: 500, body: "Error Signing up" };
  }
};
