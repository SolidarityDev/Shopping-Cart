if (document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready)
}else{
//Page already loaded
    loadPosts()
}

// 1 Remove cart if clicked, check quantity inside target
// 2 Check quantity inputs
// 3 Lock on ADD TO CART 



// Lock on purchase button
//Remove all items from carts when button purchase is clicked
//Update the total after purchased.
function purchaseClicked(){
    alert('thank you for your purchase, remember our heroes are not gigolo')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    while (cartItems.hasChildNodes()){
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
}
// Remove cart when remove button is clicked
function removeCartItem(event){
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}
// Check if value in a number or beyond 0
function quantityChanged(event){
    var input = event.target
    if (isNaN(input.value) || input.value <= 0){
        input.value = 1
    }
    updateCartTotal()
}
// Get elements clicked into the cart
function addToCartClicked(event){
    
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
    var id = shopItem.getElementsByClassName('shop-item-button')[0].innerText
    console.log(title, price, imageSrc, id)
    addItemToCart(title, price, imageSrc, id)
    updateCartTotal()
  
}

// Add elements in dynamic style to the cart and check if an element has alreay been added.
function addItemToCart(title, price, imageSrc, id){
    var saveData = {title, price, imageSrc, id};
    localStorage.setItem("saveData", JSON.stringify(saveData));


    let cartItem = localStorage.getItem("saveData")
   cartItem = JSON.parse(cartItem);
   console.log("my cart are", cartItem);
   

    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemsNames = document.getElementsByClassName('cart-item-title')
    for (var i = 0; i < cartItemsNames.length; i++){
        if(cartItemsNames[i].innerText == title){
        alert('this hero is already added to the cart')
        return
    }
}
console.log(`${cartItem.title}`);
    var cartRowContents = `<div class="cart-item cart-column">
            <img class="cart-item-image" src="${cartItem.imageSrc}" width="100" height="100">
            <span class="cart-item-title">${cartItem.title}</span>
        </div>
        <span class="cart-price cart-column">${cartItem.price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
   
}


// Update and round the total of the card depending of client choices 
function updateCartTotal(){
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0;
    var blackfriday = 0;
    for (var i = 0; i < cartRows.length; i++){
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('€', ''))
        var quantity = quantityElement.value
        total = total + (price * quantity)
    }
    if (total >= 200)
    {
        blackfriday = (total * 5) / 100;
        total = total - blackfriday;
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText =  total + '€'

}