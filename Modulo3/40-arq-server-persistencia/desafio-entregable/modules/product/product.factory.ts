import { ProductDAOMongoImpl } from "./product.dao.mongo";
import { DATABASE } from "../../config";
export class ProductDAOFactory {
    private productDAO

    getDAO() {
        switch (DATABASE){
            case "MYSQL":
                // this.productDAO = new ProductDAOMYSQLImpl()
                break;
            case "FIREBASE":
                // this.productDAO = new ProductFirebaseMongoImpl()
                break;
            default:
                this.productDAO = new ProductDAOMongoImpl();
                break;
        }
        return this.productDAO
    }
}