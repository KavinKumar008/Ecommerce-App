import React from "react";

const ProductCard = ({ product }) => {
  return (
    <div className="w-full max-w-[250px] p-4 rounded-xl shadow hover:shadow-lg transition duration-200 ease-in-out">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-contain mb-3"
      />
      <h2 className="text-lg font-semibold truncate">{product.name}</h2>
      <p className="text-xl font-bold text-black mt-1">₹ {product.price}</p>
    </div>
  );
};

export default ProductCard;
