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

// import { Parser, Store } from "n3";
// import rdfParser from "rdf-parse";
// import { Fetcher, graph, parse } from "rdflib";

const WelcomeComponent = () => {
  const { session } = useSession();
  const { webId } = session.info;

  const uploadFiles = async (values) => {
    const appUrl = await getAppStorage(webId);

    for (const [key, value] of Object.entries(values)) {
      if (value === 0) continue;
      const filePath = `${appUrl + key}.ttl`;
      var template = "";
      var data = "";
      switch (key) {
        case HEARTRATE:
          template = await fetch("heartrate_template.ttl", {});
          data = getHeartrateRdfString(value);
          break;
        case BODY_TEMP:
          template = await fetch("temperature_template.ttl", {});
          data = getTemperatureRdfString(value);
          break;
        default:
          console.log("nothing changed");
      }
      template = await template.text();
      const fileContent = template + data;
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
        <UserdataForm onSubmit={uploadFiles} />
      </div>
    </Fragment>
  );
};

export default WelcomeComponent;
