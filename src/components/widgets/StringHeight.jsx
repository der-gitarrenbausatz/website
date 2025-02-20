import React, { useState, useEffect } from "react";

// Define fields with default values and descriptions
const fields = {
  fb0: { label: 'Dicke Griffbrett am Sattel', defaultValue: 5 },
  fb12: { label: 'Dicke Griffbrett am 12. Bund', defaultValue: 5 },
  f0: { label: 'Abstand Saite - Griffbrett am Sattel (Nullbund)', defaultValue: 1.4 },
  f: { label: 'Höhe der restlichen Bünde', defaultValue: 1.1 },
  a12: { label: 'Saitenabstand am 12. Bund (über Bund)', defaultValue: 5 },
  bn: { label: 'Halswinkel (Abweichung am Steg)', defaultValue: '' },
  d: { label: 'Deckenwölbung (Maximale Höhe der Decke über den Zargen)', defaultValue: 3 },
  hs: { label: 'Saitenabstand über Decke am Steg', defaultValue: 9 },
};

const Widget = () => {
  // Read values from URL or use defaults
  const getInitialValues = () => {
    const urlParams = new URLSearchParams(window.location.search);
    return Object.fromEntries(
      Object.entries(fields).map(([key, { defaultValue }]) => [
        key,
        urlParams.has(key) ? urlParams.get(key) : defaultValue,
      ])
    );
  };

  const [values, setValues] = useState(getInitialValues);
  const [copied, setCopied] = useState(false);

  // Function to update URL query params
  const updateURL = () => {
    const params = new URLSearchParams();
    Object.entries(values).forEach(([key, value]) => {
      if (value !== "") params.set(key, value);
    });
    window.history.replaceState({}, "", `?${params.toString()}`);
  };

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

  // Copy URL to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  // Update URL whenever values change
  useEffect(() => {
    updateURL();
  }, [values]);

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow max-w-lg mx-auto">
      <h2 className="text-lg font-bold mb-4">Halswinkel Rechner</h2>
      <div className="space-y-3">
        {Object.entries(fields).map(([field, { label }]) => (
          <div key={field} className="flex items-center space-x-2">
            <div className="flex-grow">
              <label className="font-semibold">{field}</label>
              <span className="text-xs text-gray-600 block">{label}</span>
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  name={field}
                  value={values[field]}
                  onChange={handleChange}
                  className="p-2 border rounded w-full"
                />
                <button
                  onClick={() => calculateField(field)}
                  className="p-2 bg-blue-500 text-white rounded text-sm"
                >
                  Berechnen
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* URL Display & Copy Button */}
      <div className="mt-4 p-3 bg-white border rounded-lg flex items-center space-x-2">
      <p className="font-semibold">Werte kopieren</p>
        <input
          type="text"
          readOnly
          value={window.location.href}
          className="p-2 border rounded flex-grow"
        />
        <button
          onClick={copyToClipboard}
          className="p-2 bg-green-500 text-white rounded text-sm"
        >
          {copied ? "Kopiert!" : "Kopieren"}
        </button>
      </div>
    </div>
  );
};

export default Widget;
