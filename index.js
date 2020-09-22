//variables
const heroContent = document.getElementsByClassName("hero-card");
const contentDOM = document.getElementById("content-center");
const heroesDOM = document.querySelector("heroes-center");
const btns = document.querySelectorAll(".heroeBtn");

window.onload = loadPosts;

function ready (){
    //remove button for each hero in the cart
    var removeCartItemButtons = document.getElementsByClassName('btn-danger')
    console.log(removeCartItemButtons);
    for (var i = 0; i < removeCartItemButtons.length; i++){
        var buttons = removeCartItemButtons[i]
        buttons.addEventListener('click', removeCartItem)
            
        }
        //modify the inputs in each hero 
        var quantityInputs = document.getElementsByClassName('cart-quantity-input')
        for (var i = 0; i < quantityInputs.length; i++){
            var input = quantityInputs[i]
            input.addEventListener('change', quantityChanged)
        }
        //lock the add to cart button 
        var addToCartButtons = document.getElementsByClassName('shop-item-button')
        for (var i = 0; i < addToCartButtons.length; i++){
            var button = addToCartButtons[i]
            button.addEventListener('click', addToCartClicked)
            
    }
        document.getElementsByClassName('btn-purchase')[0].addEventListener('click',purchaseClicked)
}

function loadPosts(){

    let xhr = new XMLHttpRequest();
    let method = "GET";
    let url = `/heroes.json`;

    xhr.open(method, url);
    xhr.onload = function (post) {
        if (this.readyState === XMLHttpRequest.DONE){

            if(this.status === 200) {
                const response = JSON.parse(this.responseText);
                console.log(response);
                let output = ``;
                 response.forEach(function (post){
                     output += `
                            <div class="shop-item">
                            <p class ="shop-item-title">${post.name}</p>
                            <img class ="shop-item-image" src=${post.image} /> 
                            <div class="shop-item-details">
                            <p class="shop-item-price"><span>${post.price}</span> euros / h</p>
                            <button class="btn btn-primary shop-item-button"type="button">${post.id}</button>
                            </div>
                            </div>
                        `    
    });
    contentDOM.innerHTML = output;
    console.log(output);
    ready();
    
}
}   
}
xhr.send();
}

