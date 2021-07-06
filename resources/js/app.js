import axios from 'axios'
import Noty from 'noty'
let addToCart=document.querySelectorAll('.add-to-cart')
let cartCounter=document.querySelector('#cartCounter')

function updateCart(Item){ 
    axios.post(Item)
    axios.post('/update-cart',Item).then(res=>{
        cartCounter.innerText = res.data.totalQty
        new Noty({
            text: 'Item added to cart',
            type: 'success',
            progressBar:false,
            timeout:1000,
        }).show();
    }).catch(error=>{
        new Noty({
            text: 'Something went wrong',
            type: 'error',
            progressBar:false,
            timeout:1000,
        }).show();
    })
}


addToCart.forEach((btn)=>{
    btn.addEventListener('click',(e)=>{
        let Item=JSON.parse(btn.dataset.item)
        updateCart(Item)
    })
})