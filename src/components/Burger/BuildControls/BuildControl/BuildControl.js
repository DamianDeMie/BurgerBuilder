import React from "react";

import classes from "./BuildControl.module.css";

const buildControl = (props) => (
    <div className={classes.BuildControl}>
        <div className={classes.IngredientName}>{props.ingredientName}</div>
        <button
            onClick={props.removed}
            className={classes.RemoveIngredient}
            disabled={props.disabled}
        >
            -
        </button>
        <button onClick={props.added} className={classes.AddIngredient}>
            +
        </button>
    </div>
);

export default buildControl;
