import { status_code } from '../enums/status.js';
import { connection } from '../pg/database.js';

async function usersGet(req, res) {
    const { idUser } = req.body;
    try {
        const usersMe = await connection.query(
            `SELECT 
                users.id AS id, users.name AS name, SUM(shortens."visitCount") AS "visitCount" 
            FROM
                users
            JOIN shortens ON users.id = shortens."userId"
            WHERE users.id = $1
            GROUP BY users.id, users.name;`, [idUser]
        );

        const userUrls =  await connection.query(
            `SELECT 
                id, "shortUrl", url, "visitCount" 
            FROM 
                shortens
            WHERE "userId" = $1;`, [idUser]
        );

        usersMe.rows[0].shortenedUrls = userUrls.rows;

        return res.status(status_code.ok).send(usersMe.rows[0]);
    } catch (error) {
        res.status(status_code.server_error).send(error.message);
    }
}

export { usersGet }