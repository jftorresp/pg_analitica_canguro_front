import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faTimes } from "@fortawesome/free-solid-svg-icons";
import Popover from "@material-ui/core/Popover";
import { makeStyles } from "@material-ui/core/styles";

const Filters = (props) => {
  const [anchorEl, setAnchorEl] = useState();

  //* Popover methods
  const useStyles = makeStyles((theme) => ({
    typography: {
      padding: theme.spacing(2),
    },
  }));

  const classes = useStyles();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // const removeFilter = (event) => {
  //   var arr = [];
  //   arr = props.filters.filter((obj) => obj.value !== event.target.id);
  //   console.log(arr);
  //   setFilterVars(arr);
  // };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <div>
      <button
        className={props.filters.length > 0 ? "filters-yes-btn" : "filters-btn"}
        onClick={handleClick}
        aria-describedby={id}
      >
        <FontAwesomeIcon icon={faFilter} />
      </button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <ul className={classes.typography}>
          {props.filters.length > 0 ? (
            <div>
              <p>
                <b>Filtros en los datos</b>
              </p>
              {props.filters
                .filter(
                  (v) => v.value !== "edadgestacional" || v.value !== "rciurceu"
                )
                .map((v) => (
                  <li className="list" name={v.value}>
                    {v.value.includes("peso") ||
                    v.value.includes("talla") ||
                    v.value.includes("pc") ||
                    v.value.includes("percapita") ||
                    v.value.includes("nivel") ||
                    v.value.includes("sexo")
                      ? v.filter
                      : v.label}
                    <button className="del-btn">
                      <FontAwesomeIcon icon={faTimes} id={v.value} />
                    </button>
                  </li>
                ))}
            </div>
          ) : (
            <p>No hay variables de filtro en los datos</p>
          )}
        </ul>
      </Popover>
    </div>
  );
};

export default Filters;
