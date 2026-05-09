import React, { useContext, useState } from "react";
import { assets, categories } from "../../assets/assets";
import { AppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const AddProduct = () => {

  const { axios } = useContext(AppContext);

  const [files, setFiles] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [offerPrice, setOfferprice] = useState('');

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const formData = new FormData();

      formData.append("name", name);
      formData.append("price", price);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("offerPrice", offerPrice);

      for (let i = 0; i < files.length; i++) {
        if (files[i]) {
          formData.append("image", files[i]);
        }
      }

      const { data } = await axios.post("/api/product/add-product", formData);

      if (data.success) {
        toast.success(data.message);

        setName('');
        setPrice('');
        setDescription('');
        setCategory('');
        setOfferprice('');
        setFiles([]);

      } else {
        toast.error(data.message);
      }

    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  return (
    <div className="py-10 flex flex-col justify-between bg-white">
      <form
        onSubmit={handleSubmit}
        className="md:p-10 p-4 space-y-5 max-w-lg"
      >

        {/* IMAGE UPLOAD */}
        <div>
          <p className="text-base font-medium">Product Image</p>

          <div className="flex flex-wrap items-center gap-3 mt-2">
            {Array(4).fill('').map((_, index) => (
              <label key={index} htmlFor={`image${index}`}>
                
                <input
                  onChange={(e) => {
                    const updatedFiles = [...files];
                    updatedFiles[index] = e.target.files[0];
                    setFiles(updatedFiles);
                  }}
                  accept="image/*"
                  type="file"
                  id={`image${index}`}
                  hidden
                />

                <img
                  className="max-w-24 cursor-pointer"
                  src={
                    files[index]
                      ? URL.createObjectURL(files[index])
                      : assets.upload_area
                  }
                  alt="upload"
                  width={100}
                  height={100}
                />
              </label>
            ))}
          </div>
        </div>

        {/* PRODUCT NAME */}
        <div className="flex flex-col gap-1 max-w-md">
          <label className="text-base font-medium">
            Product Name
          </label>

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Type here"
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
            required
          />
        </div>

        {/* DESCRIPTION */}
        <div className="flex flex-col gap-1 max-w-md">
          <label className="text-base font-medium">
            Product Description
          </label>

          <textarea
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 resize-none"
            placeholder="Type here"
          />
        </div>

        {/* CATEGORY */}
        <div className="w-full flex flex-col gap-1">

          <label className="text-base font-medium">
            Category
          </label>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
          >
            <option value="">Select Category</option>

            {categories.map((category, index) => (
              <option key={index} value={category.path}>
                {category.path}
              </option>
            ))}

          </select>
        </div>

        {/* PRICE */}
        <div className="flex items-center gap-5 flex-wrap">

          <div className="flex-1 flex flex-col gap-1 w-32">
            <label className="text-base font-medium">
              Product Price
            </label>

            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="0"
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
              required
            />
          </div>

          {/* OFFER PRICE */}
          <div className="flex-1 flex flex-col gap-1 w-32">

            <label className="text-base font-medium">
              Offer Price
            </label>

            <input
              type="number"
              value={offerPrice}
              onChange={(e) => setOfferprice(e.target.value)}
              placeholder="0"
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
              required
            />
          </div>
        </div>

        {/* BUTTON */}
        <button
          type="submit"
          className="px-8 py-2.5 bg-indigo-500 text-white font-medium rounded"
        >
          ADD
        </button>

      </form>
    </div>
  );
};

export default AddProduct;