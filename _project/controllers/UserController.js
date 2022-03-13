
import UserService from '../services/UserService';
import Util from '../utils/Utils';
import AuthUtils from '../utils/AuthUtils';

const util = new Util();

class UserController {
    static async getAll(req, res) {
        try {
            const allUsers = await UserService.getAll()
            if (allUsers.length > 0) {
                util.setSuccess(200, 'User retrieved', allUsers)
            } else {
                util.setSuccess(200, 'Not found')
            }
            return util.send(res)
        } catch (error) {
            util.setError(400, error.message);
            return util.send(res);
        }
    }
}
export default UserController; 
