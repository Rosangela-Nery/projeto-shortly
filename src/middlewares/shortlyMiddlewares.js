import { connection } from '../pg/database.js';
import { status_code } from '../enums/status.js';

async function isAuthenticated(req, res, next) {
    const { authorization  } = req.headers;

    try {
        const token = authorization?.replace('Bearer ', '');

        if(!token) {
            res.status(status_code.unauthorized).send({"message": "Header não enviado ou inválido"});
            return;
        }

        const authenticated = await connection.query(
            `SELECT * FROM 
                sessions 
            WHERE token = $1;
            `,
            [token]);

            if(!(authenticated.rows).length) {
                res.status(status_code.unauthorized).send({"message": "Usuário não autorizado!"});
                return;
            }

            req.body.idUser = authenticated.rows[0].userId;

            next();
    } catch (error) {
        res.status(status_code.server_error).send(error.message);
    }

}

async function hasUser(req, res, next) {
    const { idUser } = req.body;

    try {
        const isUser = await connection.query(
            `SELECT * FROM 
                users
            WHERE id = $1;
            `,
            [idUser]);

            if(!(isUser.rows).length) {
                res.status(status_code.not_found).send({"message": "Não tem usuário cadastrado!"});
                return;
            }

            next();
    } catch (error) {
        res.status(status_code.server_error).send(error.message);
    }
}

export { isAuthenticated, hasUser };