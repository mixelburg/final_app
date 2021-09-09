const ash = (callback) => {
    return (req, res, next) => {
        callback(req, res, next).catch(next)
    }
}

export default ash
