
import UserService from '../services/UserService';
import Util from '../utils/Utils';
import AuthUtils from '../utils/AuthUtils';

const util = new Util();

class UserController {

    static async getAll(req, res) {
        try {
            const allUsers = await UserService.getAll();

            if (allUsers.length > 0) {
                util.setSuccess(200, 'User retrieved', allUsers);

            } else {
                util.setSuccess(200, 'Not found');

            }
            return util.send(res);

        } catch (error) {
            util.setError(400, error.message);
            return util.send(res);
        }
    }

    static async addOne(req, res) {
        try {
            req.body.password = await AuthUtils.generatePasswordHash(req.body.password);
            const createdUser = await UserService.addOne(req.body);
            util.send(201, 'User added!', createdUser);
            return util.send(res);

        } catch (error) {
            util.setError(400, error.message);
            return util.send(res);
        }
    }

    static async updateOne(req, res) {
        try {
            const updatedUser = await UserService.updateOne(req.body.id, req.body);
            util.send(201, 'Updated  user added!', updatedUser);
            return util.send(res);

        } catch (error) {
            util.setError(400, error.message);
            return util.send(res);
        }
    }

    static async getOne(req, res) {
        try {
            const theUser = await UserService.getOne(req.body.id);
            util.send(200, 'Found user!', theUser);
            return util.send(res);

        } catch (error) {
            util.setError(400, error.message);
            return util.send(res);
        }
    }

    static async deleteOne(req, res) {
        try {
            await UserService.deleteOne(req.body.id);
            util.send(200, 'Deleted user!');
            return util.send(res);

        } catch (error) {
            util.setError(400, error.message);
            return util.send(res);
        }
    }
}
export default UserController; 
