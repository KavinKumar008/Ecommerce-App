import React from "react";
import cameraimg1 from "../assets/cameraimgviews/cameraimg1.jpeg";

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
  });
  const [image, setImage] = useState(null);
  const [changeImages, setChangeImages] = useState([]);

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
              <span className="w-20 text-lg font-bold">Original Price</span>

              <input
                type="text"
                name="originalPrice"
                value={addInputs.originalPrice}
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
