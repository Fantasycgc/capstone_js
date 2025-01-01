import { product } from "../services/product.js";
import { Product } from "../models/product.js";

//  ******SỬ DỤNG ASYNC*********
const getProducts = async () => {
  try {
    const result = await product.getProductList();

    // gọi hàm renderTable để hiển thị ds sp
    renderTable(result.data.data);
  } catch (error) {
    console.log("err: ", error);
  }
};

getProducts();

const renderTable = (arr) => {
  const htmlContent = arr
    .map(
      (item, index) => `
      <tr>
        <td>${index + 1}</td>
        <td>${item.name}</td>
        <td>${item.price}</td>
        <td><img src="${item.img}" alt="${item.name}" width="50"></td>
        <td>
          <button class="btn btn-warning" 
          data-toggle="modal" 
          data-target="#myModal"
          onClick = "editProduct('${item.id}')"
          >Edit</button>


          <button class="btn btn-danger" onclick="deleteProduct('${
            item.id
          }')">Delete</button>
        </td>
      </tr>
    `
    )
    .join("");

  document.getElementById("tblDanhSachSP").innerHTML = htmlContent;
};

//** VALIDATE */
const validate = (product) => {
  const errors = []

  if (!product.name || product.name.trim() === "") {
    errors.push("Tên sản phẩm không được để trống. ")
  }

  if (!product.price || isNaN(product.price) || Number(product.price) <= 0) {
    errors.push('Giá sản phẩm phải là một số lớn hơn 0.')
  }

  if (!product.img || product.img.trim() === "") {
    errors.push("Ảnh sản phẩm không được để trống.")
  }

  if (!product.type || product.type.trim() === "") {
    errors.push("Loại sản phẩm không được để trống")
  }

  return errors

}

// ******CHỨC NĂNG: XÓA sp********
window.deleteProduct = async (productId) => {
  console.log("productId: ", productId);

  try {
    await product.deleteProduct(productId);

    // gọi lại API lấy lại dssp Mới sau khi xóa
    getProducts();
  } catch (error) {
    console.log("error: ", error);
  }
};

// *******CHỨC NĂNG: THÊM mới sp******************
//xử lý khi user click vào button thêm mới sp
document.getElementById("btnThemSP").onclick = () => {
  // hiển thị nút button thêm sp
  document.querySelector(".modal-footer").innerHTML = `
    <button type = "submit" form = "formSP" class = 'btn btn-success'>Thêm sản phẩm</button>
  `;
};
// bắt sự kiện SUBMIT của thẻ FORM
document.getElementById("formSP").onsubmit = async (ev) => {
  try {
    // ngắn trình duyệt reload khi submit
    ev.preventDefault();
    console.log("SUBMIT");

    const formElement = document.getElementById("formSP");
    const action = formElement.getAttribute("data-action");

    // lấy sp từ form
    const sp = layThongTinSP();
    // console.log("sp: ", sp);

    // Kiểm tra dữ liệu hợp lệ
    const errors = validate(sp);
    if (errors.length > 0) {
      alert(errors.join("\n"));
      return;
    }

    if (action != "edit") {
      // chức năng thêm sp
      // gọi API thêm mới sản phẩm
      await product.addProduct(sp);
    }

    if (action === "edit") {
      // chức năng edit sp
      // gọi api chỉnh sửa sp
      const productId = formElement.getAttribute("data-id");
      // console.log(productId, "productId");

      // gọi edit
      await product.editProduct(productId, sp);
    }

    // Gọi API THÊM MỚI SP
    // await product.addProduct(sp);

    // gọi API để lấy lại ds sp ms nhất sau khi THÊM sp thành công
    getProducts();
  } catch (error) {
    console.log("error: ", error);
  }
};

// lấy thông tin sp từ UI
const layThongTinSP = () => {
  const elements = document.querySelectorAll("#formSP input, #formSP select");
  // console.log("element: ", elements);

  let sp = {};
  // duyệt mảng
  elements.forEach((element) => {
    const { id, value } = element;
    sp[id] = value;
    console.log(id);
  });
  console.log("sp:", sp);

  // khởi tạo đối tượng sau khi thêm đc mà chưa đưa lên UI
  return new Product(
    sp.id || null,
    sp.name,
    sp.price,
    sp.screen,
    sp.blackcamera,
    sp.frontcamera,
    sp.img,
    sp.description,
    sp.type
  );
};

// ************CHỨC NĂNG: UPDATE *****************
// xử lý khi click vào button edit
window.editProduct = async (productId) => {
  console.log("product: ", productId);

  try {
    // gọi API để lấy thông tin sp để lấy productId
    const result = await product.getProductById(productId);
    console.log("result: ", result);

    // hiển thị thông tin chi tết sp lên form
    const elements = document.querySelectorAll("#formSP input, #formSP select");

    // duyệt element
    elements.forEach((element) => {
      const { id } = element;
      element.value = result.data.data.map((item) => {
        return item[id];
      });
    });

    // thêm data-action vào thẻ form
    document.getElementById("formSP").setAttribute("data-action", "edit");
    // thêm thuộc tính data-id vào form để xác định id của sp cần edit
    document.getElementById("formSP").setAttribute("data-id", productId);

    // CHỈNH SỬA UI
    // Thêm btn CẬP NHẬP, ẩn btn Thêm mới sản phẩm
    document.querySelector(".modal-footer").innerHTML = `
      <button 
        type = "submit" 
        form = "formSP" 
        class = 'btn btn-success' 
      >Cập nhập</button>
      `;


  } catch (error) {
    console.log("err: ", error);
  }
};
