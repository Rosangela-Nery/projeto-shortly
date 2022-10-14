import { status_code } from '../enums/status.js';
import { signUpSchema } from '../schemas/validationSchemas.js';
import { connection } from '../pg/database.js';

async function signupPost(req, res) {
    const { name, email, password } = req.body;

    try {
        const isValid = signUpSchema.validate({
            name, email, password
        });

        if(isValid.error) {
            return res.send(status_code.unprocessable_entity);
        }

        const emailExist = await connection.query("SELECT * FROM users WHERE email=($1);", [email]);
    
        if((emailExist.rows).length) {
            res.status(status_code.conflict).send({"message": "Esse email já está cadastrado!"});
            return;
        }

        await connection.query(`INSERT INTO users (name, email, password) VALUES ($1, $2, $3);`, [name, email, password]);

        return res.send(status_code.created);
    } catch (error) {
        res.status(status_code.server_error).send(error.message);
    }
}

export { signupPost };