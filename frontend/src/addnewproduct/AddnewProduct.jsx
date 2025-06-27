import React from "react";
import cameraimg1 from "../assets/cameraimgviews/cameraimg1.jpeg";

const AddnewProduct = () => {
  return (
    <main className="bg-gray-400">
      <section className="bg-green-500 w-[700px] h-[500px]">
        <img src={cameraimg1} alt="" className="rounded-full" />
        <section>
          <label htmlFor="">
            <span>Name</span>
            <input type="text" placeholder="enter product name" />
          </label>
          <label htmlFor="">
            <span>OriginalPrice</span>
            <input type="text" placeholder="enter the original price" />
          </label>
          <label htmlFor="">
            <span>Rating</span>
            <input type="text" placeholder="enter the rating" />
          </label>
          <label htmlFor="">
            <span>Description</span>
            <textarea />
          </label>
        </section>
        <section>
          <label htmlFor="">
            <span>Price</span>
            <input type="text" placeholder="enter your price" />
          </label>
          <label htmlFor="">
            <span>Discount</span>
            <input type="text" placeholder="enter your discount" />
          </label>
          <label htmlFor="">Select your category</label>
          <select name="" id="">
            <option value="">Electronic</option>
            <option value="">SmartPhone</option>
            <option value="">Featured</option>
          </select>
        </section>
      </section>
    </main>
  );
};

export default AddnewProduct;
