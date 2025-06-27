// Initialize quotes array from localStorage or default quotes
let quotes = JSON.parse(localStorage.getItem('quotes')) || [
    { text: "Believe you can and you're halfway there.", category: "Motivation" },
    { text: "Do or do not. There is no try.", category: "Inspiration" },
    { text: "Simplicity is the soul of efficiency.", category: "Work" }
  ];
  
  // Save quotes array to localStorage
  function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
  }
  
  // Show a random quote and store it in sessionStorage
  function showRandomQuote() {
    const quoteDisplay = document.getElementById('quoteDisplay');
  
    if (quotes.length === 0) {
      quoteDisplay.innerHTML = "<em>No quotes available. Add some!</em>";
      return;
    }
  
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];
  
    // Save last viewed quote in sessionStorage
    sessionStorage.setItem('lastViewedQuote', JSON.stringify(quote));
  
    quoteDisplay.innerHTML = `<p>"${quote.text}"</p><small>— ${quote.category}</small>`;
  }
  
  // Add new quote to the list
  function addQuote() {
    const quoteText = document.getElementById('newQuoteText').value.trim();
    const quoteCategory = document.getElementById('newQuoteCategory').value.trim();
  
    if (quoteText === "" || quoteCategory === "") {
      alert("Please fill out both the quote and category fields.");
      return;
    }
  
    quotes.push({ text: quoteText, category: quoteCategory });
    saveQuotes();
    alert("Quote added successfully!");
  
    // Clear inputs
    document.getElementById('newQuoteText').value = "";
    document.getElementById('newQuoteCategory').value = "";
  }
  
  // Export quotes as JSON file
  function exportToJsonFile() {
    const dataStr = JSON.stringify(quotes, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
  
    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.download = 'quotes.json';
    downloadLink.click();
  }
  
  // Import quotes from JSON file
  function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function (e) {
      try {
        const importedQuotes = JSON.parse(e.target.result);
        if (Array.isArray(importedQuotes)) {
          quotes.push(...importedQuotes);
          saveQuotes();
          alert('Quotes imported successfully!');
        } else {
          alert('Invalid file format.');
        }
      } catch (error) {
        alert('Error reading file.');
      }
    };
    fileReader.readAsText(event.target.files[0]);
  }
  
  // Create the quote addition form with inputs and buttons
  function createAddQuoteForm() {
    const formContainer = document.createElement('div');
  
    // Input for quote text
    const quoteInput = document.createElement('input');
    quoteInput.id = 'newQuoteText';
    quoteInput.placeholder = 'Enter a new quote';
    formContainer.appendChild(quoteInput);
  
    // Input for quote category
    const categoryInput = document.createElement('input');
    categoryInput.id = 'newQuoteCategory';
    categoryInput.placeholder = 'Enter quote category';
    formContainer.appendChild(categoryInput);
  
    // Add Quote button
    const addBtn = document.createElement('button');
    addBtn.textContent = 'Add Quote';
    addBtn.onclick = addQuote;
    formContainer.appendChild(addBtn);
  
    // Export Quotes button
    const exportBtn = document.createElement('button');
    exportBtn.textContent = 'Export Quotes';
    exportBtn.onclick = exportToJsonFile;
    formContainer.appendChild(exportBtn);
  
    // Import Quotes input
    const importInput = document.createElement('input');
    importInput.type = 'file';
    importInput.accept = '.json';
    importInput.addEventListener('change', importFromJsonFile);
    formContainer.appendChild(importInput);
  
    document.body.appendChild(formContainer);
  }
  
  // Initialize the app once DOM is fully loaded
  document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('newQuote').addEventListener('click', showRandomQuote);
    createAddQuoteForm();
  
    // Optional: Show last viewed quote on reload
    const lastViewed = sessionStorage.getItem('lastViewedQuote');
    if (lastViewed) {
      const quote = JSON.parse(lastViewed);
      document.getElementById('quoteDisplay').innerHTML = `<p>"${quote.text}"</p><small>— ${quote.category}</small>`;
    }
  });
  