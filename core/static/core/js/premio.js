$(document).ready(function() {
  $.get('https://fakestoreapi.com/products', function(data) {
      $.each(data, function(i, item) {
          html = `
              <div class="card" style="width: 18rem;">
                  <img src="${item.image}" class="card-img-top" alt="${item.title}">
                  <div class="card-body">
                      <h5 class="card-title">${item.title}</h5>
                      <p class="card-text">${item.description}</p>
                      <p class="card-text">Price: $${item.price}</p>
                      <a href="#" class="btn btn-primary">Buy Now</a>
                  </div>
              </div>
          `;
          $('#recuadro-de-ropa').append(html);
      });
  });
});
