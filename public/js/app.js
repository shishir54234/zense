

    let addingtobasket=document.querySelectorAll('.Add')
    function  addToCart (dish){
        console.log(dish)
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dish)
        }
        
        let result=fetch('/api/update-cart',options)
        console.log(session)
    }
    addingtobasket.forEach((button)=>{
        button.addEventListener('click',(e)=>{
            
            let pizza=JSON.parse(button.dataset.dish)
            // console.log(pizza)
            addToCart(pizza)
            
        })
    })