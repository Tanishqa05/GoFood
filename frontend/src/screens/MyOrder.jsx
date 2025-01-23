import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function MyOrder() {
    const [orderData, setOrderData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchMyOrder = async () => {
        try {
            const userEmail = localStorage.getItem('userEmail');
            if (!userEmail) {
                throw new Error('User email not found in localStorage');
            }

            const response = await fetch("http://localhost:5000/api/myOrderData", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: userEmail
                })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setOrderData(data.orderData);
        } catch (error) {
            console.error("Fetch error:", error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMyOrder();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <div>
                <Navbar />
            </div>

            <div className='container'>
                <div className='row'>
                    {orderData && orderData.order_data ? (
                        orderData.order_data.slice(0).reverse().map((orderGroup, groupIndex) => {
                            const orderDate = orderGroup.find(item => item.order_date)?.order_date;
                            return (
                                <div key={groupIndex} className='col-12'>
                                    {orderDate && (
                                        <div className='m-auto mt-5'>
                                            <h4>{orderDate}</h4>
                                            <hr />
                                        </div>
                                    )}
                                    <div className='row'>
                                        {orderGroup.map((orderItem, itemIndex) => (
                                            !orderItem.order_date && (
                                                <div key={itemIndex} className='col-12 col-md-6 col-lg-3'>
                                                    <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
                                                        <img 
                                                            src={orderItem.img} 
                                                            className="card-img-top" 
                                                            alt={orderItem.name} 
                                                            style={{ height: "120px", objectFit: "fill" }} 
                                                        />
                                                        <div className="card-body">
                                                            <h5 className="card-title">{orderItem.name}</h5>
                                                            <div className='container w-100 p-0' style={{ height: "38px" }}>
                                                                <span className='m-1'>{orderItem.qty}</span>
                                                                <span className='m-1'>{orderItem.size}</span>
                                                                <div className='d-inline ms-2 h-100 w-20 fs-5'>
                                                                    ₹{orderItem.price}/-
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        ))}
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div>No order data available</div>
                    )}
                </div>
            </div>

            <Footer />
        </div>
    );
}