let quotes = [
    { text: "Believe you can and you're halfway there.", category: "Motivation" },
    { text: "Do or do not. There is no try.", category: "Inspiration" },
    { text: "Simplicity is the soul of efficiency.", category: "Work" }
  ];
  
  // Show random quote
  function showRandomQuote() {
    const quoteDisplay = document.getElementById('quoteDisplay');
  
    if (quotes.length === 0) {
      quoteDisplay.innerHTML = "<em>No quotes available. Add some!</em>";
      return;
    }
  
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];
  
    quoteDisplay.innerHTML = `<p>"${quote.text}"</p><small>— ${quote.category}</small>`;
  }
  
  // Add quote to the list
  function addQuote() {
    const quoteText = document.getElementById('newQuoteText').value.trim();
    const quoteCategory = document.getElementById('newQuoteCategory').value.trim();
  
    if (!quoteText || !quoteCategory) {
      alert("Please enter both a quote and a category.");
      return;
    }
  
    quotes.push({ text: quoteText, category: quoteCategory });
  
    // Clear inputs
    document.getElementById('newQuoteText').value = "";
    document.getElementById('newQuoteCategory').value = "";
  
    alert("Quote added!");
  }
  
  // ✅ Create the Add Quote form dynamically
  function createAddQuoteForm() {
    const formContainer = document.createElement('div');
  
    const quoteInput = document.createElement('input');
    quoteInput.id = 'newQuoteText';
    quoteInput.type = 'text';
    quoteInput.placeholder = 'Enter a new quote';
  
    const categoryInput = document.createElement('input');
    categoryInput.id = 'newQuoteCategory';
    categoryInput.type = 'text';
    categoryInput.placeholder = 'Enter quote category';
  
    const addButton = document.createElement('button');
    addButton.textContent = 'Add Quote';
    addButton.onclick = addQuote;
  
    // Append all to form container
    formContainer.appendChild(quoteInput);
    formContainer.appendChild(categoryInput);
    formContainer.appendChild(addButton);
  
    // Append to body (or a specific section)
    document.body.appendChild(formContainer);
  }
  
  // Run after DOM loads
  document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('newQuote').addEventListener('click', showRandomQuote);
    createAddQuoteForm(); // ✅ Dynamically create the form
  });
  