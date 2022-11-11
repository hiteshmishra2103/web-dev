function protectRoutes(req, res, next) {
//to check whether the user is authenticated    
  if (!res.locals.isAuth) {
    return res.redirect("/401");//
  }

//to check whether the user is authorized as well as authenticated to view the content
  if (req.path.startsWith("/admin") && !res.locals.isAdmin) {
    return res.redirect("/403");//403 is the status code for telling the user or browser that user is not authorised
  }

  next();

}

module.exports = protectRoutes;
