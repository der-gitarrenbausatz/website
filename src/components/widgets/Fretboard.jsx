import { useState } from "react";

export function calculateFrets(scaleLength, numFrets) {
  const frets = [];
  let lastPosition = 0;

  for (let i = 1; i <= numFrets; i++) {
    let distance = scaleLength - scaleLength / Math.pow(2, i / 12);
    let interval = distance - lastPosition;
    frets.push({ fret: i, fromZero: (distance * 25.4).toFixed(3), interval: (interval * 25.4).toFixed(3) });
    lastPosition = distance;
  }
  return frets;
}

export function FretboardCalculator() {
  const [scaleLength, setScaleLength] = useState(650);
  const [numFrets, setNumFrets] = useState(22);
  const [fretData, setFretData] = useState([]);

  const handleCalculate = () => {
    setFretData(calculateFrets(scaleLength / 25.4, numFrets));
  };

  const handleScaleChange = (e) => {
    setScaleLength(parseFloat(e.target.value) || "");
  };

  return (
    <div className="p-6 max-w-lg mx-auto mt-10 border rounded-lg shadow-lg bg-gray-100">
      <h2 className="text-xl font-bold mb-4">Bundabstand Rechner</h2>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block mb-1">Mensur (mm)</label>
          <input
            type="number"
            value={scaleLength}
            onChange={handleScaleChange}
            className="border p-2 rounded w-full"
            placeholder="Enter Scale Length (mm)"
          />
        </div>
        <div>
          <label className="block mb-1">Anzahl Bünde</label>
          <input
            type="number"
            value={numFrets}
            onChange={(e) => setNumFrets(parseInt(e.target.value))}
            className="border p-2 rounded w-full"
          />
        </div>
      </div>
      <button onClick={handleCalculate} className="bg-blue-500 text-white px-4 py-2 rounded">Berechnen</button>
      {fretData.length > 0 && (
        <>
          <table className="mt-6 w-full border-collapse border border-gray-300">
            <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">Bund</th>
              <th className="border border-gray-300 px-4 py-2">Abstand Sattel (mm)</th>
              <th className="border border-gray-300 px-4 py-2">Abstand vorheriger Bund (mm)</th>
            </tr>
            </thead>
            <tbody>
            {fretData.map(({fret, fromZero, interval}, index) => (
              <tr key={fret} className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}>
                <td className="border border-gray-300 px-4 py-2 text-center">{fret}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">{fromZero}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">{interval}</td>
              </tr>
            ))}
            </tbody>
          </table>
          <svg width="100%" height="150" className="mt-6 border border-gray-400">
            <polygon
              points={`0,40 ${scaleLength},40 ${scaleLength},60 0,60`}
              fill="none"
              stroke="black"
              strokeWidth="2"
            />
            {fretData.map(({fromZero}, index) => (
              <line
                key={index}
                x1={parseFloat(fromZero)}
                y1="30"
                x2={parseFloat(fromZero)}
                y2="70"
                stroke="black"
                strokeWidth="2"
              />
            ))}
          </svg>
        </>
      )}
    </div>
  );
}

export default FretboardCalculator;
