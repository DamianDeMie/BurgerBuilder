import React from "react";
import Aux from "../../../hoc/Aux/Aux";
import Button from "../../UI/Button/Button";

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients).map((igKey) => {
        return (
            <li key={igKey}>
                {props.ingredients[igKey]}x{" "}
                <span style={{ textTransform: "capitalize" }}>{igKey}</span>
            </li>
        );
    });

    return (
        <Aux>
            <h3> Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>{ingredientSummary}</ul>
            <p>
                <strong>Total Price: &euro;{props.price.toFixed(2)}</strong>
            </p>
            <p>Continue to checkout?</p>
            <Button buttonType="Danger" clicked={props.orderCancelled}>
                CANCEL
            </Button>
            <Button buttonType="Success" clicked={props.orderContinued}>
                CONTINUE
            </Button>
        </Aux>
    );
};

export default orderSummary;
