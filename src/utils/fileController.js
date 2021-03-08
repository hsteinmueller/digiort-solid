import ldflex from "@solid/query-ldflex";

export const documentExists = async (fetch, documentUri) =>
  fetch(documentUri, {
    headers: {
      "Content-Type": "text/turtle",
    },
  });

export const createDoc = async (fetch, documentUri, options) => {
  try {
    return await fetch(documentUri, options);
  } catch (e) {
    throw e;
  }
};

export const deleteFile = async (fetch, url) => {
  try {
    return await fetch(url, { method: "DELETE" });
  } catch (e) {
    throw e;
  }
};

export const createDocument = async (fetch, documentUri, body = "") => {
  try {
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "text/turtle",
      },
      body,
    };
    return await createDoc(fetch, documentUri, options);
  } catch (e) {
    throw e;
  }
};

export const createDocumentWithTurtle = async (
  fetch,
  documentUri,
  body = ""
) => {
  try {
    return createDoc(fetch, documentUri, {
      method: "PUT",
      headers: {
        "Content-Type": "text/turtle",
      },
      body,
    });
  } catch (e) {
    throw e;
  }
};

export const createNonExistentDocument = async (
  fetch,
  documentUri,
  body = ""
) => {
  try {
    const result = await documentExists(fetch, documentUri);

    return result.status === 404
      ? createDocument(fetch, documentUri, body)
      : null;
  } catch (e) {
    throw e;
  }
};

export const fetchLdflexDocument = async (fetch, documentUri) => {
  try {
    const result = await documentExists(fetch, documentUri);
    if (result.status === 404) return null;
    const document = await ldflex[documentUri];
    return document;
  } catch (e) {
    throw e;
  }
};

export const resourceExists = async (fetch, resourcePath) => {
  try {
    const result = await fetch(resourcePath);
    return result.status === 403 || result.status === 200;
  } catch (e) {
    console.log(e.message, "Error");
  }
};

export const discoverInbox = async (fetch, document) => {
  try {
    const documentExists = await resourceExists(fetch, document);
    if (!documentExists) return false;

    const inboxDocument = await ldflex[document]["ldp:inbox"];
    const inbox = inboxDocument ? await inboxDocument.value : false;
    return inbox;
  } catch (error) {
    throw error;
  }
};

/**
 * Given a resource link, find an inbox linked from it, if any exist
 * @param resourcePath
 * @returns {Promise<string|*>}
 */
export const getLinkedInbox = async (resourcePath) => {
  try {
    const inboxLinkedPath = await ldflex[resourcePath].inbox;
    if (inboxLinkedPath) {
      return inboxLinkedPath.value;
    }
    return "";
  } catch (error) {
    throw error;
  }
};
