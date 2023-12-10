import React, { useEffect, useState } from 'react';
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import { database } from './firebase';
const AddProducts = () => {
  const [data, setData] = useState([]);
  const [change, setChange] = useState(false);
  const [value, setValue] = useState({
    name: '',
    image: '',
    price: '',
    color: '',
    test: '',
  });
  const usersCollectionRef = collection(database, 'products');
  const handleSubmit = async (e) => {
    e.preventDefault();
    await addDoc(usersCollectionRef, value);
    alert('Add Product successfully!');
    setValue({
      name: '',
      image: '',
      price: '',
      color: '',
      test: '',
    });
    setChange(!change);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValue((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  useEffect(() => {
    const getProducts = async () => {
      const items = await getDocs(usersCollectionRef);
      setData(items.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getProducts();
  }, [change]);
  const deleteProduct = async (id) => {
    const userDoc = doc(database, 'products', id);
    await deleteDoc(userDoc);
    alert('Add Product successfully!');
    setChange(!change);
  };

  return (
    <div>
      <div className="max-w-md mx-auto mt-8">
        <h1 className="text-4xl font-bold text-blue-700 mb-4">Add Products</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-600"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Name"
              required
              value={value.name}
              onChange={handleChange}
              className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          <div>
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-600"
            >
              Image link
            </label>
            <input
              type="text"
              id="image"
              name="image"
              required
              placeholder="https://example.com/image.png"
              value={value.image}
              onChange={handleChange}
              className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-600"
            >
              Price
            </label>
            <input
              type="text"
              id="price"
              name="price"
              placeholder="Price"
              required
              value={value.price}
              onChange={handleChange}
              className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          <div>
            <label
              htmlFor="color"
              className="block text-sm font-medium text-gray-600"
            >
              Color
            </label>
            <input
              type="text"
              id="color"
              name="color"
              placeholder="Fruit Color"
              required
              value={value.color}
              onChange={handleChange}
              className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          <div>
            <label
              htmlFor="test"
              className="block text-sm font-medium text-gray-600"
            >
              Test
            </label>
            <input
              type="text"
              id="test"
              name="test"
              placeholder="Fruit Test"
              required
              value={value.test}
              onChange={handleChange}
              className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          <div>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
            >
              Submit
            </button>
          </div>
        </form>
      </div>

      <div className="mt-8 max-w-xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Product List</h2>
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Id</th>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Price</th>
              <th className="py-2 px-4 border-b">Color</th>
              <th className="py-2 px-4 border-b">Test</th>
              <th className="py-2 px-4 border-b">Image</th>
              <th className="py-2 px-4 border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, i) => (
              <tr key={i}>
                <td className="py-2 px-4 border-b">{item.id}</td>
                <td className="py-2 px-4 border-b">{item.name}</td>
                <td className="py-2 px-4 border-b">{item.price}</td>
                <td className="py-2 px-4 border-b">{item.color}</td>
                <td className="py-2 px-4 border-b">{item.test}</td>
                <td className="py-2 px-4 border-b">
                  <img src={item.image} alt="" width="20px" />
                </td>
                <td className="py-2 px-4 border-b">
                  <button
                    onClick={() => deleteProduct(item.id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:border-red-300"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AddProducts;
