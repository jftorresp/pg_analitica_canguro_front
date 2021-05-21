import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import "../../styles/tooltip.css";

const railStyle = {
  position: "absolute",
  width: "100%",
  transform: "translate(0%, -50%)",
  height: 40,
  cursor: "pointer",
  zIndex: 300,
  // border: '1px solid grey',
};

const railCenterStyle = {
  position: "absolute",
  width: "100%",
  transform: "translate(0%, -50%)",
  height: 14,
  borderRadius: 7,
  cursor: "pointer",
  pointerEvents: "none",
  backgroundColor: "#fff",
};

export default class TooltipRail extends Component {
  state = {
    value: null,
    percent: null,
  };

  onMouseEnter = () => {
    document.addEventListener("mousemove", this.onMouseMove);
  };

  onMouseLeave = () => {
    this.setState({ value: null, percent: null });
    document.removeEventListener("mousemove", this.onMouseMove);
  };

  onMouseMove = (e) => {
    const { activeHandleID, getEventData } = this.props;

    if (activeHandleID) {
      this.setState({ value: null, percent: null });
    } else {
      this.setState(getEventData(e));
    }
  };

  render() {
    const { value, percent } = this.state;
    const { activeHandleID, getRailProps } = this.props;

    return (
      <Fragment>
        {!activeHandleID && value ? (
          <div
            style={{
              left: `${percent}%`,
              position: "absolute",
              marginLeft: "-11px",
              marginTop: "-35px",
            }}
          >
            <div className="tooltip">
              <span className="tooltiptext">Value: {value}</span>
            </div>
          </div>
        ) : null}
        <div
          style={railStyle}
          {...getRailProps({
            onMouseEnter: this.onMouseEnter,
            onMouseLeave: this.onMouseLeave,
          })}
        />
        <div style={railCenterStyle} />
      </Fragment>
    );
  }
}

TooltipRail.propTypes = {
  getEventData: PropTypes.func,
  activeHandleID: PropTypes.string,
  getRailProps: PropTypes.func.isRequired,
};

TooltipRail.defaultProps = {
  disabled: false,
};
