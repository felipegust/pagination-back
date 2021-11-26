var mongoUtil = require('../services/db')


const getItens = async (req, res) => {
    const page = req.query.page ? Number(req.query.page) : 0;
    const itensPerPage = req.query.itensPerPage ? Number(req.query.itensPerPage) : 0;
    
    const limit = itensPerPage;
    const offset = page * itensPerPage;
    
    const result = await mongoUtil.findDocuments('restaurants', limit, offset);
    
    res.send(result)
}

const getCount = async (req,res) => {
    const count = await mongoUtil.countDocuments('restaurants');
    
    res.send({"count": count})
}

module.exports = {
    getItens,
    getCount
}