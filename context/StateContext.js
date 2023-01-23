import React, {createContext, useContext, useState, useEffect} from "react";
import {toast} from 'react-hot-toast'; // for popups
import { Product } from "../components";

const Context = createContext();

export const StateContext = ({children})=>{
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const  [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantities, setTotalQuantities] = useState(0);
    const [qty,setQty] = useState(1);

    let foundProduct;
    let index;

    const onAdd = (product,quantity)=> {
        const checkProductInCart = cartItems.find((item)=>item._id === product._id);
        setTotalPrice((prevTotalPrice)=> prevTotalPrice + product.price*quantity);
        setTotalQuantities((prevTotalQuantities)=> prevTotalQuantities +quantity);

        if (checkProductInCart) {
            
            const updatedCartItems = cartItems.map((cartProduct)=>{
                if (cartProduct._id === product._id) return {
                    ...cartProduct,
                    quantity: cartProduct.quantity + quantity
                }
            })
            setCartItems(updatedCartItems);
            
        }else{
            
            product.quantity = quantity;
            setCartItems([...cartItems,{...product}])
            
        }
        toast.success(`${qty} ${product.name} added to the cart`);
    }
    
    const onRemove = (product) => {
        foundProduct = cartItems.find((item)=>item._id===product._id)
        const newCartItems = cartItems.filter((item)=> item._id!==product._id)

        setTotalPrice((prevTotalPrice)=>prevTotalPrice-foundProduct.price*foundProduct.quantity);
        setTotalQuantities((prevTotalQuantities)=>prevTotalQuantities-foundProduct.quantity)
        setCartItems(newCartItems);
    }

    const toggleCartItemQuantity=(id,value)=>{
        foundProduct = cartItems.find((item)=>item._id===id)
        index = cartItems.findIndex((product)=>product._id===id)
        const newCartItems = cartItems.filter((item)=> item._id!==id) //Splice is a mutative method which we should not use in react so we use filter
        //const newCartItems = cartItems.splice(index,1) // Setcartitems is updating and adding new products every time we try and increment in the cart, so we delete that partivaular item before incrementing or decrementing in order to not duplicate
        if (value ==='inc') {
            setCartItems( [...newCartItems,{...foundProduct,quantity:foundProduct.quantity+1}]);
            setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price)
            setTotalQuantities((prevTotalQuantities)=>prevTotalQuantities+1);
        } else if(value ==='dec'){
            if (foundProduct.quantity>1) {
                setCartItems( [...newCartItems,{...foundProduct,quantity:foundProduct.quantity-1}]);
                setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price)
                setTotalQuantities((prevTotalQuantities)=>prevTotalQuantities-1);
            }
        }
    }

    const incQty = () => {
        setQty((prevQty)=>prevQty+1)
    }
    const decQty = () => {
        setQty((prevQty)=>{
            if(prevQty-1<1) return 1;
            return prevQty-1;
            prevQty-1
        });
    }

    return (
        <Context.Provider value = {{
            showCart,
            setShowCart,
            totalPrice,
            totalQuantities,
            cartItems,
            qty,
            incQty,
            decQty,
            onAdd,
            toggleCartItemQuantity,
            setCartItems,
            setTotalPrice,
            setTotalQuantities,
            onRemove
        }}>
            {children}
        </Context.Provider>
    )
}

export const useStateContext = () => useContext(Context);