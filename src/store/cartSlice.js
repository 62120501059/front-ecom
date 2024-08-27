
let initalState = [];

if (typeof window !== "undefined") {
    if (localStorage.getItem('cart')) {
        initalState = JSON.parse(localStorage.getItem("cart"))
    } else {
        initalState = [];
    }
}

export function cartSlice(state = initalState, action) {
    switch (action.type) {
        case "ADD_TO_CART":
            return action.payload;
        default:
            return state;
    }
}