import './style.css'
import './reset.css'

type StoreItem {
  id: number;
  name: string;
  price: number;
  inCart: number;
};

type State={
  storeItems: StoreItem[]
}

let state: State = {
  storeItems: [
    {
      id: 1,
      name: "beetroot",
      price: 0.35,
      inCart: 4,
    },
    {
      id: 2,
      name: "carrot",
      price: 0.20,
      inCart: 0,
    },
    {
      id: 3,
      name: "apple",
      price: 0.15,
      inCart: 0,
    },
    {
      id: 4,
      name: "apricot",
      price: 0.35,
      inCart: 0,
    },
    {
      id: 5,
      name: "avocado",
      price: 0.75,
      inCart: 1,
    },
    {
      id: 6,
      name: "bananas",
      price: 0.35,
      inCart: 0,
    },
    {
      id: 7,
      name: "bell-pepper",
      price: 0.35,
      inCart: 0,
    },
    {
      id: 8,
      name: "berry",
      price: 0.30,
      inCart: 7,
    },
    {
      id: 9,
      name: "blueberry",
      price: 0.65,
      inCart: 5,
    },
    {
      id: 10,
      name: "eggplant",
      price: 0.25,
      inCart: 0,
    },
  ]
}

function increaseQuantity(item: StoreItem) {
  item.inCart++
}

function decreaseQuantity(item) {
  if (item.inCart === 0) return
  item.inCart--
}

function getImagePath(item) {
  let id = String(item.id).padStart(3, '0') // instead of 1 --> 001
  return `assets/icons/${id}-${item.name}.svg`

}

function renderStoreItems() {
  let storeItemsUl = document.querySelector('.store--item-list')
  storeItemsUl.textContent = ''

  for (let item of state.storeItems) {

    let liEl = document.createElement('li')

    let imgDivEl = document.createElement('div')
    imgDivEl.className = '.store--item-icon'

    let imgEl = document.createElement('img')
    imgEl.src = getImagePath(item)

    let buttonEl = document.createElement('button')
    buttonEl.textContent = 'Add to cart'
    buttonEl.addEventListener('click', function () {
      increaseQuantity(item)
      render()
    })

    imgDivEl.append(imgEl)
    liEl.append(imgDivEl, buttonEl)

    storeItemsUl.append(liEl)
  }
}

function getCartItems() {
  return state.storeItems.filter(item => item.inCart > 0)
}

function renderCartItems() {
  let cartItemsUl = document.querySelector('.cart--item-list')
  cartItemsUl.textContent = ''
  //  <li>
  //  <img
  //    class="cart--item-icon"
  //    src="assets/icons/001-beetroot.svg"
  //    alt="beetroot"
  //  />
  //  <p>beetroot</p>
  //  <button class="quantity-btn remove-btn center">-</button>
  //  <span class="quantity-text center">1</span>
  //  <button class="quantity-btn add-btn center">+</button>
  //</li>

  for (let item of getCartItems()) {

    let cartItemLiEl = document.createElement('li')

    let cartImgEl = document.createElement('img')
    cartImgEl.className = 'cart--item-icon'
    cartImgEl.src = getImagePath(item)
    cartImgEl.alt = "beetroot"

    let cartPEl = document.createElement('p')
    cartPEl.textContent = item.name

    let cartButtonEl = document.createElement('button')
    cartButtonEl.className = 'quantity-btn remove-btn center'
    cartButtonEl.textContent = '-'
    cartButtonEl.addEventListener('click', function () {
      decreaseQuantity(item)
      render()
    })

    let cartSpanEl = document.createElement('span')
    cartSpanEl.className = 'quantity-text center'
    cartSpanEl.textContent = String(item.inCart)

    let cartButtonEl2 = document.createElement('button')
    cartButtonEl2.className = 'quantity-btn remove-btn center'
    cartButtonEl2.textContent = '+'
    cartButtonEl2.addEventListener('click', function () {
      increaseQuantity(item)
      render()
    })

    cartItemLiEl.append(cartImgEl, cartPEl, cartButtonEl, cartSpanEl, cartButtonEl2)
    cartItemsUl.append(cartItemLiEl)
  }
}
function getTotal() {
  let total = 0
let totalItemPrice=0
  for (let item of getCartItems()) {
    total = item.price * item.inCart
    totalItemPrice += Number(total)
    console.log(totalItemPrice)
  }
  return totalItemPrice
}

function renderTotal() {
  let totalPrice = document.querySelector('.total-number')
  totalPrice.textContent = String(getTotal())

}

function render() {
  renderStoreItems()
  renderCartItems()
  renderTotal()
}

render()