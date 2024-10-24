import React from "react";

function Flowers() {
  return (
    <div className="">
      <h1>Flower</h1>
      <div className="flower_sec_btn">
        <button className="leave_flower">Leave A Flower</button>
        <button className="say_a_prayer">Say A Prayer</button>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <img
              src="https://efloristwagga.com.au/cdn/shop/products/IMG_20230404_140220_edit_456127683262_grande.jpg?v=1682859319"
              alt="flower"
              style={{
                width: "100%",
                height: "250px",
                objectFit: "cover",
                borderRadius: "5px",
              }}
            />
            <h3 className="mt-3">Sent By: Joe Khan</h3>
            <p>12/03/2024</p>
          </div>

          <div className="col-md-3">
            <img
              src="https://efloristwagga.com.au/cdn/shop/products/IMG_20230404_140220_edit_456127683262_grande.jpg?v=1682859319"
              alt="flower"
              style={{
                width: "100%",
                height: "250px",
                objectFit: "cover",
                borderRadius: "5px",
              }}
            />
            <h3 className="mt-3">Sent By: Joe Khan</h3>
            <p>12/03/2024</p>
          </div>

          <div className="col-md-3">
            <img
              src="https://efloristwagga.com.au/cdn/shop/products/IMG_20230404_140220_edit_456127683262_grande.jpg?v=1682859319"
              alt="flower"
              style={{
                width: "100%",
                height: "250px",
                objectFit: "cover",
                borderRadius: "5px",
              }}
            />
            <h3 className="mt-3">Sent By: Joe Khan</h3>
            <p>12/03/2024</p>
          </div>

          <div className="col-md-3">
            <img
              src="https://efloristwagga.com.au/cdn/shop/products/IMG_20230404_140220_edit_456127683262_grande.jpg?v=1682859319"
              alt="flower"
              style={{
                width: "100%",
                height: "250px",
                objectFit: "cover",
                borderRadius: "5px",
              }}
            />
            <h4 className="mt-3">Sent By: Joe Khan</h4>
            <p>12/03/2024</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Flowers;
