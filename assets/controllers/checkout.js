import { QLCheckOutServices } from "../services/checkout.services.js";
import { Validation } from "./validation.js";
const validation = new Validation()
const getDataCart = async () => {

    try {

        const result = await QLCheckOutServices.getCartList()
        console.log("result 1: ", result.data.data);

        showCart(result.data.data)


    } catch (error) {
        console.log("error: ", error);

    }
}
// getDataCart()
const showCart = (data) => {
    let htmlContent = ''
    let htmlContentAMT = ''
    data.cartDetails.forEach((item) => {

        htmlContent += `
              <tr class="cart_item">
                          <td class="product-name">
                            ${item.name}
                            <strong class="product-quantity">x ${item.totalQuantity} </strong>
                          </td>
                          <td class="product-total">
                            <span class="amount">${Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.totalAMT)}</span>
                          </td>
                        </tr>
                        
                       
          `
    })

    htmlContentAMT = `
                        <tr class="order-total">
                          <th>Order Total</th>
                          <td>
                            <strong><span class="amount">${Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(data.totalAMT)}</span></strong>
                          </td>
                        </tr>`
    document.getElementById('checkOutDetail').innerHTML = htmlContent
    document.getElementById('checkOutAMT').innerHTML = htmlContentAMT
}

document.getElementById('checkOutForm').onsubmit = async (ev) => {
    try {
        ev.preventDefault()
        // debugger
        let isValid = true
        const _firstName = document.getElementById('firstName').value
        const _lastName = document.getElementById('lastName').value
        const _address = document.getElementById('address').value
        const _city = document.getElementById('city').value
        const _state = document.getElementById('state').value
        const _postCode = document.getElementById('postCode').value
        const _email = document.getElementById('email').value
        const _phone = document.getElementById('phone').value

        isValid &= validation.required(_firstName, 'Firt Name cannot blank', 'txtfirstName') && validation.isCharacter(_firstName, 'Firt Name must be character', 'txtfirstName')
        isValid &= validation.required(_lastName, 'Last Name cannot blank', 'txtlastName') && validation.isCharacter(_lastName, 'Last Name must be character', 'txtlastName')
        isValid &= validation.required(_address, 'Address cannot blank', 'txtaddress')
        isValid &= validation.required(_city, 'City cannot blank', 'txtcity') && validation.isCharacter(_city, 'City must be character', 'txtcity')
        isValid &= validation.required(_state, 'State cannot blank', 'txtstate') && validation.isCharacter(_state, 'State must be character', 'txtstate')
        isValid &= validation.required(_postCode, 'PostCode cannot blank', 'txtpostCode') && validation.isNumber(_postCode, 'PostCode must be number', 'txtpostCode')
        isValid &= validation.isEmail(_email, 'Email not correct', 'txtemail')
        isValid &= validation.required(_phone, 'Phone cannot blank', 'txtphone') && validation.isNumber(_phone, 'Phone must be number', 'txtphone')

        if (!isValid) return
        // document.getElementById('btnPlaceOrder').setAttribute("data-bs-toggle", "modal")
        // document.getElementById('btnPlaceOrder').setAttribute("data-bs-target", "#staticBackdrop")

        let htmlContent = ''
        htmlContent += `
        <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" style="display:none" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="staticBackdropLabel">Notification</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        Thank for buying
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        
      </div>
    </div>
  </div>
          </div>
         `
        document.getElementById('modalCheckOut').innerHTML = htmlContent

    } catch (error) {
        console.log("error: ", error);
    }

}

const formLoad = () => {
    getDataCart()
    // showCart()
}
formLoad()