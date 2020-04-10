const getUsers = (req, res, db)=> {
    db.select('*').from('users')
        .then(user => {
            if(user.length){
                res.json(user)
            }
        })
        .catch(err => res.status(400).json('error in getting user'))
}

module.exports = {
    getUsers:getUsers
}