import storeItems from '../items.json';
import { useEffect, useState } from 'react';
import Cart from './Cart';
import useAlan from './../hooks/useAlan';
import Cartform from './Cartform';
import UserData from './UserData';
import Store from './Store';
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import { database } from '../firebase';

const Home = () => {
  useAlan();
  const usersCollectionRef = collection(database, 'products');
  const [change, setChange] = useState(false);
  const [open, setOpen] = useState(false);

  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };
  const [data, setData] = useState([]);
  const changeHandler = () => {
    setChange(!change);
  };
  useEffect(() => {
    const getProducts = async () => {
      const items = await getDocs(usersCollectionRef);
      setData(items.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getProducts();
  }, [change]);
  return (
    <div>
      <Store items={data} />
      <Cart open={open} openModal={openModal} closeModal={closeModal} />
    </div>
  );
};

export default Home;
