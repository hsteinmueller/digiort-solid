import { Fragment } from "react";
import { useSession } from "@inrupt/solid-ui-react";
import NavBar from "../nav-bar";
import UserdataForm from "../userdataform";
import { createDocumentWithTurtle } from "../../utils/fileController";
import { getAppStorage } from "../../utils/storage";

// import { Parser, Store } from "n3";
// import rdfParser from "rdf-parse";
// import { Fetcher, graph, parse } from "rdflib";
import { getHeartrateRdfString } from "../../utils/data_triples";

const WelcomeComponent = () => {
  const { session } = useSession();
  const { webId } = session.info;

  const uploadFile = async (values) => {
    const appUrl = await getAppStorage(webId);
    const filePath = `${appUrl + "heartrate.ttl"}`;

    const template_res = await fetch("heartrate_template.ttl", {
      // const template_res = await fetch("data.ttl", {
      // headers: {
      // "Content-Type": "application/rdf+xml",
      // },
    });
    const template = await template_res.text();
    const str = getHeartrateRdfString(values.heartrate);
    const fileContent = template + str;
    console.log(fileContent);

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

    const res = await createDocumentWithTurtle(
      session.fetch,
      filePath,
      fileContent
    );
    console.log(res);
  };

  return (
    <Fragment>
      <NavBar webId={webId} />
      <div className="container">
        <UserdataForm onSubmit={uploadFile} />
      </div>
    </Fragment>
  );
};

export default WelcomeComponent;
