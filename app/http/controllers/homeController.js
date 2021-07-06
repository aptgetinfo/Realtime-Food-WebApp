const Menu =require('../../models/menu')


module.exports={
    index:async (req,res)=>{
        Items=await Menu.find()
        res.render('home',{Items:Items})
    },
}