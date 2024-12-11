import { Products } from "../models/Products.js";
import { QLProductServices } from "../services/products.services.js";

const showProd = (data) => {


    let htmlContent = ''
    data.forEach((item) => {

        htmlContent += `
        <tr>
            <td>${item.tknv}</td>
            <td>${item.name}</td>
            <td>${item.email}</td>
            <td>${item.datepicker}</td>
            <td>${item.chucvu}</td>
            <td>${Intl.NumberFormat('vn-VN').format(item.totalSalary)}</td>
            <td>${item.empType}</td>
            <td>
                    <button class="btn btn-warning" data-toggle="modal" data-target="#myModal"
                    onclick="editEmp('${item.id}')"
                    >Edit</button>
                    <button class="btn btn-danger" onclick="deleteEmp('${item.id}')">Delete</button>
            </td>
        </tr>
        `
    })
    document.getElementById('tableDanhSach').innerHTML = htmlContent
}