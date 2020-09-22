import React, { Component } from "react";

import Aux from "../../hoc/Aux/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";

const INGREDIENT_PRICES = {
    ketchup: 0.05,
    mustard: 0.05,
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7,
};

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            ketchup: 0,
            mustard: 0,
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0,
        },
        totalPrice: 4,
        burgerOrderable: false,
        ordering: false,
    };

    updateOrderState(ingredients) {
        const sumOfIngredients = Object.keys(ingredients)
            .map((igKey) => {
                return ingredients[igKey];
            })
            .reduce((sumOfIngredients, element) => {
                return sumOfIngredients + element;
            }, 0);
        this.setState({ burgerOrderable: sumOfIngredients > 0 });
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients,
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients,
        });
        this.updateOrderState(updatedIngredients);
    };

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients,
        };
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients,
        });
        this.updateOrderState(updatedIngredients);
    };

    orderHandler = () => {
        this.setState({ ordering: true });
    };

    orderCancelHandler = () => {
        this.setState({ ordering: false });
    };

    orderContinueHandler = () => {
        alert("You continue your order!");
    };

    render() {
        const disabledInfo = { ...this.state.ingredients };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        return (
            <Aux>
                <Modal
                    show={this.state.ordering}
                    modalClosed={this.orderCancelHandler}
                >
                    <OrderSummary
                        orderCancelled={this.orderCancelHandler}
                        orderContinued={this.orderContinueHandler}
                        ingredients={this.state.ingredients}
                        price={this.state.totalPrice}
                    />
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    addedIngredient={this.addIngredientHandler}
                    removedIngredient={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    burgerOrderable={this.state.burgerOrderable}
                    ordered={this.orderHandler}
                    price={this.state.totalPrice}
                ></BuildControls>
            </Aux>
        );
    }
}

export default BurgerBuilder;
