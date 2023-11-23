document.addEventListener('DOMContentLoaded', function () {
    const cartBody = document.getElementById('cart-body');
    const cartTotalElement = document.getElementById('cart-total');
    const proceedToPaymentBtn = document.getElementById('proceed-to-payment');

    // Mock data for the cart (assuming you have a cart array)
    const cartItems = [
        { book: { title: 'Book 1', price: 15.99 }, quantity: 2 },
        { book: { title: 'Book 2', price: 19.99 }, quantity: 1 },
        // Add more items as needed
    ];

    // Populate the cart table
    cartItems.forEach(cartItem => {
        const row = createCartItemRow(cartItem);
        cartBody.appendChild(row);
    });

    // Calculate and display the total amount
    updateTotalAmount();

    // Event listener for the "Proceed to Payment" button
    proceedToPaymentBtn.addEventListener('click', function () {
        // Navigate to the payment page (replace with your logic)
        window.location.href = 'payment.html';
    });

    function createCartItemRow(cartItem) {
        const row = document.createElement('tr');

        const titleCell = document.createElement('td');
        titleCell.textContent = cartItem.book.title;

        const priceCell = document.createElement('td');
        priceCell.textContent = `$${cartItem.book.price.toFixed(2)}`;

        const quantityCell = document.createElement('td');
        const quantityInput = document.createElement('input');
        quantityInput.type = 'number';
        quantityInput.min = '1';
        quantityInput.value = cartItem.quantity;
        quantityInput.addEventListener('input', function () {
            cartItem.quantity = parseInt(quantityInput.value, 10) || 1;
            updateTotalAmount();
        });
        quantityCell.appendChild(quantityInput);

        const totalCell = document.createElement('td');
        totalCell.textContent = `$${(cartItem.book.price * cartItem.quantity).toFixed(2)}`;

        const actionCell = document.createElement('td');
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.addEventListener('click', function () {
            // Remove the item from the cart
            const itemIndex = cartItems.indexOf(cartItem);
            if (itemIndex !== -1) {
                cartItems.splice(itemIndex, 1);
                // Update the cart table and total amount
                updateCartTable();
                updateTotalAmount();
            }
        });
        actionCell.appendChild(removeBtn);

        row.appendChild(titleCell);
        row.appendChild(priceCell);
        row.appendChild(quantityCell);
        row.appendChild(totalCell);
        row.appendChild(actionCell);

        return row;
    }

    function updateCartTable() {
        // Clear the cart table
        cartBody.innerHTML = '';
        // Populate the cart table with the updated cart items
        cartItems.forEach(cartItem => {
            const row = createCartItemRow(cartItem);
            cartBody.appendChild(row);
        });
    }

    function updateTotalAmount() {
        // Calculate the total amount
        const totalAmount = cartItems.reduce((total, cartItem) => {
            return total + cartItem.book.price * cartItem.quantity;
        }, 0);
        // Update the total amount element
        cartTotalElement.textContent = `$${totalAmount.toFixed(2)}`;
    }
});
