import React, { useEffect, useContext, useState } from "react";
import { UserContext } from "./UserContext";
import Order from "./Order";

let getPreviousOrders = (orders) => {
  return orders.filter((ord) => ord.isPaymentCompleted === true);
};
let getCart = (orders) => {
  return orders.filter((ord) => ord.isPaymentCompleted === false);
};

let Dashboard = () => {
  let [orders, setOrders] = useState([]);
  let userContext = useContext(UserContext);
  console.log(userContext);

  useEffect(() => {
    document.title = "Dashboard-eCommerce";
    (async () => {
      if (userContext?.user?.currentUId) {
        let response = await fetch(
          `http://localhost:3000/orders?userId=${userContext.user.currentUId}`,
          { method: "GET" }
        );
        if (response.ok) {
          let responseBody = await response.json();
          setOrders(responseBody);
        }
      }
    })();
  }, [userContext?.user?.currentUId]);

  return (
    <div className="row">
      <div className="col-12 py-3 header">
        <h4>
          <i className="fa fa-dashboard"></i>Dashboard
        </h4>
      </div>
      <div className="col-12">
        <div className="row">
          {/* previous orders starts */}
          <div className="col-lg-6">
            <h4 className="py-2 my-2 text-info border-bottom border-primary">
              <i className="fa fa-history"></i>Previous Orders{" "}
              <span className="badge badge-info">
                {getPreviousOrders(orders).length}
              </span>
            </h4>
          </div>
          {/* previous orders ends */}

          {/* cart starts */}
          <div className="col-lg-6">
            <h4 className="py-2 my-2 text-info border-bottom border-primary">
              <i className="fa fa-shopping-cart"></i>Cart{" "}
              <span className="badge badge-primary">
                {getCart(orders).length}
              </span>
            </h4>
          </div>
          {/* cart ends */}
          
          {/* Render Order items if orders exist */}
          {orders.length > 0 && (
            <Order products={orders[0].items}></Order>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
