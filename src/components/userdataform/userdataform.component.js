import { useState } from "react";
import "bulma";

export const UserdataForm = ({ onSubmit }) => {
  // https://dev.to/deboragaleano/how-to-handle-multiple-inputs-in-react-55el
  // https://www.telerik.com/blogs/how-to-build-custom-forms-react-hooks
  const initialValues = {
    heartrate: 0,
    bloodpressure: 0,
    bodytemp: 0,
    respiratoryrate: 0,
  };

  const [values, setvalues] = useState(initialValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setvalues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(values);
  };

  return (
    <div className="columns is-centered mt-6">
      <form className="box" onSubmit={handleSubmit} style={{ width: "15rem" }}>
        <div className="field">
          <label className="label">
            Heartrate [bpm]
            <input
              className="input"
              name="heartrate"
              type="number"
              value={values.heartrate}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="field">
          <label className="label">
            Bloodpressure
            <input
              className="input"
              name="bloodpressure"
              type="number"
              value={values.bloodpressure}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="field">
          <label className="label">
            Bodytemperature
            <input
              className="input"
              name="bodytemp"
              type="number"
              value={values.bodytemp}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="field">
          <label className="label">
            Respiratory-Rate
            <input
              className="input"
              name="respiratoryrate"
              type="number"
              value={values.respiratoryrate}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="control">
          <button className="button is-primary">Submit</button>
          {/* <input type="submit" value="Submit" /> */}
        </div>
        <p>
          This will upload a <strong>data.ttl</strong> file to your pod under{" "}
          <strong>/public/apps/digiort!</strong>
        </p>
      </form>
    </div>
  );
};
