import { pool } from "../../config/db.js";
class Auth {
    static registerUser({ username, password }) {
        return new Promise((resolve, reject) => {
            const sql = "INSERT INTO Users (username, password) VALUES (?, ?)";
            pool.query(sql, [username, password], (error, results) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(results.insertId);
                }
            });
        });
    }
    static loginUser({ username, password }) {
        return new Promise((resolve, reject) => {
            const sql = "INSERT INTO Users (username, password) VALUES (?, ?)";
            pool.query(sql, [username, password], (error, results) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(results.insertId);
                }
            });
        });
    }
}
export default Auth;
