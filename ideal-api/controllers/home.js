module.exports.index =async (req,res)=>{
    res.render('index',{ csrfToken: req.csrfToken() })
}