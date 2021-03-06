import React from "react";

import classes from "./Burger.module.css";

import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

const burger = (props) => {
    let transformedIngredients = Object.keys(props.ingredients)
        .map((igKey) => {
            return [...Array(props.ingredients[igKey])].map((_, index) => {
                return <BurgerIngredient key={igKey + index} type={igKey} />;
            }); // [Array with two elements];
        })
        .reduce((array, element) => {
            return array.concat(element);
        }, []);

    if (transformedIngredients.length === 0) {
        transformedIngredients = (
            <p>Please start adding ingredients to your burger</p>
        );
    }

    console.log(transformedIngredients);
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
};

export default burger;
