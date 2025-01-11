import React, { useState } from "react";

const Lighting = () => {
  const [brightness, setBrightness] = useState(50);

  return (
    <div>
      <h2>Ρυθμίσεις Φωτισμού</h2>
      <input
        type="range"
        min="0"
        max="100"
        value={brightness}
        onChange={(e) => setBrightness(e.target.value)}
      />
      <p>Φωτεινότητα: {brightness}%</p>
    </div>
  );
};

export default Lighting;
