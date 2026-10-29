document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const productId = params.get("id") || products[0].id;
  const product = getProductById(productId) || products[0];

  document.title = `${product.name} | SG COLLECTION`;
  document.getElementById("detailImage").src = product.image;
  document.getElementById("detailImage").alt = product.name;
  document.getElementById("detailCategory").textContent = `SG / ${product.label}`;
  document.getElementById("detailIndex").textContent = `FRAME ${String(products.indexOf(product) + 1).padStart(2, "0")} / 06`;
  document.getElementById("detailName").textContent = product.name;
  document.getElementById("detailPrice").textContent = formatPrice(product.price);
  document.getElementById("detailDescription").textContent = product.description;

  const quantityInput = document.getElementById("quantity");
  document.getElementById("quantityMinus").addEventListener("click", () => {
    quantityInput.value = Math.max(1, Number(quantityInput.value || 1) - 1);
  });
  document.getElementById("quantityPlus").addEventListener("click", () => {
    quantityInput.value = Math.min(20, Number(quantityInput.value || 1) + 1);
  });
  quantityInput.addEventListener("change", () => {
    quantityInput.value = Math.min(20, Math.max(1, Number(quantityInput.value || 1)));
  });

  document.getElementById("buyDetail").addEventListener("click", () => {
    if (!hasValidWhatsAppNumber()) {
      alert("Please add your WhatsApp number in js/products.js first. Use country code and digits only, for example 919876543210.");
      return;
    }
    window.open(getWhatsAppLink(product, Number(quantityInput.value || 1)), "_blank", "noopener,noreferrer");
  });
});
