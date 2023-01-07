document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("btn-login-uepa");
  btn.style.transform = "translateY(0)";
  btn.style.transitionDuration = ".5s";
  btn.onmouseover = () => {
    try {
      comprobar_form_login();
    } catch (e) {
      btn.style.transform =
        btn.style.transform == "translateY(50px)"
          ? "translateY(0)"
          : "translateY(50px)";
    }
  };
});
