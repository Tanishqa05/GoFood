import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
import Carousel from "../components/Carousel";

export default function Home() {
  const [foodItem, setFoodItem] = useState([]);
  const [foodCat, setFoodCat] = useState([]);

  const loadData = async () => {
    try {
      let response = await fetch("http://localhost:5000/api/foodData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      response = await response.json();

      setFoodItem(response.food_items); // Correct keys based on API response
      setFoodCat(response.food_category);

      console.log("Food Items:", response.food_items);
      console.log("Food Categories:", response.food_category);
    } catch (error) {
      console.error("Error fetching food data:", error);
    }
  };

  useEffect(() => {
    loadData(); // Load data on initial render
  }, []);

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
        <Carousel />
      </div>
      <div className="container">
        {/* Conditional rendering for categories */}
        {foodCat && foodCat.length > 0 ? (
          foodCat.map((data) => {
            return (
              <div key={data._id} className="fs-3 m-3">
                <h5>{data.CategoryName}</h5>
                <hr />
                {/* Render food items filtered by category */}
                {foodItem && foodItem.length > 0 ? (
                  foodItem
                    .filter((item) => item.CategoryName === data.CategoryName)
                    .map((filteredItem) => {
                      return (
                        <div key={filteredItem._id}>
                          <Card item={filteredItem} />
                        </div>
                      );
                    })
                ) : (
                  <div>No food items found</div>
                )}
              </div>
            );
          })
        ) : (
          <div>No food categories found</div>
        )}
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
