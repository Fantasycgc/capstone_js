import { Products } from "../models/Products.js";
import { QLProductServices } from "../services/products.services.js";

const showProd = (data) => {
  console.log("data: ", data);
  let htmlContent = ''
  htmlContent += `<div class="product__slider owl-carousel owl-loaded owl-drag">`
  htmlContent += `<div class="owl-stage-outer" >`
  htmlContent += `<div class="owl-stage" style="transform: translate3d(0px, 0px, 0px); transition: all;">`
  data.forEach((item) => {

    htmlContent += `
             <div class="owl-item cloned" style="width: 231px; margin-right: 20px;">
                    <div class="product__item product__item-2 white-bg">
                      <div class="product__thumb p-relative">
                        <a href="%" class="w-img" >
                          <img
                            src=${item.img}
                            alt="product"
                       
                           
                          />
                          <img
                            class="second-img"
                            src=${item.img}
                            alt="product"
                       
                            
                          />
                        </a>
                        <div class="product__action p-absolute">
                          <ul>
                            <li>
                              <a href="#" title="Add to Wishlist"
                                ><i class="fal fa-heart"></i
                              ></a>
                            </li>
                            <li>
                              <a
                                href="#"
                                title="Quick View"
                                data-bs-toggle="modal"
                                data-bs-target="#productModalId"
                                ><i class="fal fa-search"></i
                              ></a>
                            </li>
                            <li>
                              <a href="#" title="Compare"
                                ><i class="far fa-sliders-h"></i
                              ></a>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div class="product__content text-center">
                        <h6 class="product-name">
                          <a
                            class="product-item-link"
                            href="#"
                          >
                            ${item.name}</a
                          >
                        </h6>
                        <div class="rating">
                          <ul>
                            <li>
                              <a href="#"><i class="far fa-star"></i></a>
                            </li>
                            <li>
                              <a href="#"><i class="far fa-star"></i></a>
                            </li>
                            <li>
                              <a href="#"><i class="far fa-star"></i></a>
                            </li>
                            <li>
                              <a href="#"><i class="far fa-star"></i></a>
                            </li>
                            <li>
                              <a href="#"><i class="far fa-star"></i></a>
                            </li>
                          </ul>
                        </div>
                        <span class="price">${item.price}</span>
                      </div>
                      <div class="product__add-btn">
                        <button type="button">Add to Cart</button>
                      </div>
                    </div>
                    </div>
                 
        `
  })
  htmlContent += ` </div>`
  htmlContent += ` </div>`
  htmlContent += ` </div>`
  document.getElementById('new').innerHTML = htmlContent
}
const getProductList = async () => {
  try {

    const result = await QLProductServices.getProductList()


    showProd(result.data.data)
  } catch (error) {
    console.log("error: ", error);

  }
}
getProductList()

const showSale = (data) => {

  let htmlContent = ''
  htmlContent += `<div class="product__slider owl-carousel owl-loaded owl-drag">`
  htmlContent += `<div class="owl-stage-outer" >`
  htmlContent += `<div class="owl-stage" style="transform: translate3d(0px, 0px, 0px); transition: all;">`
  data.forEach((item) => {

    htmlContent += `
             <div class="owl-item cloned" style="width: 231px; margin-right: 20px;">
                    <div class="product__item product__item-2 white-bg">
                      <div class="product__thumb p-relative">
                        <a href="%" class="w-img" >
                          <img
                            src=${item.img}
                            alt="product"
                       
                           
                          />
                          <img
                            class="second-img"
                            src=${item.img}
                            alt="product"
                       
                            
                          />
                        </a>
                        <div class="product__action p-absolute">
                          <ul>
                            <li>
                              <a href="#" title="Add to Wishlist"
                                ><i class="fal fa-heart"></i
                              ></a>
                            </li>
                            <li>
                              <a
                                href="#"
                                title="Quick View"
                                data-bs-toggle="modal"
                                data-bs-target="#productModalId"
                                ><i class="fal fa-search"></i
                              ></a>
                            </li>
                            <li>
                              <a href="#" title="Compare"
                                ><i class="far fa-sliders-h"></i
                              ></a>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div class="product__content text-center">
                        <h6 class="product-name">
                          <a
                            class="product-item-link"
                            href="#"
                          >
                            ${item.name}</a
                          >
                        </h6>
                        <div class="rating">
                          <ul>
                            <li>
                              <a href="#"><i class="far fa-star"></i></a>
                            </li>
                            <li>
                              <a href="#"><i class="far fa-star"></i></a>
                            </li>
                            <li>
                              <a href="#"><i class="far fa-star"></i></a>
                            </li>
                            <li>
                              <a href="#"><i class="far fa-star"></i></a>
                            </li>
                            <li>
                              <a href="#"><i class="far fa-star"></i></a>
                            </li>
                          </ul>
                        </div>
                        <span class="price">${item.price}</span>
                      </div>
                      <div class="product__add-btn">
                        <button type="button">Add to Cart</button>
                      </div>
                    </div>
                    </div>
                 
        `
  })
  htmlContent += ` </div>`
  htmlContent += ` </div>`
  htmlContent += ` </div>`
  document.getElementById('new').innerHTML = htmlContent
}
const getShowSale = async () => {
  try {

    const result = await QLProductServices.getProductList()


    showProd(result.data.data)
  } catch (error) {
    console.log("error: ", error);

  }
}
getProductList()