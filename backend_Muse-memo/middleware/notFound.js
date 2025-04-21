const notFound = (req, res, next) => {
    console.log("Not found page")
    const error = new Error('Not found')
    error.status = 404
    
    next(error)
}

export default notFound