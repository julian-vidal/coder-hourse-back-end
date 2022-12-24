import { UserDAOMongoImpl } from "./user.dao.mongo";
import { DATABASE } from "../../config";

export class UserDAOFactory {
    private userDAO
    
    getDAO() {
        switch (DATABASE){
            case "MYSQL":
                // this.userDAO = new userDAOMYSQLImpl()
                break;
            case "FIREBASE":
                // this.userDAO = new ProductFirebaseMongoImpl()
                break;
            default:
                this.userDAO = new UserDAOMongoImpl();
                break;
        }
        return this.userDAO
    }
}