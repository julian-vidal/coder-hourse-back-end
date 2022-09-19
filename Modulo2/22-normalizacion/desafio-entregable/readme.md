# Instructions

1. `npm i`
2. Create a db to store products data at MariaDB.
3. Create *.env* file filling up this data properly:
```
DATABASE_HOST=localhost
DATABASE_PORT=3306
DATABASE_USER=root
DATABASE_PASSWORD=root_password
DATABASE_NAME=products_db
```
3. `npm run migrate-products`
4. `npm run seed-products`
5. `npm run dev`