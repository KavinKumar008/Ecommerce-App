import React, { useState } from "react";
import cameraimg1 from "../assets/cameraimgviews/cameraimg1.jpeg";
import { RiImageAddFill } from "react-icons/ri";
import axios from "axios";
import { toast } from "react-toastify";

const AddnewProduct = () => {
  const [addInputs, setAddInputs] = useState({
    name: "",
    price: "",
    originalPrice: "",
    discount: "",
    rating: "",
    description: "",
    category: "",
    changeImages: [],
    image: "",
    isNeww: true,
  });
  const [image, setImage] = useState(null);
  const [changeImages, setChangeImages] = useState([]);
  const baseurl = import.meta.env.VITE_API_URL;

  console.log(addInputs, "addinputsssssss");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(URL.createObjectURL(file));
    setAddInputs({ ...addInputs, image: file });
  };

  const handleMultipleImagesChange = (e) => {
    const file = Array.from(e.target.files);
    const imageUrls = file.map((file) => URL.createObjectURL(file));
    setChangeImages(imageUrls);
    setAddInputs({ ...addInputs, changeImages: file });
  };

  const handleAddNewProduct = async () => {
    const formData = new FormData();

    formData.append("name", addInputs.name);
    formData.append("price", addInputs.price);
    formData.append("originalPrice", addInputs.originalPrice);
    formData.append("discount", addInputs.discount);
    formData.append("rating", addInputs.rating);
    formData.append("description", addInputs.description);
    formData.append("category", addInputs.category);
    formData.append("isNeww", addInputs.isNeww);

    formData.append("image", addInputs.image);

    addInputs.changeImages.forEach((imgFile) => {
      formData.append("changeImages", imgFile);
    });

    console.log(formData, "formdatatatatat");
    try {
      const res = await axios.post(`${baseurl}/addNewProduct`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.status === 200) {
        toast.success("Successfully added New Product");
        console.log(res);
      }
    } catch (error) {
      console.log(error);
      toast.error("Falied to Add New Product");
    }
  };
  return (
    <main className="bg-gray-200 h-screen flex items-center justify-center">
      <section className="bg-white w-screen h-screen xl:w-[950px] xl:h-[550px] lg:w-screen lg:h-screen md:w-screen md:h-screen sm:w-screen sm:h-screen lg:rounded-xl shadow-md flex flex-col overflow-y-auto lg:overflow-y-auto md:overflow-y-auto sm:overflow-y-auto">
        <div className="flex items-center justify-center pt-4 lg:h-[25%] h-[15%]">
          <div className="relative w-[100px] h-[100px]">
            <img
              src={image || ""}
              alt=""
              value={addInputs.image}
              className="rounded-full w-full h-full object-cover shadow-md"
            />
            <label
              htmlFor="productImage"
              className="absolute left-3 top-16 xl:left-3 xl:top-15 lg:left-2 lg:top-15 md:left-3 md:top-15 -translate-x-1/2 text-sm rounded-md px-3 py-1 cursor-pointer"
            >
              <RiImageAddFill className="text-black text-2xl" />
              <input
                id="productImage"
                type="file"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>
        </div>
        <div className="lg:flex lg:h-[75%] h-[85%]">
          <section className="flex flex-col lg:justify-evenly lg:w-[50%] w-full p-4 gap-4">
            <label htmlFor="" className="flex gap-5 items-center">
              <span className="w-20 lg:text-lg font-bold">Name</span>
              <input
                type="text"
                name="name"
                value={addInputs.name}
                placeholder="enter product name"
                className="lg:flex-1 flex-1 p-2 outline-none border border-gray-200 rounded-md"
                onChange={(e) =>
                  setAddInputs({
                    ...addInputs,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </label>
            <label htmlFor="" className="flex gap-5 items-center">
              <span className="w-20 lg:text-lg font-bold">Original Price</span>

              <input
                type="text"
                name="originalPrice"
                value={addInputs.originalPrice}
                placeholder="enter the original price"
                className="flex-1 p-2 outline-none border border-gray-200 rounded-md"
                onChange={(e) =>
                  setAddInputs({
                    ...addInputs,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </label>
            <label htmlFor="" className="flex gap-5 items-center">
              <span className="w-20 lg:text-lg font-bold">Rating</span>
              <input
                type="text"
                name="rating"
                value={addInputs.rating}
                placeholder="enter the rating"
                className="flex-1 p-2 outline-none border border-gray-200 rounded-md"
                onChange={(e) =>
                  setAddInputs({
                    ...addInputs,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </label>
            <label htmlFor="" className="flex gap-5 items-center">
              <span className="w-20 lg:text-lg font-bold">Description</span>
              <textarea
                rows={4}
                cols={30}
                name="description"
                value={addInputs.description}
                className="flex-1 outline-0 border border-gray-200 p-2"
                onChange={(e) =>
                  setAddInputs({
                    ...addInputs,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </label>
          </section>
          <section className="flex flex-col lg:justify-evenly lg:w-[50%] w-full p-4 gap-4">
            <label htmlFor="" className="flex gap-5 items-center">
              <span className="w-20 font-bold lg:text-lg">Price</span>
              <input
                type="text"
                name="price"
                value={addInputs.price || ""}
                placeholder="enter your price"
                className="flex-1 outline-none border border-gray-200 p-2 rounded-md"
                onChange={(e) =>
                  setAddInputs({
                    ...addInputs,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </label>
            <label htmlFor="" className="flex gap-5 items-center">
              <span className="w-20 font-bold lg:text-lg">Discount</span>
              <input
                type="text"
                name="discount"
                value={addInputs.discount || ""}
                placeholder="enter your discount"
                className="flex-1 outline-none border border-gray-200 p-2 rounded-md"
                onChange={(e) =>
                  setAddInputs({
                    ...addInputs,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </label>
            <div className="flex items-center gap-5">
              <label
                htmlFor=""
                className="lg:w-30 w-40 font-bold lg:text-lg text-[15px]"
              >
                Select your category
              </label>
              <select
                name="category"
                id=""
                value={addInputs.category || ""}
                className="flex-1 outline-none border border-gray-200 rounded-md p-3"
                onChange={(e) =>
                  setAddInputs({
                    ...addInputs,
                    [e.target.name]: e.target.value,
                  })
                }
              >
                <option value="">Select Catrgory</option>
                <option value={"electronic" || ""}>Electronic</option>
                <option value={"smartphone" || ""}>SmartPhone</option>
                <option value={"featured" || ""}>Featured</option>
              </select>
            </div>
            {/* <div className="xl:flex xl:gap-20 justify-evenly items-center flex gap-10">
              <span className="w-20 font-bold lg:text-lg">ChangeImages</span>
              <div className="flex-1 justify-evenly lg:flex lg:gap-10 flex">
                <img
                  src=""
                  alt="changeImage"
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
            </div> */}
            <div className="flex items-center gap-10">
              <label htmlFor="changeImagesInput">
                <span className="w-20 font-bold lg:text-lg">ChangeImages</span>
                <input
                  type="file"
                  multiple
                  id="changeImagesInput"
                  className="hidden"
                  onChange={handleMultipleImagesChange}
                />
                {changeImages?.length === 0 ? (
                  <RiImageAddFill className="cursor-pointer text-lg font-bold text-center" />
                ) : (
                  []
                )}
              </label>
              <div className="w-[100%] flex justify-around">
                {changeImages.map((image, ind) => (
                  <div key={ind}>
                    <img
                      src={image}
                      alt="changeimages"
                      className="rounded-full border w-[50px] h-[50px]"
                    />
                  </div>
                ))}
                <p>
                  {changeImages?.length === 0 ? (
                    <span className="text-sm font-bold text-red-400">
                      Select Maximum Three Images to Upload
                    </span>
                  ) : (
                    []
                  )}
                </p>
              </div>
            </div>
          </section>
        </div>
        <div className="flex items-center justify-end pr-10 p-2 mt-0 md:mt-20 sm:mt-20 lg:mt-0 xl:mt-0">
          <button
            type="button"
            className=" cursor-pointer bg-green-600 p-2 w-[100px] text-white text-lg font-semibold rounded-lg"
            onClick={handleAddNewProduct}
          >
            Add
          </button>
        </div>
      </section>
    </main>
  );
};

export default AddnewProduct;
