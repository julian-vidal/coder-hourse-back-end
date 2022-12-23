import {model, Schema} from "mongoose"
import { MongoConnection } from "../../database"
import {DAOInterface} from "../dao.interface"
import { UserDTO } from "./user.dto"

const UserSchema = new Schema<UserDTO>({
    email: {type: "String"},
    password: {type: "String"}
})

const UserModel = model("User", UserSchema)

export class UserDAOMongoImpl implements DAOInterface<UserDTO, string>{
    private userModel;

    constructor(){
        MongoConnection.connect()
        this.userModel = UserModel
    }

    async getAll() {
        return await this.userModel.find()
    }

    async getById(email: string) {
        try {
            return await this.userModel.findOne({email})
        } catch (error) {
            return false
        }
    }

    async save(user: UserDTO) {
        const userExists = this.getById(user.email)

        if(!userExists) {
            const _user = new this.userModel(user)
            _user.save()
            return _user
        }

        return {"error": `There's already a user with email ${user.email}`}
    }

    async update(email: string, user: UserDTO) {
        try {
            await this.userModel.update({email}, user)
            return user
        } catch (error) {
            return{"error": `No user with email ${user.email}`}
        }
    }

    async delete(email: string) {
        try {
            await this.userModel.deleteOne({email})
            return true
        } catch (error) {
            return false
        }
    }
}