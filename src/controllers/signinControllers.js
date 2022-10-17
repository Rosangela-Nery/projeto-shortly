import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import { status_code } from '../enums/status.js';
import { signInSchema } from '../schemas/validationSchemas.js';
import { connection } from '../pg/database.js';

async function signinPost(req, res) {
    const { email, password } = req.body;

    try {
        const isValid = signInSchema.validate({
            email, password
        });

        if(isValid.error) {
            return res.send(status_code.unprocessable_entity);
        }

        const verification = await connection.query(
            `SELECT * FROM
                users
            WHERE email = $1 limit 1;`, [email]
        );

        if(!(verification.rows).length) {
            res.status(status_code.unauthorized).send({"message": "Senha ou usuário inválidos, tente novamente!"});
            return;
        }

        const encrypetPassword = await bcrypt.compare(password, verification.rows[0]?.password);

        if(!encrypetPassword) {
            res.status(status_code.unauthorized).send({"message": "Senha ou usuário inválidos, tente novamente!"});
            return;
        }

        const token = uuid();
        await connection.query(
            `INSERT INTO 
                sessions ("userId", token)
            VALUES ($1, $2);`, [verification.rows[0]?.id, token]);

        return res.send({token});
    } catch (error) {
        res.status(status_code.server_error).send(error.message);
    }
}

export { signinPost }