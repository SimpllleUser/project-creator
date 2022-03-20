
import UserService from '../services/UserService';
import Util from '../utils/Utils';
import AuthUtils from '../utils/AuthUtils';

const util = new Util();

class AuthController {

    static async login(req, res) {
        try {
            const theUser = await UserService.getOneByUserName(req.body.username);

            if (theUser) {
                theUser.token = await AuthUtils.generateJwtToken(theUser);
                ; const savedUser = await theUser.save();
                ; util.setSuccess(200, 'User retrieved', savedUser);

            } else {
                util.setSuccess(200, 'Not found');

            }
            return util.send(res);

        } catch (error) {
            util.setError(400, error.message);
            return util.send(res);
        }
    }
}
export default AuthController; 
