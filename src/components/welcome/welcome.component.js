import { Fragment } from "react";
import { useSession } from "@inrupt/solid-ui-react";
import NavBar from "../nav-bar";
import UserdataForm from "../userdataform";
import { createDocumentWithTurtle } from "../../utils/fileController";
import { getAppStorage } from "../../utils/storage";
import {
  getHeartrateRdfString,
  getTemperatureRdfString,
} from "../../utils/data_triples";
import { BODY_TEMP, HEARTRATE } from "../../constants/vitals";
import FileViewer from "../fileViewer";
import { useFiles } from "../../hooks/useFiles";

// import { Parser, Store } from "n3";
// import rdfParser from "rdf-parse";
// import { Fetcher, graph, parse } from "rdflib";

const WelcomeComponent = () => {
  const { session } = useSession();
  const { webId } = session.info;

  const files = useFiles(session);

  const createDocument = async (filePath, template_String, overwrite) => {
    let doc = "";
    if (files.some((f) => f.url === filePath) && !overwrite) {
      // get old document
      doc = await session.fetch(filePath);
    } else {
      // get template
      doc = await fetch(template_String);
    }
    return await doc.text();
  };

  // todo: check existing files and append
  const uploadFiles = async (values) => {
    const appUrl = await getAppStorage(webId);
    for (const [key, obj] of Object.entries(values)) {
      if (obj.value === 0) {
        console.log(`${key} not changed`);
        continue;
      }
      const filePath = `${appUrl + key}.ttl`;
      let doc = "";
      var data = "";
      switch (key) {
        case HEARTRATE:
          doc = await createDocument(
            filePath,
            "heartrate_template.ttl",
            obj.overwrite
          );
          data = getHeartrateRdfString(obj.value);
          break;
        case BODY_TEMP:
          doc = await createDocument(
            filePath,
            "temperature_template.ttl",
            obj.overwrite
          );
          data = getTemperatureRdfString(obj.value);
          break;
        default:
          console.log("vital not yet implemented");
      }
      const fileContent = doc + data;
      console.log(fileContent);

      const res = await createDocumentWithTurtle(
        session.fetch,
        filePath,
        fileContent
      );
      console.log(res);
    }

    // this works: N3
    // const store = new Store();
    // const parser = new Parser();
    // parser.parse(template, async (error, quad, prefixes) => {
    //   if (quad) {
    //     console.log("adding quad: ", quad);
    //     store.addQuad(quad);
    //   } else if (error) console.log("error parsing rdf");
    //   else {
    //     const triples = getHeartrateTiples(4);
    //     console.log(triples);
    //     store.addQuads(triples);
    //     let body = "";
    //     store.forEach((quad) => {
    //       body += quad.value;
    //     })
    //     console.log("Done parsing", prefixes, store);
    //     console.log(body);
    //   }
    // });

    // this works: rdflib, but not with "."
    // const store = graph();
    // parse(template, store, filePath);
    // console.log(store);
  };

  return (
    <Fragment>
      <NavBar webId={webId} />
      <div className="container">
        <div className="columns is-centered mt-6">
          <UserdataForm onSubmit={uploadFiles} />
        </div>
        <div className="columns is-centered mt-6">
          <FileViewer />
        </div>
      </div>
    </Fragment>
  );
};

export default WelcomeComponent;
