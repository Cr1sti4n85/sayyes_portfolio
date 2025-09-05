/**Menu */
((d) => {
  const btnMenu = d.querySelector(".menu-btn");
  const menu = d.querySelector(".menu");

  btnMenu.addEventListener("click", () => {
    btnMenu.firstElementChild.classList.toggle("none");
    btnMenu.lastElementChild.classList.toggle("none");
    menu.classList.toggle("is-active");
  });

  d.addEventListener("click", (e) => {
    if (!e.target.matches(".menu a")) return false;
    btnMenu.firstElementChild.classList.remove("none");
    btnMenu.lastElementChild.classList.add("none");
    menu.classList.remove("is-active");
  });
})(document);

/*Contact Form */
((d) => {
  const form = d.querySelector(".contact-form");
  const loader = d.querySelector(".contact-form-loader");
  const response = d.querySelector(".contact-form-response");
  const MS = 3000;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    loader.classList.remove("none");

    try {
      const res = await fetch(
        "https://formsubmit.co/ajax/contacto@sayyes.com.mx",
        {
          method: "POST",
          body: new FormData(e.target),
        }
      );
      if (!res.ok) throw { status: res.status, statusText: res.statusText };
      await res.json();
      window.location.hash = "#gracias";
      form.reset();
    } catch (error) {
      response.querySelector("h3").innerHTML = `Error ${error.status || ""}: ${
        error.statusText || "Ocurrió un error al enviar el formulario"
      }`;
    } finally {
      loader.classList.add("none");
      setTimeout(() => {
        location.hash = "#close";
      }, MS);
    }
  });
})(document);
