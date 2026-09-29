/* =====================================
   SUPABASE
===================================== */

const SUPABASE_URL =
  "https://roczsslrpwubxxfccfmp.supabase.co";

const SUPABASE_KEY =
  "sb_publishable_EQxGJAU_jnqyAY5hX9EKXQ_a3Mw4eTB";

const supabaseClient =
  window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
  );


/* =====================================
   GIFT CARDS
===================================== */

const cards = [

  {
    brand: "Amazon",
    value: "₹500",
    price: "₹485",
    logo:
      "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
  },

  {
    brand: "Google Play",
    value: "₹500",
    price: "₹490",
    logo:
      "https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
  },

  {
    brand: "Flipkart",
    value: "₹500",
    price: "₹485",
    logo:
      "https://upload.wikimedia.org/wikipedia/commons/1/1b/Flipkart-logo.png"
  }

];


function displayCards() {

  const grid =
    document.getElementById("cardsGrid");

  if (!grid) return;


  grid.innerHTML =
    cards.map(function(card) {

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
            onclick="buyCard('${card.brand}', '${card.value}', '${card.price}')">
            Buy Now
          </button>

        </article>
      `;

    }).join("");

}


function buyCard(brand, value, price) {

  alert(
    "Selected Gift Card\n\n" +
    "Brand: " + brand + "\n" +
    "Value: " + value + "\n" +
    "Price: " + price +
    "\n\nCheckout will be added next."
  );

}


/* =====================================
   LOGIN MODAL
===================================== */

function openLogin() {

  const modal =
    document.getElementById("loginModal");

  if (modal) {
    modal.style.display = "grid";
  }

}


function closeLogin() {

  const modal =
    document.getElementById("loginModal");

  if (modal) {
    modal.style.display = "none";
  }

}


function showMessage(message) {

  const box =
    document.getElementById("authMessage");

  if (box) {
    box.textContent = message;
  }

}


/* =====================================
   USER SIGN UP
===================================== */

async function userSignup() {

  const email =
    document.getElementById("email").value.trim();

  const password =
    document.getElementById("password").value;


  if (!email || !password) {

    showMessage(
      "Please enter email and password."
    );

    return;
  }


  if (password.length < 6) {

    showMessage(
      "Password must be at least 6 characters."
    );

    return;
  }


  showMessage("Creating account...");


  const result =
    await supabaseClient.auth.signUp({

      email: email,

      password: password

    });


  if (result.error) {

    showMessage(
      result.error.message
    );

    return;
  }


  showMessage(
    "Account created. Check your email if confirmation is required."
  );

}


/* =====================================
   USER LOGIN
===================================== */

async function userLogin() {

  const email =
    document.getElementById("email").value.trim();

  const password =
    document.getElementById("password").value;


  if (!email || !password) {

    showMessage(
      "Please enter email and password."
    );

    return;
  }


  showMessage("Logging in...");


  const result =
    await supabaseClient.auth.signInWithPassword({

      email: email,

      password: password

    });


  if (result.error) {

    showMessage(
      result.error.message
    );

    return;
  }


  closeLogin();

  updateLoginStatus(result.data.user);

}


/* =====================================
   GOOGLE LOGIN
===================================== */

async function googleLogin() {

  showMessage(
    "Opening Google login..."
  );


  const result =
    await supabaseClient.auth.signInWithOAuth({

      provider: "google",

      options: {

        redirectTo:
          window.location.href

      }

    });


  if (result.error) {

    showMessage(
      result.error.message
    );

  }

}


/* =====================================
   CURRENT USER
===================================== */

async function checkUser() {

  const result =
    await supabaseClient.auth.getUser();


  if (result.data && result.data.user) {

    updateLoginStatus(
      result.data.user
    );

  }

}


function updateLoginStatus(user) {

  const status =
    document.getElementById("loginStatus");


  if (!status) return;


  status.innerHTML =
    "Logged in as " +
    user.email +
    ' · <a href="#" onclick="logoutUser(); return false;">Logout</a>';

}


/* =====================================
   LOGOUT
===================================== */

async function logoutUser() {

  await supabaseClient.auth.signOut();

  const status =
    document.getElementById("loginStatus");


  if (status) {

    status.textContent =
      "You are logged out.";

  }

}


/* =====================================
   START WEBSITE
===================================== */

displayCards();

checkUser();
