import React from "react";

type Props = {
  error: string;
};

const ErrorFragment = (props: Props) => {
  return (
    <div className="bg-red-600">
      <span>{props.error}</span>
    </div>
  );
};

export default ErrorFragment;
