exports.handler =  function(event, context, callback) {
  const token = event.headers?.authorization;
  let validToken = process.env['ACCESS_TOKEN'];


  if (token == `Basic ${validToken}`) {
    console.log("Authorized");
    callback(null, generatePolicy('user', 'Allow', event.routeArn));
  } else {
    console.log("Not Authorized");
    callback(null, generatePolicy('user', 'Deny', event.routeArn));
  }

};

// Function to generate iam policy to allow access
const generatePolicy = function(principalId, effect, resource) {
  var authResponse = {};

  authResponse.principalId = principalId;
  if (effect && resource) {
    var policyDocument = {};
    policyDocument.Version = '2012-10-17'; 
    policyDocument.Statement = [];
    var statementOne = {};
    statementOne.Action = 'execute-api:Invoke'; 
    statementOne.Effect = effect;
    statementOne.Resource = resource;
    policyDocument.Statement[0] = statementOne;
    authResponse.policyDocument = policyDocument;
  }
  return authResponse;
};
