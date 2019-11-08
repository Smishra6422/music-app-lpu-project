module.exports = {
    checkAuthenticated: (req, res, next) => {
        if(req.isAuthenticated()) {
            return next()
            console.log(req)
        }
        req.flash('error_msg', 'Please log in to explore more');
        res.redirect('/users/login')
    }
}