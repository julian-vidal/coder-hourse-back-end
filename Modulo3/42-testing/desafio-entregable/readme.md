# Instructions
1. `npm i`
2. `npm run dev -- -p=<PORT> -m=<FORK|CLUSTER> -db=<DATABASE_TYPE> `
3. To run an Axios request:
   * Go to `utils/axios.ts` and uncomment the line(s) for the request(s) you want to run
   * Open a new terminal and run `npm run axios`
4. To run tests with Mocha, Chai, and Supertest: `npm run test`


# Important Notes
* The only DAO in place is Mongo
* The frontend has been removed, for this challenge we only care about the backend