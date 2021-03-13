import { useState, useEffect, useMemo } from "react";
import SolidFileClient from "solid-file-client";
import { getAppStorage } from "../utils/storage";

export const useFiles = (session) => {
  const { webId } = session.info;

  const fileClient = useMemo(() => new SolidFileClient(session), [session]);
  const [files, setFiles] = useState([]);

  useEffect(() => {
    (async () => {
      const appUrl = await getAppStorage(webId);
      const folderData = await fileClient.readFolder(appUrl); // more options possible here
      setFiles(folderData.files);
    })();
  }, [webId, fileClient]);

  return files;
};
