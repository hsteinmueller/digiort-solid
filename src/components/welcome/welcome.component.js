import React, { Fragment } from "react";
// import { Redirect } from "react-router-dom";
// import { withWebId } from "@inrupt/solid-react-components";
import NavBar from "../nav-bar";
import FileUploader from "../fileuploader";
import UserdataForm from "../userdataform";
import { createDocumentWithTurtle } from "../../utils/ldflex";
import { getAppStorage } from "../../utils/storage";

const WelcomeComponent = (props) => {
  const { webId } = props;

  const createFile = async (values) => {
    console.log(values);
    console.log("TODO: create file");
    const fileContent = "";

    await uploadFile(fileContent);
  };

  const uploadFile = async (fileContent) => {
    const appUrl = await getAppStorage(webId);
    const filePath = `${appUrl + "data.ttl"}`;
    const res = await createDocumentWithTurtle(filePath, fileContent);
    console.log(res);
  };

  return (
    <Fragment>
      <NavBar webId={webId} />
      {/* <FileUploader onLoad={handleFileContent} /> */}
      <div className="container">
        <UserdataForm onSubmit={createFile} />
      </div>
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
