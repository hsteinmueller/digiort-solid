/*
  try to use solid-node-client instead:
    - used lexactly like the doumentation says: https://github.com/solid/solid-node-client#using-with-solid-file-client
    - can login, but file-client throws an error: 'Cannnot read property 'map' of null'
*/

const SolidFileClient = require("solid-file-client");
const { SolidNodeClient } = require("solid-node-client");
const auth = new SolidNodeClient();

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
    if (session.isLoggedIn) {
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
