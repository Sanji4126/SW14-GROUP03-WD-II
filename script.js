
let products = JSON.parse(localStorage.getItem("products")) || [];
let editIndex = -1;

function toggleForm() {
    let form = document.getElementById("formContainer");
    form.classList.toggle("show");
}

function closeForm() {
    document.getElementById("formContainer").classList.remove("show");
    resetForm();
}

function displayProducts() {
    let table = document.getElementById("productTable");
    table.innerHTML = "";

    products.forEach((p, i) => {
        table.innerHTML += `
        <tr>
          <td>${p.name}</td>
          <td>$${p.price}</td>
          <td>${p.stock}</td>
          <td>${p.category}</td>
          <td>
            <button onclick="editProduct(${i})">Edit</button>
            <button onclick="deleteProduct(${i})">Delete</button>
          </td>
        </tr>
        `;
    });
}


function addProduct() {
    let name = document.getElementById("name").value;
    let price = document.getElementById("price").value;
    let qty = document.getElementById("qty").value;
    let category = document.getElementById("category").value;

    if (!name || !price) {
        alert("Fill all fields");
        return;
    }

    if (editIndex === -1) {
        // ADD
        products.push({ name, price, stock: qty, category });
    } else {
        // UPDATE
        products[editIndex] = { name, price, stock: qty, category };
        editIndex = -1;
        document.getElementById("saveBtn").innerText = "Save Product";
    }

    localStorage.setItem("products", JSON.stringify(products));
    displayProducts();
    closeForm();
}


function editProduct(index) {
    let p = products[index];

    document.getElementById("name").value = p.name;
    document.getElementById("price").value = p.price;
    document.getElementById("qty").value = p.stock;
    document.getElementById("category").value = p.category;

    editIndex = index;

    document.getElementById("saveBtn").innerText = "Update Product";

    document.getElementById("formContainer").classList.add("show");
}


function deleteProduct(index) {
    products.splice(index, 1);
    localStorage.setItem("products", JSON.stringify(products));
    displayProducts();
}


function resetForm() {
    document.getElementById("name").value = "";
    document.getElementById("price").value = "";
    document.getElementById("qty").value = "";
    document.getElementById("category").value = "";

    editIndex = -1;
    document.getElementById("saveBtn").innerText = "Save Product";
}


displayProducts();