import React, { Fragment } from "react";
import { useSession } from "@inrupt/solid-ui-react";
import NavBar from "../nav-bar";
import FileUploader from "../fileuploader";
import UserdataForm from "../userdataform";
import { createDocumentWithTurtle } from "../../utils/ldflex";
import { getAppStorage } from "../../utils/storage";

const WelcomeComponent = (props) => {
  const { session } = useSession();
  const { webId } = session.info;

  const createFile = async (values) => {
    console.log(values);
    console.log("TODO: create file");
    const fileContent = "";

    await uploadFile(fileContent);
  };

  const uploadFile = async (fileContent) => {
    const appUrl = await getAppStorage(webId);
    const filePath = `${appUrl + "data.ttl"}`;
    const res = await createDocumentWithTurtle(session.fetch, filePath, fileContent);
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

export default WelcomeComponent;
