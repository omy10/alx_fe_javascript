const SERVER_URL = 'https://jsonplaceholder.typicode.com/posts';
const SYNC_INTERVAL = 60000; // 1 minute

let quotes = [];

// Load quotes from local storage
function loadQuotes() {
  const stored = localStorage.getItem('quotes');
  if (stored) {
    quotes = JSON.parse(stored);
  }
}

// Save quotes to local storage
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

// Filter quotes by selected category
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

// Display a random quote
function showRandomQuote() {
  if (quotes.length === 0) return;
  const rand = quotes[Math.floor(Math.random() * quotes.length)];
  document.getElementById('quoteDisplay').innerHTML = `"${rand.text}" — ${rand.category}`;
}

// Add new quote and POST to server
async function addQuote() {
  const text = document.getElementById('newQuoteText').value.trim();
  const category = document.getElementById('newQuoteCategory').value.trim();
  if (text && category) {
    const newQuote = { text, category };
    quotes.push(newQuote);
    saveQuotes();
    populateCategories();
    showNotification('Quote added successfully.');
    document.getElementById('newQuoteText').value = '';
    document.getElementById('newQuoteCategory').value = '';

    // POST to server (simulated)
    try {
      const response = await fetch(SERVER_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newQuote)
      });
      if (response.ok) {
        const result = await response.json();
        console.log('Quote posted:', result);
      } else {
        console.error('Failed to post quote.');
      }
    } catch (error) {
      console.error('Error posting quote:', error);
    }
  } else {
    alert('Please enter both quote and category.');
  }
}

// Export quotes as JSON
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
    showNotification('Quotes imported successfully.');
  };
  fileReader.readAsText(event.target.files[0]);
}

// ✅ NEW: syncQuotes function to fetch and merge quotes
async function syncQuotes() {
  try {
    const response = await fetch(`${SERVER_URL}?_limit=5`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) throw new Error('Failed to fetch server quotes');

    const data = await response.json();
    const serverQuotes = data.map(item => ({
      text: item.title,
      category: 'Server'
    }));

    let updated = false;
    serverQuotes.forEach(sq => {
      if (!quotes.some(q => q.text === sq.text)) {
        quotes.push(sq);
        updated = true;
      }
    });

    if (updated) {
      saveQuotes();
      populateCategories();
      filterQuotes();
      showNotification('Quotes synced from server.');
    }
  } catch (error) {
    console.error('Error syncing quotes:', error);
  }
}

// Show notification message
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

// On page load
window.addEventListener('DOMContentLoaded', () => {
  loadQuotes();
  populateCategories();
  showRandomQuote();
  document.getElementById('newQuote').addEventListener('click', showRandomQuote);
  setInterval(syncQuotes, SYNC_INTERVAL); // ⏱️ Sync every minute
});
