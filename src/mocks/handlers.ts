import { rest } from 'msw';
import { faker } from '@faker-js/faker';
import { User } from 'types/users';

export const handlers = [
  // rest.post('/login', (req, res, ctx) => {
  //   // Persist user's authentication in the session
  //   sessionStorage.setItem('is-authenticated', 'true');

  //   return res(
  //     // Respond with a 200 status code
  //     ctx.status(200)
  //   );
  // }),

  rest.get('https://jsonplaceholder.typicode.com/users', (req, res, ctx) => {
    // Check if the user is authenticated in this session
    // const isAuthenticated = sessionStorage.getItem('is-authenticated');

    // if (!isAuthenticated) {
    //   // If not authenticated, respond with a 403 error
    //   return res(
    //     ctx.status(403),
    //     ctx.json({
    //       errorMessage: 'Not authorized'
    //     })
    //   );
    // }

    // If authenticated, return a mocked user details

    const users: User[] = [];

    function createRandomUser(): User {
      return {
        id: faker.datatype.uuid(),
        username: faker.internet.userName(),
        email: faker.internet.email(),
        name: faker.name.fullName(),
        phone: faker.phone.number(),
        website: faker.internet.domainName()
      };
    }

    Array.from({ length: 10 }).forEach(() => {
      users.push(createRandomUser());
    });

    return res(ctx.status(200), ctx.json(users));
  })
];
