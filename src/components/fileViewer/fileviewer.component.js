import { useEffect, useState } from "react";
import { useSession } from "@inrupt/solid-ui-react";
import { getAppStorage } from "../../utils/storage";
import { useFiles } from "../../hooks/useFiles";

// this might work too, need to test
import data from "@solid/query-ldflex";

export const FileViewer = () => {
  const { session } = useSession();
  const { webId } = session.info;

  const [appUrl, setappUrl] = useState("");
  const files = useFiles(session);

  useEffect(() => {
    (async () => {
      const appUrl = await getAppStorage(webId);
      setappUrl(appUrl);
    })();
  }, [webId]);

  return (
    <div className="content">
      <p>
        Files in <a href={appUrl}>{appUrl}</a>:
      </p>
      <ul style={{ listStyleType: "none" }}>
        {files.map((file, index) => (
          <li key={index}>
            <a href={file.url}>{file.name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};
