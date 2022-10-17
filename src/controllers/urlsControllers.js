import { nanoid } from 'nanoid/non-secure';
import { customAlphabet } from 'nanoid';
import { status_code } from '../enums/status.js';
import { connection } from '../pg/database.js';
import { urlSchema } from '../schemas/validationSchemas.js';

async function urlsPost(req, res) {
    const { url, idUser } = req.body;

    try {
        const isValid = urlSchema.validate({
            url
        });

        if(isValid.error) {
            return res.status(status_code.unprocessable_entity).send({"message": isValid.error});
        }

        const nanoid = customAlphabet('1234567890abcdef', 8);
        const shortUrl = nanoid();

        console.log("Resposta: ", idUser, url, shortUrl)

        await connection.query(`INSERT INTO shortens ("userId", url, "shortUrl", "visitCount") VALUES ($1, $2, $3, $4);`, [idUser, url, shortUrl, 0]);

        res.status(status_code.created).send({"shortUrl": shortUrl});
        return;
    } catch (error) {
        res.status(status_code.server_error).send(error.message);
    }
}

async function urlsIdGet(req, res) {
    const { id } = req.params;

    try {
        const urlId = await connection.query(
            `SELECT id, "shortUrl", "url" FROM shortens
            WHERE "id" = $1;`, [id]
            );

        if(!(urlId.rows).length) {
            res.status(status_code.not_found).send({"message": "A url encurtada não existe!"});
            return;
        }

        res.status(status_code.ok).send(urlId.rows[0]);
    } catch (error) {
        res.status(status_code.server_error).send(error.message);
    }
}

async function urlsOpenGet(req, res) {
    const { shortUrl } = req.params;
    try {
        const verificationUrl = await connection.query(`SELECT * FROM shortens WHERE "shortUrl" = $1;`, [shortUrl]);

        if(!(verificationUrl.rows).length) {
            res.status(status_code.not_found).send({"message": "A url encurtada não existe!"});
            return;
        }
        console.log("111111: ", verificationUrl.rows)

        const increment = verificationUrl.rows[0].visitCount + 1;

        await connection.query(
            `UPDATE 
                shortens 
            SET 
                "visitCount" = $1
            WHERE id = $2`, [increment, verificationUrl.rows[0].id]
        );

        console.log("222222: ",verificationUrl.rows[0].url)

        // res.status(status_code.ok);
        res.redirect(verificationUrl.rows[0].url);
    } catch (error) {
        res.status(status_code.server_error).send(error.message);
    }
}

async function urlsDelete(req, res) {
    const { id } = req.params;
    const { idUser } = req.body;

    try {
        const verificationIdUrl = await connection.query(
            `SELECT * FROM 
                shortens
            WHERE id = $1;`, [id]
        );

        if(!(verificationIdUrl.rows).length) {
            res.status(status_code.not_found).send({"message": "A url encurtada não existe!"});
            return;
        }

        if(idUser != verificationIdUrl.rows[0].userId) {
            res.status(status_code.unauthorized).send({"message": "Não é permitido excluir a url de outro usuário!"});
            return;
        }

        await connection.query(
            `DELETE FROM 
                shortens
            WHERE id = $1;`, [id]
        );

        res.status(status_code.no_content).send({"message": "URL encurtada excluída com sucesso!"});
    } catch (error) {
        res.status(status_code.server_error).send(error.message);
    }
}

export { urlsPost, urlsIdGet, urlsOpenGet, urlsDelete };
