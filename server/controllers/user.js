const bcrypt = require('bcryptjs');

module.exports = {
    register: async (req, res) => {
        const db = req.app.get('db');
        const {username, password} = req.body;
        
        
        try {
            const [existingUser] = await db.user.find_user_by_username(username);

            if(existingUser) {
                return res.status(409).send('Username already exists')
            }

            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(password, salt);
            // const profile_pic = `https://robohash.org/${username}.png`;
            const [newUser] = await db.user.create_user(username, hash, `https://robohash.org/${username}.png`)

            req.session.user = newUser;

            res.status(200).send(newUser)
            
        } catch(err) {
            console.log(err)
            return res.sendStatus(500)
        }
    },

    // login: async (req, res) => {
    //     const db = req.app('db');
    //     const {username, password} = req.body;
        
    //     const [existingUser] = await db.user.find_user_by_username(username);
    //         .then(([existingUser]) => {
    //             if(!existingUser){
    //                 return res.status(403).send('Incorrect Username')
    //             }
    //             const isAuthenticated = bcrypt.compareSync(password, existingUser.hash)
                
    //             if(!isAuthenticated){
    //                 return res.status(403).send('Incorrect Password')
    //             }
                
    //             delete existingUser.hash;

    //             req.session.user = existingUser;
    //             res.status(200).send(req.session.user)
    //         })
    // },
    login: async (req, res) => {
        const db = req.app.get('db')
        const { username, password } = req.body
    
    
        const [existingUser] = await db.user.find_user_by_username([username])
        if (!existingUser) {
          return res.status(404).send('User does not exist')
        }
    
        console.log(existingUser)
        const isAuthenticated = bcrypt.compareSync(password, existingUser.password)
        if (!isAuthenticated) {
          return res.status(401).send('Incorrect password')
        }
    
        delete existingUser.password
    
        req.session.user = existingUser
        res.status(200).send(existingUser)
      },
    

    getUser: async (req, res) => {
        if (req.session.user) {
            res.status(200).send(req.session.user);
        } else {
            res.status(404).send("ERROR 404: No session found");
        }
    },

    logout: (req, res) => {
        req.session.destroy();
        res.sendStatus(200);
    },
};