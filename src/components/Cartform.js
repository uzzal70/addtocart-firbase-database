import React, { useState } from 'react';
import { database } from './../firebase';
import Modal from 'react-modal';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { useCart } from '../context/CartContext';
const Cartform = ({ change, setChange, open, closeModal }) => {
  const { checkout } = useCart();
  const [value, setValue] = useState({
    name: '',
    contact: '',
    address: '',
  });
  const usersCollectionRef = collection(database, 'users');
  const handleSubmit = async (e) => {
    e.preventDefault();
    await addDoc(usersCollectionRef, value);
    alert('Data submitted successfully!');
    setValue({
      name: '',
      contact: '',
      address: '',
    });
    checkout();
    closeModal();
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValue((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <Modal
      isOpen={open}
      onRequestClose={closeModal}
      style={{
        overlay: {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
        },
        content: {
          margin: '10px',
          padding: '0',
          inset: 'auto',
          boxShadow:
            'var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        },
      }}
    >
      <section className="text-gray-700 body-font overflow-hidden">
        <div className="container px-4 py-4 mx-auto">
          <div className="mx-auto flex items-center">
            <div className="max-w-md mx-auto mt-8">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-gray-700">Name:</label>
                  <input
                    type="text"
                    name="name"
                    value={value.name}
                    onChange={handleChange}
                    className="mt-1 p-2 border rounded-md w-full"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Contact:</label>
                  <input
                    type="text"
                    name="contact"
                    value={value.contact}
                    onChange={handleChange}
                    className="mt-1 p-2 border rounded-md w-full"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Address:</label>
                  <input
                    type="text"
                    name="address"
                    value={value.address}
                    onChange={handleChange}
                    className="mt-1 p-2 border rounded-md w-full"
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Modal>
  );
};

export default Cartform;
