import { status_code } from '../enums/status.js';
import { connection } from '../pg/database.js';

async function rankingGet(req, res) {
    try {

        const ranking = await connection.query(
            `SELECT 
                users.id AS id,
                users.name AS name,
                COUNT(shortens.url) AS "LinksCount",
                SUM(shortens."visitCount") AS "visitCount"
            FROM
                shortens
            LEFT JOIN users ON users.id = shortens."userId"
            GROUP BY users.id, users.name
            ORDER BY "visitCount" DESC
            LIMIT 10;`
        );

        console.log("Reply: ", ranking.rows)

        res.status(status_code.ok).send(ranking.rows)
    } catch (error) {
        res.status(status_code.server_error).send(error.message);
    }
}

export { rankingGet }