import React from "react";

import BuildControl from "./BuildControl/BuildControl";
import classes from "./BuildControls.module.css";

const controls = [
    { ingredientName: "Ketchup", type: "ketchup" },
    { ingredientName: "Mustard", type: "mustard" },
    { ingredientName: "Salad", type: "salad" },
    { ingredientName: "Bacon", type: "bacon" },
    { ingredientName: "Cheese", type: "cheese" },
    { ingredientName: "Meat", type: "meat" },
];

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>
            Current Price: &euro;<strong>{props.price.toFixed(2)}</strong>
        </p>
        {controls.map((control) => (
            <BuildControl
                key={control.ingredientName}
                ingredientName={control.ingredientName}
                added={() => props.addedIngredient(control.type)}
                removed={() => props.removedIngredient(control.type)}
                disabled={props.disabled[control.type]}
            />
        ))}
        <button
            className={classes.OrderButton}
            disabled={!props.burgerOrderable}
            onClick={props.ordered}
        >
            ORDER YOUR BURGER
        </button>
    </div>
);

export default buildControls;
