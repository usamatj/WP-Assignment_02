document.addEventListener('DOMContentLoaded', function () {
    const receiptBody = document.getElementById('receipt-body');
    const totalAmountElement = document.getElementById('total-amount');

    // Assuming you have a JSON file named books.json
    fetch('books.json')
        .then(response => response.json())
        .then(data => {
            // Simulate selected books for the payment receipt
            const selectedBooks = data.slice(0, 3); // Assuming you selected the first 3 books

            // Populate the receipt table
            selectedBooks.forEach(book => {
                const row = createReceiptRow(book);
                receiptBody.appendChild(row);
            });

            // Calculate and display the total amount
            const totalAmount = selectedBooks.reduce((total, book) => total + book.price, 0);
            totalAmountElement.textContent = `$${totalAmount.toFixed(2)}`;
        });

    function createReceiptRow(book) {
        const row = document.createElement('tr');

        const titleCell = document.createElement('td');
        titleCell.textContent = book.title;

        const priceCell = document.createElement('td');
        priceCell.textContent = `$${book.price.toFixed(2)}`;

        row.appendChild(titleCell);
        row.appendChild(priceCell);

        return row;
    }
});