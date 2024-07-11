const db = require('../dbconnection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports.home = (req, res) => {
    res.send('api working ...');
}

// 회원가입
module.exports.signup = async (req, res) => {
    console.log(req.body, 'data##');
    const { name, email, id, password } = req.body;

    // first check email id already exist
    let emailchkqry = `SELECT user_id FROM users WHERE user_id = ?`;
    db.query(emailchkqry, [id], async (err, result) => {
        if (err) throw err;

        // check email id already exists
        if (result.length > 0) {
            res.send({
                status: false,
                msg: 'id already exists'
            });
        } else {
            // password encrypt
            const encryptedPwd = await bcrypt.hash(password, 10);

            // insert data
            let insertqry = `INSERT INTO users (user_name, user_email, user_id, user_pw, user_bcrypt_pw) VALUES (?, ?, ?, ?, ?)`;
            db.query(insertqry, [name, email, id, password, encryptedPwd], (err, result) => {
                if (err) throw err;

                res.send({
                    status: true,
                    msg: 'user register successful'
                });
            });
        }
    });
}

// 로그인
module.exports.login = async (req, res) => {
    console.log(req.body, 'login');
    const { id, password } = req.body;

    // check id, password
    let chkId = `SELECT * FROM users WHERE user_id = ?`;
    db.query(chkId, [id], async (err, result) => {
        if (err) throw err;

        if (result.length > 0) {
            // check password
            let data = {
                name: result[0].name,
                email: result[0].email
            }
            const match = await bcrypt.compare(password, result[0].user_bcrypt_pw);
            if (match) {
                const token = jwt.sign({data}, 'privatekey');
                console.log(match, 'match##');
                res.send({
                    status: true,
                    token: token,
                    result: data, 
                    msg: 'login successful'
                });
            } else {
                res.send({
                    status: false,
                    msg: 'invalid password'
                });
            }
        } else {
            res.send({
                status: false,
                msg: 'invalid id'
            });
        }
    });
}
