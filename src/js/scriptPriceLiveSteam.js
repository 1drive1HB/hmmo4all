// Configuration
const STEAM_URL = 'https://store.steampowered.com/app/297000/Heroes_of_Might__Magic_III__HD_Edition/';
const CORS_PROXY = 'https://api.allorigins.win/get?url=';
const PRICE_SELECTOR = '.game_purchase_price.price';

// Fetch and display price
function fetchPrice() {
  fetch(CORS_PROXY + encodeURIComponent(STEAM_URL))
    .then(response => response.json())
    .then(data => {
      const html = data.contents;
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      const priceElement = doc.querySelector(PRICE_SELECTOR);
      
      updatePriceDisplay(priceElement);
    })
    .catch(handleFetchError);
}

// Update the price display
function updatePriceDisplay(priceElement) {
  const priceContainer = document.getElementById('price');
  
  if (priceElement) {
    priceContainer.textContent = `${priceElement.textContent.trim()}`;
  } else {
    priceContainer.textContent = 'Price Steam Custom not found';
  }
}

// Handle errors
function handleFetchError(error) {
  console.error('Fetch error:', error);
  document.getElementById('price').textContent = 'Failed to load price';
}

// Initialize when the page loads
fetchPrice();