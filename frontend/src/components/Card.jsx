import React from "react";

export default function Card(props) {
  const options = props.options || {}; 
  const priceOptions = Object.keys(options); 

  return (
    <div>
      <div>
        <div
          className="card mt-3"
          style={{ width: "18rem", maxHeight: "450px" }}
        >
          <img src={props.foodImage} className="card-img-top" alt="Card image cap" />
          <div className="card-body">
            <h5 className="card-title">{props.foodName}</h5>

            <div className="container p-0">
              <div className="d-flex justify-content-between align-items-center">
                {/* Quantity dropdown */}
                <select className="m-2 h-100 bg-success rounded text-sm">
                  {Array.from(Array(6), (e, i) => {
                    return (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    );
                  })}
                </select>

                <select className="m-2 h-100 bg-success rounded text-sm">
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

                <div className="fs-4 m-2">Total price</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
