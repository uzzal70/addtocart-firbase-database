// DisplayData.js

import React, { useState, useEffect } from 'react';
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import { database } from '../firebase';

const UserData = () => {
  const [data, setData] = useState([]);
  const usersCollectionRef = collection(database, 'users');
  useEffect(() => {
    const getUsers = async () => {
      const items = await getDocs(usersCollectionRef);
      setData(items.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getUsers();
  }, []);

  return (
    <div>
      <div className="mt-8 max-w-xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">User Buy List</h2>
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Id</th>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Contact</th>
              <th className="py-2 px-4 border-b">Address</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, i) => (
              <tr key={i}>
                <td className="py-2 px-4 border-b">{item.id}</td>
                <td className="py-2 px-4 border-b">{item.name}</td>
                <td className="py-2 px-4 border-b">{item.contact}</td>
                <td className="py-2 px-4 border-b">{item.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserData;
