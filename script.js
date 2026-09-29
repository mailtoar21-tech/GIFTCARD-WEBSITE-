const cards = [
  {
    brand: "Amazon",
    value: "₹500",
    price: "₹485",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
  },

  {
    brand: "Google Play",
    value: "₹500",
    price: "₹490",
    logo: "https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
  },

  {
    brand: "Flipkart",
    value: "₹500",
    price: "₹485",
    logo: "https://upload.wikimedia.org/wikipedia/commons/1/1b/Flipkart-logo.png"
  }
];


const grid = document.getElementById("cardsGrid");


grid.innerHTML = cards.map(function(card) {

  return `
    <article class="card">

      <img
        src="${card.logo}"
        alt="${card.brand} logo"
      >

      <h3>${card.brand}</h3>

      <p>
        ${card.value} Gift Card
      </p>

      <p class="price">
        ${card.price}
      </p>

      <button
        class="buy"
        onclick="buyCard('${card.brand}', '${card.value}', '${card.price}')"
      >
        Buy Now
      </button>

    </article>
  `;

}).join("");


function buyCard(brand, value, price) {

  alert(
    "Selected Gift Card\n\n" +
    "Brand: " + brand + "\n" +
    "Value: " + value + "\n" +
    "Price: " + price +
    "\n\nCheckout will be added next."
  );

}
