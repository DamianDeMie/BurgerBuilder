import React, { Component } from "react";

import Aux from "../../hoc/Aux/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import ErrorHandler from "../../hoc/ErrorHandler/ErrorHandler";
import axios from "../../axios-orders";

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
        ingredients: null,
        totalPrice: 4,
        burgerOrderable: false,
        ordering: false,
        loading: false,
    };

    componentDidMount() {
        axios.get("ingredients.json").then((response) => {
            this.setState({ ingredients: response.data });
        });
    }

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
        this.setState({ loading: true });
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: "Damian de Mie",
                address: {
                    street: "Teststreet 1",
                    zipCode: "41351",
                    country: "Netherlands",
                },
                email: "test@test.com",
            },
            deliveryMethod: "fastest",
        };
        axios
            .post("/orders.json", order)
            .then((response) => {
                this.setState({ loading: false, ordering: false });
            })
            .catch((error) => {
                this.setState({ loading: false, ordering: false });
            });
    };

    render() {
        const disabledInfo = { ...this.state.ingredients };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        let orderSummary = null;

        let burger = <Spinner />;

        if (this.state.ingredients) {
            burger = (
                <Aux>
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
            orderSummary = (
                <OrderSummary
                    orderCancelled={this.orderCancelHandler}
                    orderContinued={this.orderContinueHandler}
                    ingredients={this.state.ingredients}
                    price={this.state.totalPrice}
                />
            );
        }

        if (this.state.loading) {
            orderSummary = <Spinner />;
        }

        return (
            <Aux>
                <Modal
                    show={this.state.ordering}
                    modalClosed={this.orderCancelHandler}
                >
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

export default ErrorHandler(BurgerBuilder, axios);
