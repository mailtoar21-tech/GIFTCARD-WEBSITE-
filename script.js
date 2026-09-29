const SUPABASE_URL =
  "https://roczsslrpwubxxfccfmp.supabase.co";

const SUPABASE_KEY =
  "sb_publishable_EQxGJAU_jnqyAY5hX9EKXQ_a3Mw4eTB";

const supabaseClient =
  window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
  );


/* =========================
   GIFT CARDS
========================= */

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


const grid =
  document.getElementById("cardsGrid");


grid.innerHTML =
  cards.map(function(card) {

    return `

      <article class="card">

        <img
          src="${card.logo}"
          alt="${card.brand} logo"
        >

        <h3>
          ${card.brand}
        </h3>

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


/* =========================
   USER LOGIN
========================= */

function showUserLogin() {

  document.getElementById("authBox").style.display =
    "grid";

}


function closeUserLogin() {

  document.getElementById("authBox").style.display =
    "none";

}


function authMessage(text) {

  document.getElementById("authMessage").textContent =
    text;

}


/* =========================
   USER SIGN UP
========================= */

async function userSignup() {

  const email =
    document.getElementById("userEmail").value.trim();

  const password =
    document.getElementById("userPassword").value;

  if (!email || !password) {

    authMessage(
      "Enter email and password."
    );

    return;
  }


  if (password.length < 6) {

    authMessage(
      "Password must be at least 6 characters."
    );

    return;
  }


  const { error } =
    await supabaseClient.auth.signUp({

      email: email,

      password: password

    });


  if (error) {

    authMessage(error.message);

    return;
  }


  authMessage(
    "Account created. Check your email if confirmation is required."
  );

}


/* =========================
   USER LOGIN
========================= */

async function userLogin() {

  const email =
    document.getElementById("userEmail").value.trim();

  const password =
    document.getElementById("userPassword").value;


  if (!email || !password) {

    authMessage(
      "Enter email and password."
    );

    return;
  }


  const { data, error } =
    await supabaseClient.auth.signInWithPassword({

      email: email,

      password: password

    });


  if (error) {

    authMessage(error.message);

    return;
  }


  if (data.user) {

    closeUserLogin();

    updateUserStatus(data.user);

  }

}


/* =========================
   GOOGLE LOGIN
========================= */

async function googleLogin() {

  const { error } =
    await supabaseClient.auth.signInWithOAuth({

      provider: "google",

      options: {

        redirectTo:
          window.location.origin + "/index.html"

      }

    });


  if (error) {

    authMessage(error.message);

  }

}


/* =========================
   CHECK CURRENT USER
========================= */

async function checkUser() {

  const { data } =
    await supabaseClient.auth.getUser();


  if (data.user) {

    updateUserStatus(data.user);

  }

}


function updateUserStatus(user) {

  const status =
    document.getElementById("userStatus");


  if (!status) return;


  status.innerHTML =

    "Logged in as " +
    user.email +
    ' · <a href="#" onclick="logoutUser(); return false;">Logout</a>';

}


/* =========================
   LOGOUT
========================= */

async function logoutUser() {

  await supabaseClient.auth.signOut();

  const status =
    document.getElementById("userStatus");


  if (status) {

    status.textContent =
      "You are logged out.";

  }

}


checkUser();
