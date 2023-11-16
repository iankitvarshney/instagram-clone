import React from "react";
import ReactDOM from "react-dom/client";

const App = () => {
  return (
    <div>
      <p>Hello there..</p>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
