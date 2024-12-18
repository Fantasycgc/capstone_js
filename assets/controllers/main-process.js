import { Products } from "../models/Products.js";
import { QLProductServices } from "../services/products.services.js";

const showProd = (tabID, data) => {

  // console.log("data: ", data);
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
                            id="product-img"
                           
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
                        <span class="price">${Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price)}</span>
                      </div>
                      <div class="product__add-btn">
                        <button type="button" id="btnAddCart" onclick='getMessage()'>Add to Cart</button>
                      </div>
                    </div>
                    </div>
                 
        `
  })
  htmlContent += ` </div>`
  htmlContent += ` </div>`
  htmlContent += ` </div>`
  document.getElementById(tabID).innerHTML = htmlContent
}
let searchTypeFilter = []
const getProductList = async (brand_value) => {

  try {

    const result = await QLProductServices.getProductBrand(brand_value)


    showProd('samsung', result.data.data)
  } catch (error) {
    console.log("error: ", error);

  }
}
// getProductList('iphone')


const showSale = (data) => {
  let htmlContent = ''

  data.forEach((item) => {

    htmlContent += `
      <div class="owl-item cloned" style="width: 356.5px; margin-right: 20px;">
       <div class="product__item-wrapper">
                  <div class="product__item product__item-2 white-bg d-flex mb-20">
                    <div class="product__thumb product__thumb-sale p-relative">
                      <a href="product-details.html" class="w-img">
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
                    </div>
                    <div class="product__content">
                      <h6 class="product-name">
                        <a class="product-item-link" href="product-details.html"
                          >${item.name}
                        </a>
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
                      <span class="new new-2">${Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price)}</span>
                      <span class="price-old"> <del>${Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price + (item.price * 0.1))}</del> </span>
                    </div>
                  </div>

                </div>

              


                </div>

        `
  })

  document.getElementById('showSale').innerHTML = htmlContent
  // }
  $('#showSale').owlCarousel('destroy'); // Xóa carousel cũ
  $('#showSale').owlCarousel({
    loop: true,
    margin: 20,
    autoplay: false,
    autoplayTimeout: 3000,
    smartSpeed: 500,
    items: 6,
    navText: ['<button><i class="fal fa-angle-left"></i></button>', '<button><i class="fal fa-angle-right"></i></button>'],
    nav: true,
    dots: false,
    responsive: {
      0: { items: 1 },
      576: { items: 1 },
      767: { items: 2 },
      992: { items: 2 },
      1200: { items: 3 },
      1600: { items: 4 }
    }
  });
}



const getShowSale = async () => {
  try {

    const result = await QLProductServices.getProductList()


    showSale(result.data.data)
  } catch (error) {
    console.log("error: ", error);

  }
}



document.getElementById('iphone-tab').onclick = async () => {
  const resultType = await QLProductServices.getProductBrand('phone')

  showProd('iphone', resultType.data.data)
}


const formLoad = () => {
  getProductList('Samsung')
  getShowSale()
}
formLoad()



