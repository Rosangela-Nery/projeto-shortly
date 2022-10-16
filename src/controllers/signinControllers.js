import bcrypt from 'bcrypt';
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

        const encrypetPassword = bcrypt.hashSync(password, 12);

        const verifiction = await connection.query(
            `SELECT *
            FROM 
                users 
            WHERE email = $1 and password = $2`, [email, encrypetPassword]
        );

        if(!verifiction) {
            res.status(status_code.unauthorized).send({"message": "Senha ou usuário inválidos, tente novamente!"});
            return;
        }

        return res.send(status_code.ok);
    } catch (error) {
        res.status(status_code.server_error).send(error.message);
    }
}

export { signinPost }