import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from './app/reducer/categoriesSlice';

const ShowCategories2 = () => {
  const dispatch = useDispatch();
  const getAllCategories = useSelector((state) => state.categories.data);
  const categoriesLoading = useSelector((state) => state.categories.loading);

  const [categoryName, setCateogoryName] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`http://localhost:3001/api/v1/categories`, { name: categoryName });
      if (response) {
        dispatch(fetchCategories());
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (categoriesLoading == 'idle') {
      dispatch(fetchCategories());
    }
    console.log(getAllCategories);
  }, [categoriesLoading, dispatch]);

  return categoriesLoading == 'loading' ? (
    <h1>Loading</h1>
  ) : (
    <>
      <ul>
        {getAllCategories?.data?.map((category) => (
          <li key={category.id}>{category.name}</li>
        ))}
      </ul>
      <form onSubmit={submitHandler}>
        <input name="name" value={categoryName} onChange={(e) => setCateogoryName(e.target.value)}></input>
        <input type="submit" value={'submit'} />
      </form>
    </>
  );
};

export default ShowCategories2;
