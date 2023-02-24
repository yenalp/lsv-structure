import {SFNClient, DescribeStateMachineCommand } from "@aws-sdk/client-sfn";
import{ yamlParse, yamlDump } from "yaml-cfn";

// Set the api github url
let gitBaseUrl = "https://api.github.com/repos";

// Github get Reuest
const gitGetRequest = async(repo, token, path) {
  const gitUrl = `${gitBaseUrl}/${repo}/${path}`;
  const headers = {
    'Authorization': 'Bearer ' + token,
    "Accept": "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28"
  };

  try {
    const response = await fetch(gitUrl, {
      headers: headers
    });

    const data = await response.json();
    const { status } = response;

    if (status !== 200) {
      console.log(data);
      return false;
    }
    return data;
  } catch (err) {
    console.log(err);
    return false;
  }
}

// Github Put/Post request
const gitPutPostRequest = async(repo, mehtod, body, path) {
  const gitUrl = `${gitBaseUrl}/${repo}/${path}`;
  const headers = {
    'Authorization': 'Bearer ' + token,
    "Accept": "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28"
  };

  try {
    const response = await fetch(gitUrl, {
      method: method,
      body: JSON.stringify(body),
      headers: headers
    });
    const data = await response.json();
    const { status } = response;

    if (status !== 201) {
      console.log(data);
      return false;
    }

    return data;

  } catch (err) {
    console.log(err);
    return false;
  }
}


// Git create new branc
// const gitCreateBranch = async(repo, branch, token, shaStr, branchName)=> {
//   // Get template from git hub
//   const gitUrl = `https://api.github.com/repos/${repo}/git/refs`;
//
//   let body = {
//     "ref":`refs/heads/${branchName}`,
//     "sha": shaStr
//   };
//
//   const headers = {
//     'Authorization': 'Bearer ' + token,
//     "Accept": "application/vnd.github+json",
//     "X-GitHub-Api-Version": "2022-11-28"
//   };
//
//   try {
//     const response = await fetch(gitUrl, {
//       method: 'post',
//       body: JSON.stringify(body),
//       headers: headers
//     });
//     const data = await response.json();
//     const { status } = response;
//
//     if (status !== 201) {
//       console.log(data);
//       return false;
//     }
//
//     return data;
//
//   } catch (err) {
//     console.log(err);
//     return false;
//   }
// };


// Git get Reference
// Git fetch
// const gitGetReference = async(repo, branch, token)=> {
//   const gitUrl = `https://api.github.com/repos/${repo}/git/ref/heads/${branch}`;
//
//   const headers = {
//     'Authorization': 'Bearer ' + token,
//     "Accept": "application/vnd.github+json",
//     "X-GitHub-Api-Version": "2022-11-28"
//   };
//
//   try {
//     const response = await fetch(gitUrl, {
//       headers: headers
//     });
//
//     const data = await response.json();
//     const { status } = response;
//
//     if (status !== 200) {
//       console.log(data);
//       return false;
//     }
//
//     return data;
//
//   } catch (err) {
//     console.log(err);
//     return false;
//   }
// };


// Git fetch
// const gitFetch = async(repo, branch, token, path)=> {
//   const gitUrl = `https://api.github.com/repos/${repo}/contents/${path}?ref=${branch}`;
//
//   const headers = {
//     'Authorization': 'Bearer ' + token,
//     "Accept": "application/vnd.github+json",
//     "X-GitHub-Api-Version": "2022-11-28"
//   };
//
//   try {
//     const response = await fetch(gitUrl, {
//       headers: headers
//     });
//
//     const data = await response.json();
//     const { status } = response;
//
//     if (status !== 200) {
//       console.log(data);
//       return false;
//     }
//     console.log(data);
//     const content = await Buffer.from(data.content, 'base64').toString();
//
//     return {
//       "content": content,
//       "sha" : data["sha"]
//     };
//   } catch (err) {
//     console.log(err);
//     return false;
//   }
// };

// Git put
// const gitPut = async(repo, branch, token, path, content, sha)=> {
//   // Get template from git hub
//   const gitUrl = `https://api.github.com/repos/${repo}/contents/${path}`;
//   content = JSON.stringify(content, null, 2);
//   const encodedStr = Buffer.from(content).toString('base64');
//
//   let body = {
//     "message":"Updated definitions",
//     "committer":{
//       "name":"Mo Definitions",
//       "email":"automator@movember.com"
//     },
//     "content": encodedStr,
//     "branch" : branch,
//     "sha" : sha
//   };
//
//   const headers = {
//     'Authorization': 'Bearer ' + token,
//     "Accept": "application/vnd.github+json",
//     "X-GitHub-Api-Version": "2022-11-28"
//   };
//
//   try {
//     const response = await fetch(gitUrl, {
//       method: 'put',
//       body: JSON.stringify(body),
//       headers: headers
//     });
//     const data = await response.json();
//     const { status } = response;
//
//     if (status !== 200) {
//       console.log(data);
//       return false;
//     }
//
//     return data;
//   } catch (err) {
//     console.log(err);
//     return false;
//   }
// };

// Git put
// const gitCreatePullRequest = async(repo, branch, token, featureBranch)=> {
//   // Get template from git hub
//   const gitUrl = `https://api.github.com/repos/${repo}/pulls`;
//
//   let body = {
//     "title":"Updated Step Function definitions",
//     "head" : featureBranch,
//     "base" : branch,
//     "maintainer_can_modify": true,
//     "body" : "Step Function Definition has been updated. Please review"
//   };
//
//   const headers = {
//     'Authorization': 'Bearer ' + token,
//     "Accept": "application/vnd.github+json",
//     "X-GitHub-Api-Version": "2022-11-28"
//   };
//
//   try {
//     const response = await fetch(gitUrl, {
//       method: 'POST',
//       body: JSON.stringify(body),
//       headers: headers
//     });
//     const data = await response.json();
//     const { status } = response;
//
//     if (status !== 201) {
//       console.log(data);
//       return false;
//     }
//
//     return data;
//   } catch (err) {
//     console.log(err);
//     return false;
//   }
// };

const searchAndReplace = (obj, targetValue, newValue) => {
  for (let prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      if (typeof obj[prop] === 'object') {
        searchAndReplace(obj[prop], targetValue, newValue); // recursive call for nested object
      } else if (obj[prop] === targetValue) {
        obj[prop] = newValue; // replace the target value
      }
    }
  }
};

// Export the handler
export const handler = async (event) => {

  console.log(event);

  // Set up some variables
  const stateMachineArn = event["detail"]["requestParameters"]["stateMachineArn"];
  const region = event["detail"]["awsRegion"];

  // Get latest statemachine details
  const clientStepFunction = new SFNClient({ region: region });
  const command = new DescribeStateMachineCommand({
    stateMachineArn: stateMachineArn,
  });

  // Send to clientStepFunction and wait response
  const response = await clientStepFunction.send(command);

  // Get the definition
  let definition = JSON.parse(response["definition"]);
  let newDefinition = definition;

  // Get template from git hub for the project you wan to changes and store the template
  const gitToken = "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";
  const repo = "Movember/mo-cms-stepfunctions";
  const branch = "uat";
  // const templatePath = "mo-template.yml";
  // Fetch mo-template from a branch
  const templateYamlDetails = await gitGetRequest(repo, gitToken, `contents/mo-template.yml?ref=${branch}`)
  const templateYamlContent = await Buffer.from(templateYamlDetails.content, 'base64').toString();  
  // const templateYamlDetails = await gitFetch(repo, branch, gitToken, templatePath);

  // Get branch details
  const uatBranchDetails = await gitGetRequest(repo, gitToken, `git/ref/heads/${branch}`) 

  // const uatBranch =  await gitGetReference(repo, branch, gitToken);
  const timestamp = Date.now();
  const newBranchName = `feature/definition-${timestamp}`;

  // Create the new branch to push the changes too.
  let newBranchBody = {
    "ref":`refs/heads/${newBranchName}`,
    "sha": uatBranchDetails["object"]["sha"]
  };
  const newBranchDetails = await gitPutPostRequest(repo, "POST", newBranchBody, "git/ref")
  // const newBranch = await gitCreateBranch(repo, branch, gitToken, uatBranchDetails["object"]["sha"], newBranchName);

  // Transform yml template to object
  if (templateYamlDetails) {
    try {
      // const template = yaml.safeLoad(templateYaml, { schema: schema });
      //const template = yamlParse(templateYamlDetails["content"]);
      const template = yamlParse(templateYamlContent);
      const constants =  template["Mappings"]["Constants"];
      for (let [key, value] of Object.entries(constants)) {
        const search = value["UAT"];
        const replace = `[[${key}]]`;

        if (typeof search !== "undefined") {
          searchAndReplace(newDefinition, search, replace);
        }
      }

      // Need to get the file sha that we are going to replace
      const definitionPath = "step-functions/MoCmsStepFunction.asl.json";
      // const definintionGitDetail = await  gitFetch(repo, branch, gitToken, definitionPath);
      const definintionGitDetail = await gitGetRequest(repo, gitToken, `contents/${definitionPath}?ref=${branch}`)
      const contentSha = definintionGitDetail["sha"];
      // Git put
      content = JSON.stringify(newDefinition, null, 2);
      const encodedContent = Buffer.from(content).toString('base64');

      let commitBody = {
        "message":"Updated definitions",
        "committer":{
          "name":"Mo Definitions",
          "email":"automator@movember.com"
        },
        "content": encodedContent,
        "branch" : branch,
        "sha" : contentSha
      };
      const commitDetails = await gitPutPostRequest(repo, "PUT", commitBody, "git/ref")
      // const commit = await gitPut(repo, newBranchName, gitToken, definitionPath, newDefinition, contentSha);
      let pullRequestBody = {
        "title":"Updated Step Function definitions",
        "head" : newBranchName,
        "base" : branch,
        "maintainer_can_modify": true,
        "body" : "Step Function Definition has been updated. Please review"
      };
      const pullRequestDetails = await gitPutPostRequest(repo, "POST", pullRequestBody, "pulls")
      //const pullRequest = await gitCreatePullRequest(repo, branch, gitToken, newBranchName)

    } catch (e) {
      console.log(e);
    }
  }
};
