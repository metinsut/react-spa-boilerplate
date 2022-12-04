import { sleep } from '../../helpers';

export type User = { id: number; title: string };

export async function userLoader() {
  const API = 'https://jsonplaceholder.typicode.com/posts';
  // await sleep(2000);
  try {
    const response = await fetch(API);
    if (!response.ok) throw new Error();

    const users: User[] = await response.json();

    return { users: users };
  } catch {
    throw new Response(null, {
      status: 500,
      statusText: 'Internal Server Error'
    });
  }
}
