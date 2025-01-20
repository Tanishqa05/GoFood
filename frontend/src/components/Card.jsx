import React, { useEffect, useState, useRef } from "react";
import { useDispatchCart, useCart} from "../components/ContextReducer";

export default function Card(props) {
  let dispatch = useDispatchCart();
  let options = props.options || {}; 
  let priceOptions = Object.keys(options); 
  let foodItem = props.foodItems || { name: "No name available", img: "placeholder.jpg" };

  const priceRef = useRef();
  let data = useCart();
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");
  const handleAddToCart = async()=>{
    await dispatch({
      type: "ADD",
    id: props.foodItems._id,
    name: props.foodItems.name,
    price: finalPrice,
    img: props.foodItems.img,
    qty: qty,
    size: size
    })
console.log(data);  }

let finalPrice = qty * parseInt(options[size]);

useEffect(() => {
  setSize(priceRef.current.value);
}, [])

  return (
    <div>
      <div>
        <div
          className="card mt-3"
          style={{ width: "18rem", maxHeight: "450px" }}
        >
          <img src={foodItem.img} className="card-img-top" alt="..." style={{height: "200px", objectFit: "Fill"}} />
          <div className="card-body">
            <h5 className="card-title">{foodItem.name}</h5>

            <div className="container p-0">
              <div className="d-flex justify-content-between align-items-center">
                {/* Quantity dropdown */}
                <select className="m-2 h-100 bg-success rounded text-sm" onChange={(e) => setQty(e.target.value)}>
                  {Array.from(Array(6), (e, i) => {
                    return (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    );
                  })}
                </select>

                <select className="m-2 h-100 bg-success rounded text-sm" ref={priceRef} onChange={(e) => setSize(e.target.value)}>
                  {priceOptions.length > 0 ? (
                    priceOptions.map((data) => {
                      return (
                        <option key={data} value={data}>
                          {data}
                        </option>
                      );
                    })
                  ) : (
                    <option value="">No options available</option>
                  )}
                </select>

                <div className="fs-4 m-2">Rs.{finalPrice}/-</div>
              </div>
            </div>
            <hr/>
            <button className="btn btn-success justify-center mt-3" onClick={handleAddToCart}>Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
}
