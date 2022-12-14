import {BsBoxArrowRight} from 'react-icons/bs'
import { useStateContext } from '../context/stateContext'
import {FiDelete} from 'react-icons/fi'
import {AiOutlineShopping} from 'react-icons/ai'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Cart = ({setCart}) => {
  const {state: {cart}, dispatch, cartItem, setCartItem} = useStateContext();
  const [total, setTotal] = useState(0);

  useEffect(()=>{
    setTotal(
      cart.reduce((acc, curr)=> acc + Number(curr.price)*curr.qty, 0)
    )
  }, [cart])

  return (
    <div className='cart'>
      <div className='top'>
        <span className='icon'>
          <BsBoxArrowRight onClick={()=>setCart(false)}/>
        </span>
        <span>Cart Items ({cartItem})</span>
      </div>
      {cart.length >= 1 ?
        <><div className="cartItems">
        {cart?.map(c=>{
          return(
            <div className="cartItem" key={c.id}>
              <FiDelete onClick={()=>{
                dispatch({type: "REMOVE_FROM_CART", payload: c}) 
                setCartItem(prev=>prev-1)
              }
              } className="icon" />
              <img src={c.thumbnail} alt="" />
              <div className='info'>
                <h4 className='title'>{c.title}</h4>
                <h6 className='brand'>Brand: {c.brand}</h6>
              </div>
              <div>
                <span className='price'>$ {c.price}</span>
                <div className='qty'>
                  <button onClick={()=>{
                    dispatch({
                      type: "CHANGE_QTY",
                      payload: {id: c.id, qty: c.qty - 1},
                    })
                  }}>-</button>
                  <span>{c.qty}</span>
                  <button onClick={()=>{
                    dispatch({
                      type: "CHANGE_QTY",
                      payload: {id: c.id, qty: c.qty + 1},
                    })
                  }}>+</button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <div className="total">
        <h1>Summary</h1>
        <div className="summary">
          <div className="left">
            <p>Sub Totals </p>
            <p>Shipping Charge </p>
            <hr />
            <h4>Total</h4>
          </div>
          <div className="right">
            <p>: $ {total}</p>
            <p>: $ 10</p>
            <hr />
            <h4>: $ {total + 10}</h4>
          </div>
        </div>
        <button onClick={()=>setCart(false)}>
          <Link to="/checkout" style={{textDecoration: "none", color: "white"}}>Checkout Now</Link>
        </button>
      </div></> : (
        <div className='emptyCart'>
          <AiOutlineShopping className='icon'/>
          <h1>Your Cart is Empty</h1>
          <button className='visitBtn' onClick={()=>setCart(false)}>Visit Shop</button>
        </div>
      )}
    </div>
  )
}

export default Cart