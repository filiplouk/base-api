import { pool } from "../../config/db.js";
import bcrypt from "bcrypt";
class Auth {
    static registerUser({ username, password, confirm, acceptTerms, }) {
        return new Promise((resolve, reject) => {
            if (!acceptTerms || password !== confirm) {
                return resolve({
                    authenticated: false,
                    message: "Terms not accepted or passwords do not match",
                });
            }
            const saltRounds = 10;
            const hashedPassword = bcrypt.hashSync(password, saltRounds);
            const sql = "INSERT INTO Users (username, password) VALUES (?, ?)";
            pool.query(sql, [username, hashedPassword], (error, results) => {
                if (error) {
                    if (error.code === "ER_DUP_ENTRY") {
                        return resolve({
                            authenticated: false,
                            message: "User already exists.",
                        });
                    }
                    reject(error);
                }
                else {
                    resolve({
                        authenticated: true,
                        message: "User Succesfully registered.",
                        userId: results.insertId,
                    });
                }
            });
        });
    }
    static loginUser({ username, password, }) {
        return new Promise((resolve, reject) => {
            const sql = "SELECT password, UserID FROM Users WHERE username=?";
            pool.query(sql, [username], async (error, results) => {
                if (error) {
                    reject(error);
                }
                else {
                    const userId = results[0]?.UserID;
                    const userPassword = results[0]?.password;
                    if (userId) {
                        const match = await bcrypt.compare(password, userPassword);
                        if (match) {
                            resolve({
                                authenticated: true,
                                message: "Succesfully logged in.",
                                userId: userId,
                            });
                        }
                        else {
                            resolve({
                                authenticated: false,
                                message: "Wrong username or password.",
                            });
                        }
                    }
                    else {
                        resolve({ authenticated: false, message: "User not found." });
                    }
                }
            });
        });
    }
}
export default Auth;
