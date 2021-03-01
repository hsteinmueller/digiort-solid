import { useState } from "react";
import "bulma";
import { BODY_TEMP, HEARTRATE } from "../../constants/vitals";

export const UserdataForm = ({ onSubmit }) => {
  // https://dev.to/deboragaleano/how-to-handle-multiple-inputs-in-react-55el
  // https://www.telerik.com/blogs/how-to-build-custom-forms-react-hooks
  const initialValues = {
    [HEARTRATE]: 0,
    [BODY_TEMP]: 0,
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
              name={HEARTRATE}
              type="number"
              value={values.heartrate}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="field">
          <label className="label">
            Bodytemperature
            <input
              className="input"
              name={BODY_TEMP}
              type="number"
              value={values.temperature}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="control">
          <button className="button is-primary">Submit</button>
          {/* <input type="submit" value="Submit" /> */}
        </div>
        <p>
          This will upload <strong>.ttl</strong>-files to your pod in{" "}
          <strong>/private/apps/digiort!</strong>
        </p>
      </form>
    </div>
  );
};
