const errorHandler = (err, req, res, next) => {
    console.log("Error Page")
    if(err.status) {
        res.status(err.status).json({msg: err.message})
    } else {
        res.status(500).json({msg: err.message})
    }
    
    next()
}

export default errorHandler