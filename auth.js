const SUPABASE_URL =
  "https://roczsslrpwubxxfccfmp.supabase.co";

const SUPABASE_KEY =
  "sb_publishable_EQxGJAU_jnqyAY5hX9EKXQ_a3Mw4eTB";

const supabaseClient =
  window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
  );


function message(text) {
  document.getElementById("message").textContent = text;
}


async function userSignup() {

  const email =
    document.getElementById("email").value;

  const password =
    document.getElementById("password").value;

  if (!email || !password) {
    message("Enter email and password.");
    return;
  }

  const { error } =
    await supabaseClient.auth.signUp({
      email: email,
      password: password
    });

  if (error) {
    message(error.message);
    return;
  }

  message(
    "Account created. Check your email if confirmation is required."
  );
}


async function userLogin() {

  const email =
    document.getElementById("email").value;

  const password =
    document.getElementById("password").value;

  if (!email || !password) {
    message("Enter email and password.");
    return;
  }

  const { data, error } =
    await supabaseClient.auth.signInWithPassword({
      email: email,
      password: password
    });

  if (error) {
    message(error.message);
    return;
  }

  window.location.href = "index.html";
}


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
    message(error.message);
  }
}


async function adminLogin() {

  const email =
    document.getElementById("email").value;

  const password =
    document.getElementById("password").value;

  if (!email || !password) {
    message("Enter your admin email and password.");
    return;
  }

  const { data, error } =
    await supabaseClient.auth.signInWithPassword({
      email: email,
      password: password
    });

  if (error) {
    message(error.message);
    return;
  }

  const { data: profile, error: profileError } =
    await supabaseClient
      .from("profiles")
      .select("role")
      .eq("id", data.user.id)
      .single();

  if (profileError || !profile || profile.role !== "admin") {

    await supabaseClient.auth.signOut();

    message("Access denied. Admin account required.");
    return;
  }

  window.location.href = "admin.html";
}
