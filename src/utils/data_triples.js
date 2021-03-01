import { Triple, DataFactory as DF } from "n3";

export const getHeartrateRdfString = (
  heartrate,
  patientId = "exampleId",
  doctorId = "doctorId"
) => {
  return `
# - data -------------------------------------------------------------------

<http://hl7.org/fhir/Observation/heart-rate>
  <http://hl7.org/fhir/Observation.valueQuantity> [
    <http://hl7.org/fhir/Quantity.value> [ fhir:value "${heartrate}"^^xsd:decimal ];
    <http://hl7.org/fhir/Quantity.unit> [ fhir:value "beats/minute" ];
    <http://hl7.org/fhir/Quantity.system> [ fhir:value "http://unitsofmeasure.org" ];
    <http://hl7.org/fhir/Quantity.code> [ fhir:value "/min" ]
];

<http://hl7.org/fhir/Observation.effectiveDateTime> [ fhir:value "${new Date().toISOString()}"^^xsd:datetime];

<http://hl7.org/fhir/Observation.subject> [
  fhir:link <http://hl7.org/fhir/Patient/${patientId}>;
  <http://hl7.org/fhir/Reference.reference> [ fhir:value "Patient/${patientId}" ];
  <http://hl7.org/fhir/Reference.display> [ fhir:value "PatientName" ]
];

<http://hl7.org/fhir/Observation.performer> [
  fhir:index 0;
  fhir:link <http://hl7.org/fhir/Practitioner/${doctorId}>;
  <http://hl7.org/fhir/Reference.reference> [ fhir:value "Practitioner/${doctorId}" ]
] .

<http://hl7.org/fhir/Patient/${patientId}> a fhir:Patient .

<http://hl7.org/fhir/Practitioner/${doctorId}> a fhir:Practitioner .
    `;
};

export const getTemperatureRdfString = (
  temp,
  patientId = "exampleId",
  doctorId = "doctorId"
) => {
  return `
# - data -------------------------------------------------------------------

<http://hl7.org/fhir/Observation/temperature>
  <http://hl7.org/fhir/Observation.valueQuantity> [
    <http://hl7.org/fhir/Quantity.value> [ fhir:value "${temp}"^^xsd:decimal ];
    <http://hl7.org/fhir/Quantity.unit> [ fhir:value "degrees C" ];
    <http://hl7.org/fhir/Quantity.system> [ fhir:value "http://unitsofmeasure.org" ];
    <http://hl7.org/fhir/Quantity.code> [ fhir:value "Cel" ]
];

<http://hl7.org/fhir/Observation.issued> [ fhir:value "${new Date().toISOString()}"^^xsd:datetime];

<http://hl7.org/fhir/Observation.subject> [
  fhir:link <http://hl7.org/fhir/Patient/${patientId}>;
  <http://hl7.org/fhir/Reference.reference> [ fhir:value "Patient/${patientId}" ];
  <http://hl7.org/fhir/Reference.display> [ fhir:value "PatientName" ]
];

<http://hl7.org/fhir/Observation.performer> [
  fhir:index 0;
  fhir:link <http://hl7.org/fhir/Practitioner/${doctorId}>;
  <http://hl7.org/fhir/Reference.reference> [ fhir:value "Practitioner/${doctorId}" ]
] .

<http://hl7.org/fhir/Patient/${patientId}> a fhir:Patient .

<http://hl7.org/fhir/Practitioner/${doctorId}> a fhir:Practitioner .
    `;
};

export const getHeartrateTiples = (
  heartrate,
  patient = "Patient/example",
  doctor = "Practitioner/doctor"
) => {
  const mainNode = DF.namedNode("<http://hl7.org/fhir/Observation/heart-rate>");
  const valueNode = DF.namedNode("http://hl7.org/fhir/value");
  const patientNode = DF.namedNode(`<http://hl7.org/fhir/${patient}>`);
  const doctorNode = DF.namedNode(`<http://hl7.org/fhir/${doctor}>`);

  const bn1 = DF.blankNode();
  const bn2 = DF.blankNode();
  const bn3 = DF.blankNode();
  const bn4 = DF.blankNode();
  const bn5 = DF.blankNode();
  const bn6 = DF.blankNode();
  const bn7 = DF.blankNode();
  const bn8 = DF.blankNode();
  const bn9 = DF.blankNode();
  const bn10 = DF.blankNode();

  return [
    // ------------- value
    new Triple(mainNode, DF.namedNode("fhir:Observation.valueQuantity"), bn1),

    new Triple(bn1, DF.namedNode("http://hl7.org/fhir/Quantity.code"), bn2),
    new Triple(bn2, valueNode, DF.literal("/min")),

    new Triple(bn1, DF.namedNode("http://hl7.org/fhir/Quantity.system"), bn3),
    new Triple(bn3, valueNode, DF.literal("http://unitsofmeasure.org")),

    new Triple(bn1, DF.namedNode("http://hl7.org/fhir/Quantity.unit"), bn4),
    new Triple(bn4, valueNode, DF.literal("beats/minute")),

    new Triple(bn1, DF.namedNode("http://hl7.org/fhir/Quantity.value"), bn5),
    new Triple(bn5, valueNode, DF.literal(heartrate)),

    // ------------- date
    new Triple(
      mainNode,
      DF.namedNode("fhir:Observation.effectiveDateTime"),
      bn6
    ),
    new Triple(
      bn6,
      valueNode,
      DF.literal(
        new Date().toISOString(),
        DF.namedNode("http://www.w3.org/2001/XMLSchema#datetime")
      )
    ),

    // ------------- patient
    new Triple(mainNode, DF.namedNode("fhir:Observation.subject"), bn7),
    new Triple(bn7, DF.namedNode("fhir:link"), patientNode),
    new Triple(bn7, DF.namedNode("fhir:Reference.reference"), bn8),
    new Triple(bn8, valueNode, DF.literal(patient)),
    new Triple(patientNode, "x", DF.namedNode("fhir:Patient")),

    // ------------- doctor
    new Triple(mainNode, DF.namedNode("fhir:Observation.performer"), bn9),
    new Triple(bn9, DF.namedNode("fhir:link"), doctorNode),
    new Triple(bn9, DF.namedNode("fhir:Reference.reference"), bn10),
    new Triple(bn10, valueNode, DF.literal(doctor)),
    new Triple(doctorNode, "x", DF.namedNode("fhir:Practitioner")),
  ];
};
