import React from "react";

const Checkbox = props => {
  return (
    <label class="checkbox-label">
      {props.children}
      {props.disabled ? (
        <span class="checkbox-custom checkbox-disabled rectangular"></span>
      ) : (
        <span class="checkbox-custom rectangular"></span>
      )}
    </label>
  );
};

export default Checkbox;
