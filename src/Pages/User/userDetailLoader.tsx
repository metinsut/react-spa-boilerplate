import { sleep } from '../../helpers';

export type UserDetail = { id: number; body: string };

export async function userDetailLoader() {
  const API = 'https://jsonplaceholder.typicode.com/comments';
  // await sleep(2000);
  try {
    const response = await fetch(API);
    if (!response.ok) throw new Error();

    const userDetail: UserDetail[] = await response.json();
    return { userDetail: userDetail };
  } catch {
    throw new Response(null, {
      status: 500,
      statusText: 'Internal Server Error'
    });
  }
}
