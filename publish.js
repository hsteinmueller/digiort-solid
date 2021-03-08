/*
  this script is used to upload all the files from the 'build' folder to the specified folder in the specified pod
  you must enter your username and password
*/

const SolidFileClient = require("solid-file-client");
const auth = require("solid-auth-cli");

const fc = new SolidFileClient(auth);
const { MERGE } = SolidFileClient;

const source = `file:///${__dirname}/build/`;
const target = "https://harrystminrupt.inrupt.net/public/apps/website3/";

const getLoginSettings = () => {
  if (!process.env.pod_username) {
    throw new Error("pod_username environment variable not set");
  }
  if (!process.env.pod_password) {
    throw new Error("pod_password environment variable not set");
  }
  return {
    idp: "https://inrupt.net",
    username: process.env.pod_username,
    password: process.env.pod_password,
  };
};

async function main() {
  try {
    let session = await auth.login(getLoginSettings());
    if (session) {
      console.log(`Logged in as <${session.webId}>`);
      let res = await fc.copyFolder(source, target, {
        merge: MERGE.KEEP_SOURCE,
      });
      console.log(res);
    }
  } catch (err) {
    console.log(err);
  }
}
main();
