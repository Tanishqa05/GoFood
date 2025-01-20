import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";

export default function Home() {
  const [foodItem, setFoodItem] = useState([]);
  const [foodCat, setFoodCat] = useState([]);
  const [search, setSearch] = useState('');

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
      <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{objectFit: "contain !important"}}>
        <div className="carousel-inner" id='carousel'>
            <div className="carousel-caption" style={{zIndex: "10"}}>
                <div className="d-flex justify-content-center">
                    <input className="form-control form-outline-success mr-sm-2 " type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e) => {setSearch(e.target.value)}} />
                    {/* <button className="btn btn-outline-success m-2 my-sm-0 text-white bg-success " type="submit">Search</button> */}
                </div>
            </div> 
          <div className="carousel-item active">
            <img src="/carousel1.jpg" className="d-block w-100" style={{filter: "brightness(30%)"}} alt="Carousel 1" />
          </div>
          <div className="carousel-item">
            <img src="/carousel2.jpg" className="d-block w-100" style={{filter: "brightness(30%)"}} alt="Carousel 2" />
          </div>
          <div className="carousel-item">
            <img src="/carousel3.jpg" className="d-block w-100" style={{filter: "brightness(30%)"}} alt="Carousel 3" />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      </div>
      <div className="container mx-auto px-4">
  {/* Conditional rendering for categories */}
  {foodCat && foodCat.length > 0 ? (
    foodCat.map((data) => {
      return (
        <div key={data._id} className="mb-8">
          <h3 className="text-lg font-bold mb-4">{data.CategoryName}</h3>
          <hr className="mb-4" />
          {/* Render food items filtered by category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {foodItem && foodItem.length > 0 ? (
              foodItem
                .filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLocaleLowerCase()))) 
                .map((filteredItem) => {
                  return (
                    <div key={filteredItem._id} className="col-12 col-md-6 col-lg-3">  
                    <Card
                      foodItems={filteredItem}
                      options={filteredItem.options[0]}
                  
                    />
                    </div>
                  );
                })
            ) : (
              <div>No food items found</div>
            )}
          </div>
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
