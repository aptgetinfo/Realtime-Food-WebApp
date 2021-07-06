const mongoose=require('mongoose')
url='mongodb://localhost/food';
mongoose.connect(url,{
    useNewUrlParser: true,
    useCreateIndex:true,
    useUnifiedTopology: true,
    useFindAndModify : true
})