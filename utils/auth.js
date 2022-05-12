// create an authguard for routes
const withAuth = (req, res, next) => {
    // if there no session exists
    if (!req.session.user_id) {
        //direct user to login
        res.redirect('/login');
    } else {
        // else keep moving
        next();
    }
};
  
module.exports = withAuth;