document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("productGrid");
  const searchInput = document.getElementById("productSearch");
  const resultCount = document.getElementById("resultCount");
  const emptyState = document.getElementById("emptyState");
  const filterButtons = document.querySelectorAll("[data-filter]");

  if (!grid || !Array.isArray(products)) return;

  let activeFilter = "all";
  let searchTerm = "";

  function renderProducts() {
    const filteredProducts = products.filter((product) => {
      const matchesCategory = activeFilter === "all" || product.category === activeFilter;
      const searchable = `${product.name} ${product.description} ${product.label}`.toLowerCase();
      return matchesCategory && searchable.includes(searchTerm.toLowerCase());
    });

    resultCount.textContent = `${filteredProducts.length} FRAME${filteredProducts.length === 1 ? "" : "S"} AVAILABLE`;
    emptyState.hidden = filteredProducts.length !== 0;

    grid.innerHTML = filteredProducts.map((product, index) => `
      <article class="product-card">
        <a class="product-image-link" href="product.html?id=${encodeURIComponent(product.id)}" aria-label="View ${product.name}">
          <span class="product-number">${String(products.indexOf(product) + 1).padStart(2, "0")} / 06</span>
          <img class="product-image" src="${product.image}" alt="${product.name}" loading="lazy">
        </a>
        <div class="product-information">
          <div class="product-meta"><span>${product.label}</span><span>SG / ${String(products.indexOf(product) + 1).padStart(2, "0")}</span></div>
          <h3 class="product-name">${product.name}</h3>
          <p class="product-price">${formatPrice(product.price)}</p>
          <p class="product-description">${product.description}</p>
          <div class="product-actions">
            <a class="view-details" href="product.html?id=${encodeURIComponent(product.id)}">VIEW DETAILS</a>
            <a class="buy-now" href="${hasValidWhatsAppNumber() ? getWhatsAppLink(product) : "#whatsapp-setup"}" data-buy="${product.id}">BUY NOW ↗</a>
          </div>
        </div>
      </article>
    `).join("");

    grid.querySelectorAll("[data-buy]").forEach((link) => {
      link.addEventListener("click", (event) => {
        if (!hasValidWhatsAppNumber()) {
          event.preventDefault();
          alert("Please add your WhatsApp number in js/products.js first. Use country code and digits only, for example 919876543210.");
          return;
        }
        link.target = "_blank";
        link.rel = "noopener noreferrer";
      });
    });
  }

  searchInput?.addEventListener("input", (event) => {
    searchTerm = event.target.value.trim();
    renderProducts();
  });

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      activeFilter = button.dataset.filter;
      filterButtons.forEach((item) => item.classList.toggle("active", item === button));
      renderProducts();
    });
  });

  renderProducts();
});
