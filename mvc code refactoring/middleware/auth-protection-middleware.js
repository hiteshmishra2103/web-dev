function guardRoute(req,res, next){
    if(!res.locals.isAuth){
        return res.redirect("/401");
    }
}