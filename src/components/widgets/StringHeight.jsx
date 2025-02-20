import React, { useState } from "react";

// Define fields with default values and descriptions
const fields = {
  fb0: { label: "Dicke Griffbrett am Sattel", defaultValue: 5 },
  fb12: { label: "Dicke Griffbrett am 12. Bund", defaultValue: 5 },
  f0: { label: "Abstand Saite - Griffbrett am Sattel (Nullbund)", defaultValue: 2.1 },
  f: { label: "Dicke der restlichen Bünde", defaultValue: 2 },
  a12: { label: "Saitenabstand am 12. Bund (über Bund)", defaultValue: 9 },
  bn: { label: "Halswinkel (Abweichung am Steg)", defaultValue: "" },
  d: { label: "Deckenwölbung (Deckenhöhe am Steg gegenüber der Zargen)", defaultValue: 3 },
  hs: { label: "Saitenabstand über Decke am Steg", defaultValue: 9 },
};

const Widget = () => {
  const [values, setValues] = useState(
    Object.fromEntries(Object.entries(fields).map(([key, { defaultValue }]) => [key, defaultValue]))
  );

  // Function to calculate a specific field
  const calculateField = (targetField) => {
    const parsedValues = Object.fromEntries(
      Object.entries(values).map(([key, value]) => [key, value === "" ? 0 : parseFloat(value)])
    );

    let { fb0, fb12, f0, f, a12, bn, d, hs } = parsedValues;
    let lhs = (fb0 + f0) + (bn + d + hs);
    let rhs = 2 * (fb12 + f + a12);

    let calculatedValue = 0;
    if (["fb0", "f0", "bn", "d", "hs"].includes(targetField)) {
      calculatedValue = rhs - (lhs - parsedValues[targetField]);
    } else if (["fb12", "f", "a12"].includes(targetField)) {
      calculatedValue = (lhs / 2) - (rhs / 2) + parsedValues[targetField];
    }

    setValues((prev) => ({
      ...prev,
      [targetField]: isNaN(calculatedValue) ? "" : calculatedValue.toFixed(2),
    }));
  };

  // Handle input change
  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow">
      <h2 className="text-lg font-bold mb-2">Equation Calculator</h2>
      <div className="grid grid-cols-2 gap-3">
        {Object.entries(fields).map(([field, { label }]) => (
          <div key={field} className="flex items-center space-x-2">
            <div className="flex flex-col flex-grow">
              <label className="font-semibold">{field}</label>
              <span className="text-xs text-gray-600">{label}</span>
              <input
                type="number"
                name={field}
                value={values[field]}
                onChange={handleChange}
                className="p-2 border rounded w-full"
              />
            </div>
            <button
              onClick={() => calculateField(field)}
              className="p-2 bg-blue-500 text-white rounded"
            >
              Berechnen
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Widget;
