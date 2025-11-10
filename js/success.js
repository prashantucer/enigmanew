// ============================================
// Success Page - Display Registration Details
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Get data from URL parameters or sessionStorage
    const urlParams = new URLSearchParams(window.location.search);
    
    // Try to get data from URL params first
    let paymentId = urlParams.get('payment_id');
    let orderId = urlParams.get('order_id');
    let userName = urlParams.get('name');
    let userEmail = urlParams.get('email');
    
    // If not in URL, try sessionStorage (set from registration page)
    if (!paymentId) {
        paymentId = sessionStorage.getItem('payment_id');
        orderId = sessionStorage.getItem('order_id');
        userName = sessionStorage.getItem('user_name');
        userEmail = sessionStorage.getItem('user_email');
    }
    
    // Update page elements
    const paymentIdEl = document.getElementById('paymentId');
    const orderIdEl = document.getElementById('orderId');
    const userNameEl = document.getElementById('userName');
    const userEmailEl = document.getElementById('userEmail');
    
    if (paymentIdEl) {
        paymentIdEl.textContent = paymentId || 'N/A';
    }
    
    if (orderIdEl) {
        orderIdEl.textContent = orderId || 'N/A';
    }
    
    if (userNameEl) {
        userNameEl.textContent = userName || 'N/A';
    }
    
    if (userEmailEl) {
        userEmailEl.textContent = userEmail || 'N/A';
    }
    
    // Download Ticket Button (Placeholder)
    const downloadTicketBtn = document.getElementById('downloadTicketBtn');
    if (downloadTicketBtn) {
        downloadTicketBtn.addEventListener('click', function() {
            // TODO: Implement ticket download functionality
            alert('Ticket download feature coming soon!');
            
            // Example implementation:
            // const ticketData = {
            //     name: userName,
            //     email: userEmail,
            //     paymentId: paymentId,
            //     orderId: orderId
            // };
            // generateAndDownloadTicket(ticketData);
        });
    }
    
    // Clear sessionStorage after displaying (optional)
    // sessionStorage.removeItem('payment_id');
    // sessionStorage.removeItem('order_id');
    // sessionStorage.removeItem('user_name');
    // sessionStorage.removeItem('user_email');
});






