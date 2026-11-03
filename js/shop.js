
document.addEventListener("DOMContentLoaded", async () => {
  const grid = document.getElementById("productGrid");
  const searchInput = document.getElementById("productSearch");
  const resultCount = document.getElementById("resultCount");
  const emptyState = document.getElementById("emptyState");
  const filterButtons = document.querySelectorAll("[data-filter]");

  if (!grid) return;

  let activeFilter = "all";
  let searchTerm = "";

  // Load products from Supabase
  resultCount.textContent = "LOADING FRAMES...";

  await loadProducts();

  function renderProducts() {
    const filteredProducts = products.filter((product) => {
      const matchesCategory =
        activeFilter === "all" || product.category === activeFilter;

      const searchable =
        `${product.name} ${product.description} ${product.label}`.toLowerCase();

      return matchesCategory && searchable.includes(searchTerm.toLowerCase());
    });

    resultCount.textContent =
      `${filteredProducts.length} FRAME${filteredProducts.length === 1 ? "" : "S"} AVAILABLE`;

    emptyState.hidden = filteredProducts.length !== 0;

    grid.innerHTML = filteredProducts.map((product) => {
      const index = products.indexOf(product) + 1;
      const imageNumber = String(index).padStart(2, "0");
      const outOfStock =
        String(product.stock_status || "").toLowerCase().includes("out");

      return `
        <article class="product-card">
          <a class="product-image-link"
             href="product.html?id=${encodeURIComponent(product.id)}"
             aria-label="View ${product.name}">

            <span class="product-number">${imageNumber} / ${String(products.length).padStart(2, "0")}</span>

            <img class="product-image"
                 src="${product.image}"
                 alt="${product.name}"
                 loading="lazy">
          </a>

          <div class="product-information">
            <div class="product-meta">
              <span>${product.label}</span>
              <span>SG / ${imageNumber}</span>
            </div>

            <h3 class="product-name">${product.name}</h3>
            <p class="product-price">${formatPrice(product.price)}</p>
            <p class="product-description">${product.description}</p>

            <div class="product-actions">
              <a class="view-details"
                 href="product.html?id=${encodeURIComponent(product.id)}">
                VIEW DETAILS
              </a>

              <a class="buy-now"
                 href="${!outOfStock && hasValidWhatsAppNumber()
                   ? getWhatsAppLink(product)
                   : "#"}"
                 data-buy="${product.id}"
                 ${outOfStock ? 'aria-disabled="true"' : ""}>
                ${outOfStock ? "OUT OF STOCK" : "BUY NOW ↗"}
              </a>
            </div>
          </div>
        </article>
      `;
    }).join("");

    grid.querySelectorAll("[data-buy]").forEach((link) => {
      link.addEventListener("click", (event) => {
        const product = products.find(
          (item) => item.id === link.dataset.buy
        );

        if (!product) return;

        if (
          String(product.stock_status || "").toLowerCase().includes("out")
        ) {
          event.preventDefault();
          alert("Sorry, this product is currently out of stock.");
          return;
        }

        if (!hasValidWhatsAppNumber()) {
          event.preventDefault();
          alert(
            "Please add your WhatsApp number in js/products.js with country code, for example 919876543210."
          );
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

      filterButtons.forEach((item) => {
        item.classList.toggle("active", item === button);
      });

      renderProducts();
    });
  });

  renderProducts();
});
