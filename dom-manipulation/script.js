let quotes = [
    { text: "Believe you can and you're halfway there.", category: "Motivation" },
    { text: "Do or do not. There is no try.", category: "Inspiration" },
    { text: "Simplicity is the soul of efficiency.", category: "Work" }
  ];
  
  let quoteDisplay;
  
  function showRandomQuote() {
    if (quotes.length === 0) {
      quoteDisplay.innerHTML = "<em>No quotes available. Add some!</em>";
      return;
    }
  
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];
    
    //  Use innerHTML instead of textContent
    quoteDisplay.innerHTML = `<p>"${quote.text}"</p><small>— ${quote.category}</small>`;
  }
  
  function addQuote() {
    const textInput = document.getElementById('newQuoteText');
    const categoryInput = document.getElementById('newQuoteCategory');
  
    const quoteText = textInput.value.trim();
    const quoteCategory = categoryInput.value.trim();
  
    if (quoteText === "" || quoteCategory === "") {
      alert("Please enter both a quote and a category.");
      return;
    }
  
    const newQuote = { text: quoteText, category: quoteCategory };
    quotes.push(newQuote);
  
    textInput.value = "";
    categoryInput.value = "";
    alert("Quote added successfully!");
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    quoteDisplay = document.getElementById('quoteDisplay');
    document.getElementById('newQuote').addEventListener('click', displayRandomQuote);
  });
  