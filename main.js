// JavaScript source code

//get total
//create product
//save to local storage
//clear input data
//read
//count
//delete
//update
//serach
//clean data


let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');

let mood = 'create';
let tmp;


// Debugging check (uncomment if needed to confirm elements are linked correctly)
//console.log(title, price, ads, taxes, discount, total, count, category, submit);

//get total
function getTotal() {

    if (price.value != '') {
        let result = (+price.value + +taxes.value
            + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.background = '#040';// green background when valid
    }
    else {
        total.innerHTML = '';
        total.style.background = '#c70b0b';// red background when no price


    }

}

//create Product Array
// If data already exists in localStorage, retrieve it; otherwise, start with empty array.
let dataPro;
if (localStorage.product != null) {
    dataPro = JSON.parse(localStorage.product)
} else {
    dataPro = [];
}
submit.onclick = function () {
    let newPro = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase(),
    }

    // Check validation
    if (title.value != '' && price.value != '' && category.value != '' && count.value < 100)
    {
        if (mood == 'create') {
            // If count > 1, create multiple products
            if (newPro.count > 1) {
                for (let i = 0; i < newPro.count; i++) {
                    dataPro.push(newPro);
                }
            } else {
                dataPro.push(newPro);
            }
        } else {
            // Update mode
            dataPro[tmp] = newPro;
            mood = 'create';
            submit.innerHTML = 'create';
            count.style.display = 'block';
        }

        // Save and refresh only when valid
        localStorage.setItem('product', JSON.stringify(dataPro));
        clearData();  // <-- clear inputs only when creation/update is successful
        showData();

    } else {
        
         alert("Please enter title, price, and category!");
    }
}


//clear input data
function clearData() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';

}

//read
// to add the inputs to the table
function showData()
{
    getTotal();
    let table = '';
    //// Loops over all products in dataPro array and builds table rows dynamically.
    for (let i = 0; i < dataPro.length; i++) {
        table += `
            <tr>
                    <td>${i}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].count}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button onclick="updateData(${i})" id='update'>update</button></td>
                    <td><button onclick="deleteData(${i})" id='delete'>delete</button></td>

            </tr>



        `
    }
    document.getElementById('tBody').innerHTML = table;

    let btnDelete = document.getElementById('deleteAll');
    //we made this so that it checks if there is elements the delete all button should appear if there is no elements the button wont appear
    if (dataPro.length > 0) {
    // we wrote the (${dataPro.length}) so that it gives us how many products is in there*/
        btnDelete.innerHTML = `
            <button onclick="deleteAll()">DELETE All (${dataPro.length}) </button> 

        `
    } else {
        btnDelete.innerHTML = '';
    }

}
showData();//we add it here so that even when we relod the page the data still shows


//delete
function deleteData(i) {

    dataPro.splice(i, 1);
    localStorage.product = JSON.stringify(dataPro);
    showData();
}

//deleteAll
function deleteAll() {
    localStorage.clear();
    dataPro.splice(0);//we use this to delete all the elements in the array
    showData();
}


//count is in the showdata func

//update
function updateData(i) {

    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    getTotal();
    count.style.display = 'none';
    category.value = dataPro[i].category;
    submit.innerHTML = "update";

    mood = 'update';
    tmp = i;
    scroll({
        top: 0,
        behavior:'smooth'
    })
}


//search
let searchMood = 'title';

function getSearchMood(id) {
    let search = document.getElementById('search');

    if (id == 'searchTitle') {
        searchMood = 'title';
    } else {
        searchMood = 'category';

    }
    search.placeholder = 'Search by'+searchMood ;
    
    search.focus();
    search.value = '';
    showData();
}

function searchData(value)
{
    let table = '';
    for (let i = 0; i < dataPro.length; i++) {
        if (searchMood == 'title') {
            if (dataPro[i].title.includes(value)) {
                table += `
            <tr>
                    <td>${i}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].count}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button onclick="updateData(${i})" id='update'>update</button></td>
                    <td><button onclick="deleteData(${i})" id='delete'>delete</button></td>

            </tr>

        `

            }


        } else {
            if (dataPro[i].category.includes(value)) {
                table += `
            <tr>
                    <td>${i}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].count}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button onclick="updateData(${i})" id='update'>update</button></td>
                    <td><button onclick="deleteData(${i})" id='delete'>delete</button></td>

            </tr>

        `

            }

        }
    } document.getElementById('tBody').innerHTML = table;
}

//cleanData


