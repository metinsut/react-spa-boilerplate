import { createClient } from 'altogic';

const apiUrl = 'https://metinsut.c1-europe.altogic.com';
const clientKey = '520102d28341419e9a9f02ad32542e78';

const altogic = createClient(apiUrl, clientKey, {
  signInRedirect: '/login'
});

export default altogic;
