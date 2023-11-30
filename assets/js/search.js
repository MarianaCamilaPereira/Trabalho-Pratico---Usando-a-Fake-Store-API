function getURLParams() {
    const url = window.location.href;
    const params = {};
    const queryString = url.split('?')[1];

    if (queryString) {
        const keyValuePairs = queryString.split('&');

        keyValuePairs.forEach(pair => {
            const [key, value] = pair.split('=');
            params[key] = value;
        });
    }

    return params;
}

const queryParams = getURLParams();

$(document).ready(function () {
    const url = queryParams.category ?
        'https://fakestoreapi.com/products/category/' + queryParams.category.replace(/%27/g, "'") :
        'https://fakestoreapi.com/products/'

    $.ajax({
        url: url,
        method: 'GET',
        success: function (products) {
            products.forEach(function (product) {
                if (queryParams.search) {
                    var decodedSearch = decodeURIComponent(queryParams.search);

                    if (
                        product.title.toLowerCase().indexOf(decodedSearch.toLowerCase()) === -1 &&
                        product.description.toLowerCase().indexOf(decodedSearch.toLowerCase()) === -1
                    ) {
                        return;
                    }
                }
                var shopItems = $('.shop-items');

                var item = `
                <div class="col-12 col-md-4">
                    <div class="card rounded oveflow-hidden my-2">
                        <img src="${product.image}" alt="imagem" class="product-image">
                        <div class="card-content d-flex flex-column gap-2 p-3">
                            <span class="item-title">
                                <a href="product.html?id=${product.id}">
                                    ${product.title.length > 15 ?
                        `<span title="${product.title}">${product.title.substring(0, 15)}...</span>` :
                        product.title
                    }
                                </a>
                            </span>
                            <span class="item-price">
                                U$ ${product.price}
                            </span>
                            <span class="item-text">
                                ${product.description.length > 80 ?
                        `<span title="${product.description}">${product.description.substring(0, 80)}...</span>` :
                        product.description
                    }
                            </span>
                        </div>
                    </div>
                </div>
            `

                shopItems.append(item);
            });
        },
        error: function (xhr, status, error) {
            console.error('Erro na requisição:', status, error);
        }
    });

    $.ajax({
        url: 'https://fakestoreapi.com/products/categories',
        method: 'GET',
        success: function (categories) {
            categories.forEach(function (category) {
                var categoriesList = $('.lista-categorias');

                var item = `
                <a href="search.html?category=${category}">
                    <li class="categorias d-block p-3">
                        ${category}
                    </li>
                </a>
            `

                categoriesList.append(item);
            });
        },
        error: function (xhr, status, error) {
            console.error('Erro na requisição:', status, error);
        }
    });
})

$('#search-button').click(function () {
    var searchVal = $('#search-input').val()

    window.location.href = 'search.html?search=' + encodeURIComponent(searchVal);
});
