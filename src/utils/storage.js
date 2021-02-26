import data from "@solid/query-ldflex";
import { AccessControlList } from "@inrupt/solid-react-components";
import { resourceExists, createDoc, createDocument } from "./ldflex";
import { checkSpecificAppPermission } from "./permissions";

const appPath = process.env.REACT_APP_STORAGE_PATH;

/**
 * Creates a valid string that represents the application path. This is the
 * default value if no storage predicate is discovered
 * @param webId
 * @param path
 * @returns {*}
 */
export const buildPathFromWebId = (webId, path) => {
  if (!webId) return false;
  const domain = new URL(typeof webId === "object" ? webId.webId : webId)
    .origin;
  return `${domain}/${path}`;
};

/**
 * Helper function to check for the user's pod storage value. If it doesn't exist, we assume root of the pod
 * @returns {Promise<string>}
 */
export const getAppStorage = async (webId) => {
  const podStoragePath = await data[webId].storage;
  let podStoragePathValue =
    podStoragePath && podStoragePath.value.trim().length > 0
      ? podStoragePath.value
      : "";

  // Make sure that the path ends in a / so it is recognized as a folder path
  if (podStoragePathValue && !podStoragePathValue.endsWith("/")) {
    podStoragePathValue = `${podStoragePathValue}/`;
  }

  // If there is no storage value from the pod, use webId as the backup, and append the application path from env
  if (!podStoragePathValue || podStoragePathValue.trim().length === 0) {
    return buildPathFromWebId(webId, appPath);
  }

  return `${podStoragePathValue}${appPath}`;
};

/**
 *  Check and create the initial app files and folders
 * @param folderPath
 * @returns {Promise<boolean>} Returns whether or not there were any errors during the creation process
 */
export const createInitialFiles = async (webId) => {
  try {
    // First, check if we have WRITE permission for the app
    const hasWritePermission = await checkSpecificAppPermission(
      webId,
      AccessControlList.MODES.WRITE
    );

    // If we do not have Write permission, there's nothing we can do here
    if (!hasWritePermission) return;

    // Get the default app storage location from the user's pod and append our path to it
    const appUrl = await getAppStorage(webId);

    // Set up various paths relative to the app URL
    const dataFilePath = `${appUrl}data.ttl`;
    const settingsFilePath = `${appUrl}settings.ttl`;

    // Check if the digiort folder exists, if not then create it. This is where app files, the app inbox, and settings files are created by default
    const appFolderExists = await resourceExists(appUrl);
    if (!appFolderExists) {
      await createDoc(data, {
        method: "PUT",
        headers: {
          "Content-Type": "text/turtle",
        },
      });
    }

    // Check if data file exists, if not then create it. This file holds links to other people's apps
    const dataFileExists = await resourceExists(dataFilePath);
    if (!dataFileExists) {
      await createDocument(dataFilePath);
    }

    // Check if the settings file exists, if not then create it. This file is for general settings including the link to the app-specific inbox
    const settingsFileExists = await resourceExists(settingsFilePath);
    if (!settingsFileExists) {
      await createDocument(settingsFilePath);
    }

    return true;
  } catch (error) {
    console.log(error.message, "Error");
    return false;
  }
};

export const checkAndInitializeInbox = async () => "";
