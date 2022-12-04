import React from 'react';
import { useMatch } from '@tanstack/react-router';

export default function UserDetail() {
  const {
    loaderData: { userDetail }
  } = useMatch('/user/detail');

  const detail = userDetail.slice(0, 3);

  return (
    <div>
      <div>More detail</div>
      <div>{JSON.stringify(detail)}</div>
    </div>
  );
}
