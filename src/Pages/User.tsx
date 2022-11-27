import React, { useEffect } from 'react';
import { apiCall } from '../utils/axios';

export default function User() {
  const getData = async () => {
    const data = await apiCall.get('https://jsonplaceholder.typicode.com/posts');
  };

  useEffect(() => {
    getData();
  }, []);

  return <div>User</div>;
}
