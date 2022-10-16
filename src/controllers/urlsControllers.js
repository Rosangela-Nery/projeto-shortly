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
    const { id, shortUrl } = req.params;
    try {
        const verificationUrl = await connection.query(`SELECT * FROM shortens WHERE "shortUrl" = $1;`, [shortUrl]);

        if(!(verificationUrl.rows).length) {
            res.status(status_code.not_found).send({"message": "A url encurtada não existe!"});
            return;
        }

        const incrementUrl = await connection.query(
            `INSERT INTO 
                "shortens" 
                "visitCount" = "visitCount" + 1
            WHERE id = $1`, [id]
        );

        res.redirect(incrementUrl);
    } catch (error) {
        res.status(status_code.server_error).send(error.message);
    }
}

export { urlsPost, urlsIdGet, urlsOpenGet };
