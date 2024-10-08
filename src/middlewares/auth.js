const adminAuth = (req, res, next)=>{

    console.log("Admin Auth is getting checked !!");
    const token = "xyzdasdasa";
    const isAdminauthorized =  token === "xyz";
    if (!isAdminauthorized){
        res.status(401).send("unauthorized request")
    }
    else{
        next();
    }
}

const userAuth = (req, res, next)=>{
    console.log("USER Auth is getting checked !!");
    const token = "xyz";
    const isAdminauthorized =  token === "xyz";
    if (!isAdminauthorized){
        res.status(401).send("unauthorized request")
    }
    else{
        next();
    }
}

module.exports = {
    adminAuth,
    userAuth
}