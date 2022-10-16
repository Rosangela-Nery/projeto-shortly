import bcrypt from 'bcrypt';
import { status_code } from '../enums/status.js';
import { connection } from '../pg/database.js';
import { signUpSchema } from '../schemas/validationSchemas.js';

async function signupPost(req, res) {
    const { name, email, password, confirmPassword } = req.body;

    try {
        const isValid = signUpSchema.validate({
            name, email, password, confirmPassword
        });

        if(isValid.error) {
            return res.sendStatus(status_code.unprocessable_entity).send({"message": isValid.error});
        }

        const emailExist = await connection.query("SELECT * FROM users WHERE email=($1);", [email]);
    
        if((emailExist.rows).length) {
            res.status(status_code.conflict).send({"message": "Esse email já está cadastrado!"});
            return;
        }

        const encrypetPassword = await bcrypt.hash(password, 12);

        await connection.query(`INSERT INTO users (name, email, password) VALUES ($1, $2, $3);`, [name, email, encrypetPassword]);

        return res.sendStatus(status_code.created);
    } catch (error) {
        res.status(status_code.server_error).send(error.message);
    }
}

export { signupPost };