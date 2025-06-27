const SERVER_URL = 'https://jsonplaceholder.typicode.com/posts';
const SYNC_INTERVAL = 60000; // 1 minute

let quotes = [];

// Load from local storage
function loadQuotes() {
  const stored = localStorage.getItem('quotes');
  if (stored) {
    quotes = JSON.parse(stored);
  }
}

// Save to local storage
function saveQuotes() {
  localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Populate category dropdown
function populateCategories() {
  const filter = document.getElementById('categoryFilter');
  if (!filter) return;
  filter.innerHTML = '<option value="all">All Categories</option>';
  const categories = [...new Set(quotes.map(q => q.category))];
  categories.forEach(cat => {
    const opt = document.createElement('option');
    opt.value = cat;
    opt.textContent = cat;
    filter.appendChild(opt);
  });
  const last = localStorage.getItem('lastCategory');
  if (last) filter.value = last;
}

// Filter quotes by category
function filterQuotes() {
  const selected = document.getElementById('categoryFilter').value;
  localStorage.setItem('lastCategory', selected);
  const filtered = selected === 'all' ? quotes : quotes.filter(q => q.category === selected);
  if (filtered.length > 0) {
    const rand = filtered[Math.floor(Math.random() * filtered.length)];
    document.getElementById('quoteDisplay').innerHTML = `"${rand.text}" — ${rand.category}`;
  } else {
    document.getElementById('quoteDisplay').innerHTML = 'No quotes found for this category.';
  }
}

// Show random quote
function showRandomQuote() {
  if (quotes.length === 0) return;
  const rand = quotes[Math.floor(Math.random() * quotes.length)];
  document.getElementById('quoteDisplay').innerHTML = `"${rand.text}" — ${rand.category}`;
  sessionStorage.setItem("lastViewedQuote", JSON.stringify(rand));
}

// Add new quote
function addQuote() {
  const text = document.getElementById('newQuoteText').value.trim();
  const category = document.getElementById('newQuoteCategory').value.trim();
  if (text && category) {
    const newQuote = { text, category };
    quotes.push(newQuote);
    saveQuotes();
    postQuoteToServer(newQuote);
    populateCategories();
    filterQuotes();
    showNotification('Quote added successfully.');
    document.getElementById('newQuoteText').value = '';
    document.getElementById('newQuoteCategory').value = '';
  } else {
    alert('Please enter both quote and category.');
  }
}

// Export quotes to JSON
function exportQuotes() {
  const blob = new Blob([JSON.stringify(quotes, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'quotes.json';
  a.click();
  URL.revokeObjectURL(url);
}

// Import quotes from JSON file
function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function (e) {
    const importedQuotes = JSON.parse(e.target.result);
    quotes.push(...importedQuotes);
    saveQuotes();
    populateCategories();
    filterQuotes();
    showNotification('Quotes imported successfully.');
  };
  fileReader.readAsText(event.target.files[0]);
}

// Simulate POST to server
function postQuoteToServer(quote) {
  fetch(SERVER_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(quote)
  })
    .then(res => res.json())
    .then(data => console.log("Posted to server:", data))
    .catch(err => console.error("Post error:", err));
}

// Fetch quotes from server and merge
function fetchQuotesFromServer() {
  fetch(`${SERVER_URL}?_limit=5`)
    .then(res => res.json())
    .then(data => {
      const fetchedQuotes = data.map(post => ({
        text: post.title,
        category: "Server"
      }));

      const currentQuotes = JSON.parse(localStorage.getItem("quotes")) || [];

      let updated = false;
      fetchedQuotes.forEach(quote => {
        if (!currentQuotes.some(q => q.text === quote.text)) {
          currentQuotes.push(quote);
          updated = true;
        }
      });

      if (updated) {
        localStorage.setItem("quotes", JSON.stringify(currentQuotes));
        quotes = currentQuotes;
        populateCategories();
        filterQuotes();
        showNotification("New quotes synced from server.");
      }
    })
    .catch(err => console.error("Server fetch error:", err));
}

// Periodic sync
function syncWithServer() {
  fetchQuotesFromServer();
}

// Notification system
function showNotification(message) {
  let notif = document.getElementById('notification');
  if (!notif) {
    notif = document.createElement('div');
    notif.id = 'notification';
    notif.style = 'padding:10px; background:#ffd; border:1px solid #ffa; margin-top:10px';
    document.body.insertBefore(notif, document.getElementById('quoteDisplay').nextSibling);
  }
  notif.textContent = message;
  notif.style.display = 'block';
  setTimeout(() => notif.style.display = 'none', 4000);
}

// Initialize
window.addEventListener('DOMContentLoaded', () => {
  loadQuotes();
  populateCategories();
  showRandomQuote();

  document.getElementById('newQuote').addEventListener('click', showRandomQuote);
  setInterval(syncWithServer, SYNC_INTERVAL);
});
