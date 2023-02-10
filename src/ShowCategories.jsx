import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createCategories, fetchCategories } from './app/reducer/categoriesSlice2';
export const ShowCategories = () => {
  const dispatch = useDispatch();
  const getAllCategories = useSelector((state) => state.categories.data);
  const [categoryName, setCategoryName] = useState('');

  const categoriesStatus = useSelector((state) => state.categories.status);
  const error = useSelector((state) => state.categories.error);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      dispatch(createCategories({ name: categoryName }));
      // dispatch(fetchCategories());
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (categoriesStatus == 'idle') {
      dispatch(fetchCategories());
    }
  }, [categoriesStatus, dispatch]);
  return categoriesStatus === 'loading' ? (
    'Loading....'
  ) : (
    <>
      <ul>
        {getAllCategories?.data?.data?.map((category) => (
          <li key={category.id}>{category.name}</li>
        ))}
      </ul>
      <form onSubmit={submitHandler}>
        <label htmlFor="categories">Categories</label>
        <input type={'text'} name="name" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} required />
        <br />

        <input type="submit" value={'submit'} />
      </form>
    </>
  );
};
