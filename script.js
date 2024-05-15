// Fetch product data from the API
function openNav() {
    document.getElementById("mySidenav").style.width = "30%";
    // document.getElementById("flipkart-navbar").style.width = "50%";
    document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.body.style.backgroundColor = "rgba(0,0,0,0)";
}



async function fetchProductData(search) {
    try {
        // let url1;
        // if (search !== "") {
       
        //    url1="category/"+search;
        // }
        let url = 'https://fakestoreapi.com/products/';
        if (search) {
            url += `category/${search}`;
        }
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching product data:', error);
        return [];
    }
}

async function createProductCards(find) {
    console.log(find)
    const productContainer = document.getElementById('product-container');
    const search = document.getElementById("search").value;
    const  products = await fetchProductData(find);

    if (products.length === 0) {
        productContainer.innerHTML = '<p>No products found.</p>';
        return;
    }
    productContainer.innerHTML = '';
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');

        const image = document.createElement('img');
        image.src = product.image;
        image.alt = product.title;

        const details = document.createElement('div');
        details.classList.add('details');

        const productName = document.createElement('h4');
        productName.textContent = product.title;

        const price = document.createElement('p');
        price.classList.add('price');
        price.innerHTML = `<span class="price-text">Price: </span><span class="price-value">${product.price}</span>`;

        const description = document.createElement('p');
        description.textContent = product.description;

        details.appendChild(productName);
        details.appendChild(price);
        details.appendChild(description);

        productCard.appendChild(image);
        productCard.appendChild(details);

        productContainer.appendChild(productCard);
    });
}




var categoryLinks = document.querySelectorAll('.category-link');

categoryLinks.forEach(function(link) {

    link.addEventListener('click', function(event) {
        event.preventDefault();
        
        var value = link.getAttribute('value');
        async function fetchData() {
            await  createProductCards(value);;
            // You can perform further operations with the products data here
        }
        fetchData();
        
        console.log('Clicked category:', value);
        
        
    });
});
createProductCards("")