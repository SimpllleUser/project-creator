
import database from '../db';
class UserService {

    static async getAll() {
        try {
            return await database.User.findAll();
        } catch (error) {
            throw error
        }
    }

    static async addOne(newUser) {
        try {
            return await database.User.create(newUser);
        } catch (error) {
            throw error
        }
    }

    static async updateOne(id, updateUser) {
        try {
            const userToUpdate = await database.User.findOne(updateUser, {
                where: {
                    id: id
                }
            }); if (userToUpdate) {
                return await database.User.update(updateUser, {
                    where: {
                        id: id
                    }
                });
            }
        } catch (error) {
            throw error
        }
    }

    static async getOne(id) {
        try {
            return await database.User.findOne({
                where: {
                    id: id
                }
            });
        } catch (error) {
            throw error
        }
    }

    static async getOneByUsername(username) {
        try {
            return await database.User.findOne({
                where: {
                    username: username
                }
            });
        } catch (error) {
            throw error
        }
    }

    static async deleteOne(id) {
        try {
            const userToDelete = await database.User.findOne(updateUser, {
                where: {
                    id: id
                }
            }); if (userToDelete) {
                return await database.User.destroy({
                    where: {
                        id: id
                    }
                });
            }
        } catch (error) {
            throw error
        }
    }
}
export default UserService;


