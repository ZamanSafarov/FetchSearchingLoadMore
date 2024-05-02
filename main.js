const cards = document.querySelector('.cards')
const inp = document.querySelector('.form-control')
const loadMoreBtn = document.querySelector('.load-more')
const url = 'https://fakestoreapi.com/products'
let numProductsToShow = 4
let startIndex = 0

function loadProducts() {
  fetch(url)
    .then((res) => res.json())
    .then((datas) => {
      const searchTerm = inp.value.toLowerCase().trim()
      const filteredDatas = datas.filter((data) =>data.title.toLowerCase().includes(searchTerm) || data.category.toLowerCase().includes(searchTerm)
      )

      for (let i = startIndex; i < startIndex + numProductsToShow && i < filteredDatas.length;i++ ) {
        const data = filteredDatas[i]
        const card = document.createElement('div')
        card.classList.add('card')
        card.style.width = '18rem'
        card.innerHTML = `
          <img src="${data.image}" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">${data.title}</h5>
            <h5 class="card-title">${data.price}$</h5>
            <h5 class="card-title">Category: ${data.category}</h5>
            <div class="Stars" style="--rating: ${data.rating.rate};" aria-label="Rating of this product is ${data.rating.rate} out of 5.">
              <h6 class="card-title">Stock: ${data.rating.count}</h6>
              <p class="card-text">${data.description}</p>
            </div>
          </div>`
        cards.appendChild(card)
      }
    })
}

loadProducts()

loadMoreBtn.addEventListener('click', () => {
  startIndex += numProductsToShow 
  loadProducts() 
})

inp.addEventListener('input', () => {
  startIndex = 0 
  cards.innerHTML = '' 
  loadProducts()
})
