async function signupPost(req, res) {
    const { name, email, password } = req.body;

    try {
        
    } catch (error) {
        res.status(status_code.server_error).send(error.message);
    }
}