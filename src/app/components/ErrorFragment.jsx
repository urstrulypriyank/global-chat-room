import React from "react";

const ErrorFragment = (props) => {
  return (
    <div className="bg-red-600">
      <span>{props.error}</span>
    </div>
  );
};

export default ErrorFragment;
