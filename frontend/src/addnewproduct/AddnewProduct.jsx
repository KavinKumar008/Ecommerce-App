import React from "react";
import cameraimg1 from "../assets/cameraimgviews/cameraimg1.jpeg";

const AddnewProduct = () => {
  return (
    <main className="bg-gray-200 h-screen flex items-center justify-center">
      <section className="bg-white w-[950px] h-[500px] rounded-xl shadow-md flex flex-col">
        <div className="flex items-center justify-center h-[30%]">
          <img src={cameraimg1} alt="" className="rounded-full p-5" />
        </div>
        <div className="flex h-[70%]">
          <section className="flex flex-col justify-evenly w-[50%] p-4">
            <label htmlFor="" className="flex gap-5 items-center">
              <span className="w-20 text-lg font-bold">Name</span>
              <input
                type="text"
                placeholder="enter product name"
                className="flex-1 p-2 outline-none border border-gray-200 rounded-md"
              />
            </label>
            <label htmlFor="" className="flex gap-5 items-center">
              <span className="w-20 text-lg font-bold">Original Price</span>

              <input
                type="text"
                placeholder="enter the original price"
                className="flex-1 p-2 outline-none border border-gray-200 rounded-md"
              />
            </label>
            <label htmlFor="" className="flex gap-5 items-center">
              <span className="w-20 text-lg font-bold">Rating</span>
              <input
                type="text"
                placeholder="enter the rating"
                className="flex-1 p-2 outline-none border border-gray-200 rounded-md"
              />
            </label>
            <label htmlFor="" className="flex gap-5 items-center">
              <span className="w-20 text-lg font-bold">Description</span>
              <textarea
                rows={4}
                cols={30}
                className="flex-1 outline-0 border border-gray-200 p-2"
              />
            </label>
          </section>
          <section className="flex flex-col justify-evenly w-[50%]">
            <label htmlFor="" className="">
              <span>Price</span>
              <input type="text" placeholder="enter your price" />
            </label>
            <label htmlFor="">
              <span>Discount</span>
              <input type="text" placeholder="enter your discount" />
            </label>
            <div>
              <label htmlFor="">Select your category</label>
              <select name="" id="">
                <option value="">Electronic</option>
                <option value="">SmartPhone</option>
                <option value="">Featured</option>
              </select>
            </div>
          </section>
        </div>
        <button>Add</button>
      </section>
    </main>
  );
};

export default AddnewProduct;
