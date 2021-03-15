import { useState } from "react";
import "bulma";
import { BODY_TEMP, HEARTRATE } from "../../constants/vitals";

const FormOptions = [
  {
    name: HEARTRATE,
    label: "Heartrate [bpm]",
  },
  {
    name: BODY_TEMP,
    label: "Bodytemperature [°C]",
  },
];

export const UserdataForm = ({ onSubmit }) => {
  // https://dev.to/deboragaleano/how-to-handle-multiple-inputs-in-react-55el
  // https://www.telerik.com/blogs/how-to-build-custom-forms-react-hooks
  const initialValues = {
    [HEARTRATE]: {
      value: 0,
      overwrite: false,
    },
    [BODY_TEMP]: {
      value: 0,
      overwrite: false,
    },
  };

  const [values, setvalues] = useState(initialValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setvalues({
      ...values,
      [name]: {
        ...values[name],
        value: value,
      },
    });
  };

  const handleCheckbox = (e) => {
    const { id, checked } = e.target;
    setvalues({
      ...values,
      [id]: {
        ...values[id],
        overwrite: checked,
      },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(values);
  };

  return (
    <form className="box" onSubmit={handleSubmit} style={{ width: "15rem" }}>
      {FormOptions.map((option, index) => (
        <div key={index} className="field">
          <label className="label">
            {option.label}
            <input
              className="input"
              name={option.name}
              type="number"
              value={values[option.name].value}
              onChange={handleChange}
            />
          </label>
          <label className="checkbox">
            <input
              id={option.name}
              className="checkbox"
              type="checkbox"
              onChange={handleCheckbox}
            />{" "}
            Overwrite
          </label>
        </div>
      ))}
      <div className="control">
        <button className="button is-primary">Submit</button>
      </div>
      <p>
        This will upload <strong>.ttl</strong>-files to your pod in{" "}
        <strong>/private/apps/digiort!</strong>
      </p>
    </form>
  );
};
