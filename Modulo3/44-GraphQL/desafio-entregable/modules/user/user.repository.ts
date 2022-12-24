import { DAOInterface } from "../dao.interface";
import { UserDTO } from "./user.dto";
import { UserDAOFactory } from "./user.factory";

export class UserRepository implements DAOInterface<UserDTO, string>{
    private userDAO: DAOInterface<UserDTO, string>

    constructor() {
        const userFactory = new UserDAOFactory()
        this.userDAO = userFactory.getDAO()
    }

    async getAll() : Promise<UserDTO[]> {
        return await this.userDAO.getAll()
    }

    async getById(email: string): Promise<UserDTO> {
        return await this.userDAO.getById(email)
    }

    async save(user: UserDTO): Promise<UserDTO> {
        return await this.userDAO.save(user)
    }

    async update(email: string, user: UserDTO): Promise<UserDTO> {
        return await this.userDAO.update(email, user)
    }

    async delete(email: string): Promise<boolean> {
        return await this.userDAO.delete(email)
    }


}