/*
  SG COLLECTION PRODUCT CATALOG
  Replace the demo SVG paths with your own .jpeg or .jpg images if needed.
  Set WHATSAPP_NUMBER to your WhatsApp number with country code, digits only.
  Example for India: "919876543210"
*/
const products = [
  { id: "sg-sport-01", name: "SPORT FRAME 01", price: 500, description: "Sporty wraparound sunglasses with a clean, bold profile.", image: "assets/images/sports1.jpeg", category: "sport", label: "SPORT SERIES" },
  { id: "sg-sport-02", name: "SPORT FRAME 02", price: 650, description: "A streamlined frame for an active, everyday look.", image: "assets/images/sport-frame-02.svg", category: "sport", label: "SPORT SERIES" },
  { id: "sg-sport-03", name: "SPORT FRAME 03", price: 750, description: "Modern sports styling with a low-profile silhouette.", image: "assets/images/sport-frame-03.svg", category: "sport", label: "SPORT SERIES" },
  { id: "sg-sport-04", name: "EVERYDAY FRAME 04", price: 900, description: "A versatile frame designed to work beyond the track.", image: "assets/images/sport-frame-04.svg", category: "everyday", label: "EVERYDAY" },
  { id: "sg-sport-05", name: "SPORT FRAME 05", price: 1100, description: "A statement wraparound look with a confident finish.", image: "assets/images/sport-frame-05.svg", category: "sport", label: "SPORT SERIES" },
  { id: "sg-sport-06", name: "EVERYDAY FRAME 06", price: 1300, description: "Contemporary eyewear for casual, daily styling.", image: "assets/images/sport-frame-06.svg", category: "everyday", label: "EVERYDAY" }
];

const WHATSAPP_NUMBER = "54********";

function formatPrice(price) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(price);
}

function getProductById(productId) {
  return products.find((product) => product.id === productId);
}

function getWhatsAppLink(product, quantity = 1) {
  const message = [
    "Hello SG Collection, I would like to enquire about this product.",
    `Product: ${product.name}`,
    `Price: ${formatPrice(product.price)}`,
    `Quantity: ${quantity}`,
    `Product ID: ${product.id}`,
    "Please share availability and delivery details."
  ].join("\n");
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function hasValidWhatsAppNumber() {
  return /^\d{10,15}$/.test(WHATSAPP_NUMBER);
}
