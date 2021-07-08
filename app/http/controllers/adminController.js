const order=require('../../models/order')
module.exports={
    adminIndex:async (req,res)=>{
        const orders=order.find({ status: { $ne: 'completed' } }, null, { sort: { 'createdAt': -1 }}).populate('customerId', '-password').exec((err, orders) => {
            if(req.xhr) {
                return res.json(orders)
            } else {
             return res.render('admin/orders')
            }
        })
    },
    status:async (req,res)=>{
        try {
            await order.updateOne({_id:req.body.orderId},{status: req.body.status})
            const eventEmitter=req.app.get('eventEmitter')
            eventEmitter.emit('orderUpdated',{id:req.body.orderId,status:req.body.status})
            return res.render('admin/orders')
        } catch (error) {
            console.log(error)
            return res.render('admin/orders')
        }
    }
}