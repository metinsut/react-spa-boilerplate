import { User } from 'types/users';

export async function userLoader() {
  const API = 'https://jsonplaceholder.typicode.com/users';

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
