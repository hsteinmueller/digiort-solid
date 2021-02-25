import React, { useState } from "react";

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
    <form onSubmit={handleSubmit}>
      <label>
        Heartrate:
        <input
          name="heartrate"
          type="number"
          value={values.heartrate}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Bloodpressure:
        <input
          name="bloodpressure"
          type="number"
          value={values.bloodpressure}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Bodytemperature:
        <input
          name="bodytemp"
          type="number"
          value={values.bodytemp}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Respiratory-Rate:
        <input
          name="respiratoryrate"
          type="number"
          value={values.respiratoryrate}
          onChange={handleChange}
        />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
};
