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
    $.ajax({
        url: 'https://fakestoreapi.com/products/' + queryParams.id,
        method: 'GET',
        success: function (product) {
            var productName = $('#product-name');
            var productDescription = $('#product-description');
            var productPrice = $('#product-price');
            var productImage = $('#image-container');

            var imageComponent = `
                <img src="${product.image}" alt="Product image"
                    class="img-fluid product-image">
            `

            productName.text(product.title);
            productDescription.text(product.description);
            productPrice.text("U$" + product.price);
            productImage.append(imageComponent);
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
