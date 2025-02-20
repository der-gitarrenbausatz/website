import React, { useState } from "react";

// Define fields with default values
const defaultValues = {
  fb0: 5,
  fb12: 5,
  f0: 2.1,
  f: 2,
  a12: 9,
  bn: "", // Should be calculated when missing
  d: 3,
  hs: 9,
};

const Widget = () => {
  const [values, setValues] = useState(defaultValues);

  // Function to calculate the missing field
  const calculateMissingField = (updatedValues) => {
    const parsedValues = Object.fromEntries(
      Object.entries(updatedValues).map(([key, value]) => [
        key,
        value === "" ? null : parseFloat(value),
      ])
    );

    const missingField = Object.keys(parsedValues).find((key) => parsedValues[key] === null);

    if (missingField) {
      let { fb0 = 0, fb12 = 0, f0 = 0, f = 0, a12 = 0, bn = 0, d = 0, hs = 0 } = parsedValues;
      let lhs = (fb0 + f0) + (bn + d + hs);
      let rhs = 2 * (fb12 + f + a12);

      let calculatedValue;
      if (["fb0", "f0", "bn", "d", "hs"].includes(missingField)) {
        calculatedValue = rhs - (lhs - (parsedValues[missingField] ?? 0));
      } else if (["fb12", "f", "a12"].includes(missingField)) {
        calculatedValue = (lhs / 2) - (rhs / 2) + (parsedValues[missingField] ?? 0);
      }

      setValues((prev) => ({
        ...prev,
        [missingField]: isNaN(calculatedValue) ? "" : calculatedValue.toFixed(2),
      }));
    }
  };

  // Handle input change
  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value })); // Update value without triggering calculation
  };

  // Trigger calculation only on "Enter" or "Blur"
  const handleActionTrigger = (event) => {
    if (event.type === "blur" || (event.type === "keydown" && event.key === "Enter")) {
      calculateMissingField(values);
    }
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow">
      <h2 className="text-lg font-bold mb-2">Halswinkel Rechner</h2>
      <div className="grid grid-cols-2 gap-3">
        <div key="fb0" className="flex flex-col">
          <label className="font-semibold">fb0</label>
          <p>thickness of the fret board at the 0-fret</p>
          <input
            type="number"
            name="fb0"
            value={values['fb0']}
            onChange={handleChange}
              onKeyDown={handleActionTrigger} // Triggers calculation when Enter is pressed
              onBlur={handleActionTrigger} // Triggers calculation when leaving the field
              
            className="p-2 border rounded"
          />
        </div>
        <div key="fb12" className="flex flex-col">
          <label className="font-semibold">fb12</label>
          <p>thickness of the fret board at the 12th fret</p>
          <input
            type="number"
            name="fb12"
            value={values['fb12']}
            onChange={handleChange}
              onKeyDown={handleActionTrigger} // Triggers calculation when Enter is pressed
              onBlur={handleActionTrigger} // Triggers calculation when leaving the field
              
            className="p-2 border rounded"
          />
        </div>
        <div key="f0" className="flex flex-col">
          <label className="font-semibold">f0</label>
          <p>thickness of the 0 fret</p>
          <input
            type="number"
            name="f0"
            value={values['f0']}
            onChange={handleChange}
              onKeyDown={handleActionTrigger} // Triggers calculation when Enter is pressed
              onBlur={handleActionTrigger} // Triggers calculation when leaving the field
              
            className="p-2 border rounded"
          />
        </div>
        <div key="f" className="flex flex-col">
          <label className="font-semibold">f</label>
          <p>thickness of all other frets</p>
          <input
            type="number"
            name="f"
            value={values['f']}
            onChange={handleChange}
              onKeyDown={handleActionTrigger} // Triggers calculation when Enter is pressed
              onBlur={handleActionTrigger} // Triggers calculation when leaving the field
              
            className="p-2 border rounded"
          />
        </div>
        <div key="a12" className="flex flex-col">
          <label className="font-semibold">a12</label>
          <p>action of the string at the 12th fret</p>
          <input
            type="number"
            name="a12"
            value={values['a12']}
            onChange={handleChange}
              onKeyDown={handleActionTrigger} // Triggers calculation when Enter is pressed
              onBlur={handleActionTrigger} // Triggers calculation when leaving the field
              
            className="p-2 border rounded"
          />
        </div>
        <div key="bn" className="flex flex-col">
          <label className="font-semibold">bn</label>
          <p>body-neck angle (divergence at the saddle position)</p>
          <input
            type="number"
            name="bn"
            value={values['bn']}
            onChange={handleChange}
              onKeyDown={handleActionTrigger} // Triggers calculation when Enter is pressed
              onBlur={handleActionTrigger} // Triggers calculation when leaving the field
              
            className="p-2 border rounded"
          />
        </div>
        <div key="d" className="flex flex-col">
          <label className="font-semibold">d</label>
          <p>dome (maximum height of the top above the edge)</p>
          <input
            type="number"
            name="d"
            value={values['d']}
            onChange={handleChange}
              onKeyDown={handleActionTrigger} // Triggers calculation when Enter is pressed
              onBlur={handleActionTrigger} // Triggers calculation when leaving the field
              
            className="p-2 border rounded"
          />
        </div>
        <div key="hs" className="flex flex-col">
          <label className="font-semibold">hs</label>
          <p>height of the saddle above the soundboard</p>
          <input
            type="number"
            name="hs"
            value={values['hs']}
            onChange={handleChange}
              onKeyDown={handleActionTrigger} // Triggers calculation when Enter is pressed
              onBlur={handleActionTrigger} // Triggers calculation when leaving the field
              
            className="p-2 border rounded"
          />
        </div>
      </div>
    </div>
  );
};

export default Widget;
