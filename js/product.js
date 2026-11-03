
document.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(window.location.search);
  const productId = params.get("id");

  const productDetail = document.getElementById("productDetail");

  await loadProducts();

  const product =
    getProductById(productId) || products[0];

  if (!product) {
    productDetail.innerHTML = `
      <div class="detail-copy">
        <h1>PRODUCT NOT FOUND</h1>
        <p>This frame is unavailable or has been removed.</p>
        <a class="back-link" href="shop.html#collection">
          BACK TO COLLECTION
        </a>
      </div>
    `;
    return;
  }

  const detailImage = document.getElementById("detailImage");

  document.title = `${product.name} | SG COLLECTION`;

  detailImage.src = product.image;
  detailImage.alt = product.name;

  document.getElementById("detailCategory").textContent =
    `SG / ${product.label}`;

  const productIndex = products.indexOf(product) + 1;

  document.getElementById("detailIndex").textContent =
    `FRAME ${String(productIndex).padStart(2, "0")} / ${String(products.length).padStart(2, "0")}`;

  document.getElementById("detailName").textContent = product.name;
  document.getElementById("detailPrice").textContent =
    formatPrice(product.price);

  document.getElementById("detailDescription").textContent =
    product.description;

  const quantityInput = document.getElementById("quantity");
  const minusButton = document.getElementById("quantityMinus");
  const plusButton = document.getElementById("quantityPlus");
  const buyButton = document.getElementById("buyDetail");

  minusButton.addEventListener("click", () => {
    quantityInput.value = Math.max(
      1,
      Number(quantityInput.value || 1) - 1
    );
  });

  plusButton.addEventListener("click", () => {
    quantityInput.value = Math.min(
      20,
      Number(quantityInput.value || 1) + 1
    );
  });

  quantityInput.addEventListener("change", () => {
    quantityInput.value = Math.min(
      20,
      Math.max(1, Number(quantityInput.value || 1))
    );
  });

  const outOfStock =
    String(product.stock_status || "").toLowerCase().includes("out");

  if (outOfStock) {
    buyButton.disabled = true;
    buyButton.textContent = "OUT OF STOCK";
    return;
  }

  buyButton.addEventListener("click", () => {
    if (!hasValidWhatsAppNumber()) {
      alert(
        "Please add your WhatsApp number with country code in js/products.js."
      );
      return;
    }

    const quantity = Math.min(
      20,
      Math.max(1, Number(quantityInput.value || 1))
    );

    window.open(
      getWhatsAppLink(product, quantity),
      "_blank",
      "noopener,noreferrer"
    );
  });
});
