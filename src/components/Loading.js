import React from "react";
import ReactLoading from "react-loading";
import { PropTypes } from "prop-types";

function Loading({ type, color }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      <ReactLoading type={type} color={color} height={50} width={50} />;
    </div>
  );
}

Loading.propTypes = {
  type: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};
export default Loading;
