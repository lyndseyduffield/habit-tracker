import React from "react";

interface Props {
  disabled: boolean;
}

const Checkbox: React.FC<Props> = (props) => {
  return (
    <label className="checkbox-label">
      {props.children}
      {props.disabled ? (
        <span className="checkbox-custom checkbox-disabled rectangular"></span>
      ) : (
        <span className="checkbox-custom rectangular"></span>
      )}
    </label>
  );
};

export default Checkbox;
