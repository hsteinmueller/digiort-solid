import React, { Fragment } from "react";
// import { Redirect } from "react-router-dom";
// import { withWebId } from "@inrupt/solid-react-components";
import NavBar from "../nav-bar";
import FileUploader from "../fileuploader";
import UserdataForm from "../userdataform";
import { createDocumentWithTurtle } from "../utils/ldflex";
import { getAppStorage } from "../utils/storage";

const WelcomeComponent = (props) => {
  const { webId } = props;

  const handleFileContent = async (filename, fileContent) => {
    // const data = await fetch("observation-example-vitals-panel.ttl");
    // const ttl = await data.text();
    const ttl = fileContent;

    // await storageHelper.createInitialFiles(webId);
    const appUrl = await getAppStorage(webId);
    const filePath = `${appUrl + filename}`;
    const res = await createDocumentWithTurtle(filePath, ttl);
    console.log(res);
    // can also use ldflex-here
  };

  const uploadFile = async (values) => {
    console.log(values);
    console.log("TODO: upload file");
  };

  return (
    <Fragment>
      <NavBar {...webId} />
      {/* <FileUploader onLoad={handleFileContent} /> */}
      <UserdataForm onSubmit={uploadFile} />
    </Fragment>
  );
};

// this is the fix for HashRouter, copied from source
// const withAuthorization = (Component, Loader) =>
//   withWebId(
//     class WithAuthorization extends React.Component {
//       render() {
//         const { webId } = this.props;
//         switch (webId) {
//           case undefined:
//             return Loader || null;
//           case null:
//             // Using the non-SPA redirect here to clear the state when the user is not logged in
//             // This helps with making sure state is fully clean on login, and addresses an issue with
//             // the react-router-dom v5 upgrade, which didn't like using <Redirect> here
//             // window.location.href = "/#/login"; // <= this is the fix

//             // window.location = getLocation(window.location.href, "/#/login");
//             // return null;

//             return <Redirect to="/login" />;
//           default:
//             return <Component {...this.props} />;
//         }
//       }
//     }
//   );

// export default withAuthorization(WelcomeComponent);
export default WelcomeComponent;
