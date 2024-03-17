import Auth from "../../models/User/User.model.js";
class UserController {
    async registerUser(req, res, next) {
        try {
            const { username, password, confirm, acceptTerms } = req.body;
            const response = await Auth.registerUser({
                username: username,
                password: password,
                confirm: confirm,
                acceptTerms: acceptTerms,
            });
            if (!response.authenticated) {
                req.session.isAuthenticated = false;
                return res.status(401).json(response);
            }
            req.session.isAuthenticated = true;
            res.status(201).json(response);
        }
        catch (err) {
            next(err);
        }
    }
    async loginUser(req, res, next) {
        try {
            const { username, password } = req.body;
            if (req.session.isAuthenticated) {
                return res.redirect("/check");
            }
            const response = await Auth.loginUser({
                username: username,
                password: password,
            });
            if (!response.authenticated) {
                req.session.isAuthenticated = false;
                return res.status(401).json(response);
            }
            req.session.isAuthenticated = true;
            res.status(201).json(response);
        }
        catch (error) {
            next(error);
        }
    }
    async checkUser(req, res, next) {
        try {
            if (!req.session.isAuthenticated) {
                const response = { authenticated: false };
                return res.status(400).json(response);
            }
            const response = { authenticated: true };
            return res.status(200).json(response);
        }
        catch (error) {
            next(error);
        }
    }
    async logoutUser(req, res, next) {
        try {
            req.session.destroy(() => {
                const response = {
                    authenticated: true,
                    message: "You have succesfully logged out.",
                };
                return res.status(200).json(response);
            });
        }
        catch (error) {
            next(error);
        }
    }
}
export default UserController;
