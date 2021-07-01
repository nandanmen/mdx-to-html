import React from "react";

export default function Component() {
  const [count, setCount] = React.useState(0);

  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setCount((count) => count + 1)}>+1</button>
    </div>
  );
}
