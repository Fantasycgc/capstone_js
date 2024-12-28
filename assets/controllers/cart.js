import { QLCartServices } from "../services/cart.services.js";
const getDataCart = async () => {

  try {

    const result = await QLCartServices.getCartList()
    console.log("result: ", result);
    // console.log("result 1: ", result.data.data);
    reloadCart(result.data.data)
    showCart(result.data.data)


  } catch (error) {
    console.log("error: ", error);

  }
}


const reloadCart = (data) => {


  let htmlContentCartCount = ''
  let htmlContentCartAMT = ''
  let htmlContentCartTitle = ''
  let htmlContentCartDetail = ''
  let htmlContentCartSubAMT = ''

  htmlContentCartCount += `
       <span class="cart__total-item">${data.totalRows}</span>
       `
  document.getElementById('cartCount').innerHTML = htmlContentCartCount
  htmlContentCartAMT += `
             <span class="cart__my">My Cart:</span>
                          <span class="cart__total-price" >${Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(data.totalAMT)}</span>                
      `
  document.getElementById('cartAMT').innerHTML = htmlContentCartAMT
  htmlContentCartTitle += `
          <h4>My Cart</h4>
          <span>(${data.totalRows} Item in Cart)</span>
  
  
    `
  document.getElementById('cartTitle').innerHTML = htmlContentCartTitle
  htmlContentCartSubAMT += `
  
      <span class="cart__my">My Cart:</span>
                   <span class="cart__total-price" >${Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(data.totalAMT)}</span>                      
    `
  document.getElementById('cartSubAMT').innerHTML = htmlContentCartSubAMT

  data.cartDetails.forEach((item) => {


    htmlContentCartDetail += `
    <div
                              class="cart__item d-flex justify-content-between align-items-center" 
                            >
                              <div class="cart__inner d-flex">
                                <div class="cart__thumb">
                                  <a href="product/1">
                                    <img
                                      src= ${item.img}
                                      alt=""
                                    />
                                  </a>
                                </div>
                                <div class="cart__details">
                                  <h6>
                                    <a href="#">
                                    ${item.name}
                                    </a>
                                  </h6>
                                  <div class="cart__price">
                                    <span>${Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.totalAMT)}</span>
                                  </div>
                                </div>
                              </div>
                           
                            </div>
      `

  })
  document.getElementById('cartDetail').innerHTML = htmlContentCartDetail

}
const showCart = (data) => {
  let htmlContent = ''
  let htmlContentAMT = ''
  data.cartDetails.forEach((item) => {

    htmlContent += `
       <tr>
                        <td class="product-thumbnail">
                          <a href="#"
                            ><img
                              src=${item.img}
                              alt=""
                          /></a>
                        </td>
                        <td class="product-name">
                          <a href="#">${item.name}</a>
                        </td>
                        <td class="product-price">
                          <span class="amount">${Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price)}</span>
                        </td>
                        <td class="product-quantity">
                          <div class="cart-plus-minus">
                            <input type="text" value=${item.totalQuantity}  id="quantity"/>
                          </div>
                        </td>
                        <td class="product-subtotal">
                          <span class="amount">${Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.totalAMT)}</span>
                        </td>
                        <td class="product-remove">
                          
                          <a href="#"><i class="fa fa-times btnConfirm" data-bs-toggle="modal" data-product=${item.id} data-bs-target="#confirmModal"  ></i></a>
                        </td>
                      </tr>
                     
        `
  })

  htmlContentAMT = `<li>Total <span>${Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(data.totalAMT)}</span></li>`
  document.getElementById('cartDetailList').innerHTML = htmlContent
  document.getElementById('totalCartAMT').innerHTML = htmlContentAMT
}

window.deleteCart = async (product_id) => {
  try {
    await QLCartServices.deleteCart(product_id)
    getDataCart()
  } catch (error) {
    console.log("error: ", error);

  }
}
window.deleteAllCart = async () => {
  try {
    await QLCartServices.deleteCart()
    getDataCart()
  } catch (error) {
    console.log("error: ", error);

  }
}
document.getElementById('delete_all').onclick = async () => {
  try {
    const toastTrigger = document.getElementById('ConfirmDelete')
    var myToastEl = document.getElementById('liveToast')
    toastTrigger.addEventListener('click', async () => {
      await QLCartServices.deleteAllCart();
      getDataCart();
      const toast = new bootstrap.Toast(myToastEl)
      toast.show()
    })

  } catch (error) {
    console.log("error: ", error);

  }
}

$(document).on("click", ".btnConfirm", function () {
  const toastTrigger = document.getElementById('ConfirmDelete')
  var myToastEl = document.getElementById('liveToast')
  var productId = $(this).data('product');
  toastTrigger.addEventListener('click', async () => {
    try {
      await QLCartServices.deleteCart(productId)
      const toast = new bootstrap.Toast(myToastEl)
      toast.show()
      getDataCart()
    } catch (error) {
      console.log("error: ", error);

    }
  })
});

const formLoad = () => {
  getDataCart()
  // showCart()
}
formLoad()
