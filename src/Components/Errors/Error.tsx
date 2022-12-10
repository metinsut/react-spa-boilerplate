import { useRouter, useRoute, useMatch } from '@tanstack/react-router';
import React from 'react';

export default function ErrorPage() {
  // const router = useRouter();
  // const match = useMatch('/user');
  // const route = useRoute('user');
  // console.log('router', router);
  // console.log('match', match.error);
  // console.log('route', route);
  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>{/* <i>{error.statusText || error.message}</i> */}</p>
    </div>
  );
}
