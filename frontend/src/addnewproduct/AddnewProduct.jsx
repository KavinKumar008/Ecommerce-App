import React from "react";
import cameraimg1 from "../assets/cameraimgviews/cameraimg1.jpeg";

const AddnewProduct = () => {
  return (
    <main className="bg-gray-200 h-screen flex items-center justify-center">
      <section className="bg-white w-[950px] h-[550px] rounded-xl shadow-md flex flex-col">
        <div className="flex items-center justify-center h-[25%]">
          <img src="" className="rounded-full bg-red-300 w-[100px] h-[100px]" />
          <label htmlFor="">
            <input type="file" />
            <RiImageAddFill />
          </label>
        </div>
        <div className="flex h-[75%]">
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
          <section className="flex flex-col justify-evenly w-[50%] p-4">
            <label htmlFor="" className="flex gap-5 items-center">
              <span className="w-20 font-bold lg:text-lg">Price</span>
              <input
                type="text"
                placeholder="enter your price"
                className="flex-1 outline-none border border-gray-200 p-2 rounded-md"
              />
            </label>
            <label htmlFor="" className="flex gap-5 items-center">
              <span className="w-20 font-bold lg:text-lg">Discount</span>
              <input
                type="text"
                placeholder="enter your discount"
                className="flex-1 outline-none border border-gray-200 p-2 rounded-md"
              />
            </label>
            <div className="flex items-center gap-5">
              <label htmlFor="" className="w-20 font-bold text-lg">
                Select your category
              </label>
              <select
                name=""
                id=""
                className="flex-1 outline-none border border-gray-200 rounded-md p-3"
              >
                <option value="">Electronic</option>
                <option value="">SmartPhone</option>
                <option value="">Featured</option>
              </select>
            </div>
            <div className="xl:flex xl:gap-20 justify-evenly items-center flex gap-10">
              <span className="w-20 font-bold lg:text-lg">ChangeImages</span>
              <div className="flex-1 justify-evenly lg:flex lg:gap-10 flex">
                <img
                  src=""
                  alt=""
                  className="rounded-full border w-[50px] h-[50px]"
                />
                <img
                  src=""
                  alt=""
                  className="rounded-full border w-[50px] h-[50px]"
                />
                <img
                  src=""
                  alt=""
                  className="rounded-full border w-[50px] h-[50px]"
                />
              </div>
            </div>
          </section>
        </div>
        <div className="flex items-center justify-end pr-10 p-2">
          <button
            type="button"
            className=" cursor-pointer bg-green-600 p-2 w-[100px] text-white text-lg font-semibold rounded-lg"
          >
            Add
          </button>
        </div>
      </section>
    </main>
  );
};

export default AddnewProduct;
