# Instructions
1. `npm i`
2. `npm run dev -- -p=<PORT> -m=<FORK|CLUSTER> -db=<DATABASE_TYPE> `
3. To run an Axios request:
   * Go to `utils/axios.ts` and uncomment the line(s) for the request(s) you want to run
   * Open a new terminal and run `npm run axios`
4. To run tests with Mocha, Chai, and Supertest, open a new terminal and run `npm run test`

# Important Notes
* The only DAO in place is Mongo
* The frontend has been removed, for this challenge we only care about the backend

# GraphQL

The endpoint for GraphQL: http://localhost:8080/productsgraphql/

Some sample requests:

```
query {
  getProduct(id: 2) {
    name, price, picture
  }
  
  getProducts{name, price}   
}

# mutation {
  # createProduct(product: {
  #   id: 4,
  #   name: "Test4",
  #   price: 44,
  #   stock: 44,
  #   picture: "https://via.placeholder.com/444"
  # }) {
  #   id, name
  # }
  
  # updateProduct(id: 1, product: {
  #   stock: 111
  # }) {
  #   name, stock
  # }
  
  # deleteProduct(id: 4)
# }
```
