import { createSlice } from "@reduxjs/toolkit";
const initialState = JSON.parse(localStorage.getItem('cart')) ?? [];
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// console.log("---m",productWithDetails);
// console.log("---n",action.payload);
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers : {
        addToCart(state, action){
            const existingProductIndex = state.findIndex(item =>
                item.id === action.payload.id &&
                item.size === action.payload.size &&
                item.name === action.payload.name &&
                item.number === action.payload.number
            );

            if (existingProductIndex !== -1) 
            {
                state[existingProductIndex].quantity += action.payload.quantity;
                
                toast.success(`quantity updated`);
            } else {
                toast.success(`add to cart!`);
                state.push(action.payload);
            }
        },
            deleteFromCart(state,action){
            return state.filter(item => item.id != action.payload.id || item.size !== action.payload.size || item.nane != action.payload.name ||  item.number != action.payload.number );
        }
    }
})


export const {addToCart, deleteFromCart} = cartSlice.actions;

export default cartSlice.reducer;