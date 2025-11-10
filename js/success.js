// ============================================
// Success Page - Display Registration Details & Ticket Download
// ============================================

// Event data mapping
const eventData = {
    'open-mic': 'Open Mic',
    'kbc-quiz': 'KBC Quiz',
    'dramatics': 'Dramatics',
    'chess': 'Chess',
    'face-painting': 'Face Painting',
    'canvas-painting': 'Canvas Painting',
    'bug-brawl': 'Bug Brawl',
    'fashion-show': 'Fashion Show',
    'dance': 'Dance',
    'singing': 'Singing',
    'instrumental': 'Instrumental',
    'roadies': 'Roadies',
    'power-lifting': 'Power Lifting',
    'mehndi-art': 'Mehndi Art',
    'rangoli': 'Rangoli',
    'mandala-art': 'Mandala Art',
    'shark-tank': 'Shark Tank',
    'framefest': 'Framefest',
    'treasure-hunt': 'Treasure Hunt',
    'web-die': 'Web Die',
    'gamers-arena': 'Gamers Arena'
};

const collegeNames = {
    'UCER': 'United College of Engineering and Research (UCER)',
    'UIM': 'United Institute of Management (UIM)',
    'UPT': 'United Polytechnic (UPT)',
    'Other': 'Other'
};

document.addEventListener('DOMContentLoaded', function() {
    // Get data from URL parameters or sessionStorage
    const urlParams = new URLSearchParams(window.location.search);
    
    // Try to get data from URL params first
    let paymentId = urlParams.get('payment_id');
    let orderId = urlParams.get('order_id');
    let userName = urlParams.get('name');
    let userEmail = urlParams.get('email');
    
    // Get full registration data from sessionStorage
    let registrationData = null;
    const storedData = sessionStorage.getItem('registration_data');
    if (storedData) {
        try {
            registrationData = JSON.parse(storedData);
        } catch (e) {
            console.error('Error parsing registration data:', e);
        }
    }
    
    // If not in URL, try sessionStorage
    if (!paymentId && registrationData) {
        paymentId = registrationData.payment_id;
        orderId = registrationData.order_id;
        userName = registrationData.name;
        userEmail = registrationData.email;
    } else if (!paymentId) {
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
    const collegeEl = document.getElementById('college');
    const eventsEl = document.getElementById('events');
    const amountEl = document.getElementById('amount');
    
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
    
    // Display college
    if (collegeEl && registrationData) {
        const college = registrationData.college || '';
        let collegeDisplay = '';
        if (college === 'Other' && registrationData.customCollege) {
            collegeDisplay = registrationData.customCollege;
        } else {
            collegeDisplay = collegeNames[college] || college || 'N/A';
        }
        collegeEl.textContent = collegeDisplay;
    } else if (collegeEl) {
        collegeEl.textContent = 'N/A';
    }
    
    // Display events
    if (eventsEl && registrationData) {
        const event1 = eventData[registrationData.event1] || registrationData.event1 || '';
        const event2 = eventData[registrationData.event2] || registrationData.event2 || '';
        eventsEl.textContent = `${event1}${event1 && event2 ? ', ' : ''}${event2}` || 'N/A';
    } else if (eventsEl) {
        eventsEl.textContent = 'N/A';
    }
    
    // Display amount
    if (amountEl && registrationData) {
        amountEl.textContent = `₹${registrationData.amount || 300}`;
    } else if (amountEl) {
        amountEl.textContent = '₹300';
    }
    
    // Download Ticket Button
    const downloadTicketBtn = document.getElementById('downloadTicketBtn');
    if (downloadTicketBtn) {
        downloadTicketBtn.addEventListener('click', function() {
            generateAndDownloadTicket(registrationData || {
                name: userName,
                email: userEmail,
                payment_id: paymentId,
                order_id: orderId,
                amount: 300
            });
        });
    }
});

// Generate and Download Ticket as PDF
function generateAndDownloadTicket(data) {
    try {
        // Load jsPDF library dynamically
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
        script.onload = function() {
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();
            
            // Ticket dimensions
            const pageWidth = doc.internal.pageSize.getWidth();
            const pageHeight = doc.internal.pageSize.getHeight();
            const margin = 20;
            let yPos = margin;
            
            // Colors
            const primaryColor = [0, 255, 255]; // Cyan
            const textColor = [255, 255, 255]; // White
            const bgColor = [20, 20, 30]; // Dark blue
            
            // Header with background
            doc.setFillColor(...bgColor);
            doc.rect(0, 0, pageWidth, 50, 'F');
            
            // Logo/Title
            doc.setTextColor(...textColor);
            doc.setFontSize(24);
            doc.setFont('helvetica', 'bold');
            doc.text('ENIGMA XIII', pageWidth / 2, 20, { align: 'center' });
            
            doc.setFontSize(12);
            doc.setFont('helvetica', 'normal');
            doc.text('Registration Ticket', pageWidth / 2, 35, { align: 'center' });
            
            yPos = 60;
            
            // Ticket content
            doc.setTextColor(0, 0, 0);
            doc.setFontSize(16);
            doc.setFont('helvetica', 'bold');
            doc.text('Registration Confirmation', margin, yPos);
            
            yPos += 15;
            
            // Draw line
            doc.setDrawColor(...primaryColor);
            doc.setLineWidth(0.5);
            doc.line(margin, yPos, pageWidth - margin, yPos);
            yPos += 10;
            
            // Registration details
            doc.setFontSize(11);
            doc.setFont('helvetica', 'normal');
            
            // Get college display name
            let collegeDisplay = 'N/A';
            if (data.college === 'Other' && data.customCollege) {
                collegeDisplay = data.customCollege;
            } else {
                collegeDisplay = collegeNames[data.college] || data.college || 'N/A';
            }
            
            const details = [
                ['Name:', data.name || 'N/A'],
                ['Email:', data.email || 'N/A'],
                ['College:', collegeDisplay],
                ['Student ID:', data.studIdNo || 'N/A'],
                ['Course:', data.course || 'N/A'],
                ['Branch:', data.branch || 'N/A'],
                ['Year:', data.year || 'N/A'],
                ['Contact:', data.contactNumber || 'N/A'],
                ['Event 1:', eventData[data.event1] || data.event1 || 'N/A'],
                ['Event 2:', eventData[data.event2] || data.event2 || 'N/A'],
                ['Payment ID:', data.payment_id || 'N/A'],
                ['Order ID:', data.order_id || 'N/A'],
                ['Amount Paid:', `₹${data.amount || 300}`]
            ];
            
            details.forEach(([label, value]) => {
                if (yPos > pageHeight - 30) {
                    doc.addPage();
                    yPos = margin;
                }
                
                doc.setFont('helvetica', 'bold');
                doc.text(label, margin, yPos);
                doc.setFont('helvetica', 'normal');
                doc.text(value, margin + 50, yPos);
                yPos += 8;
            });
            
            yPos += 10;
            
            // Footer line
            doc.setDrawColor(...primaryColor);
            doc.line(margin, yPos, pageWidth - margin, yPos);
            yPos += 10;
            
            // Important note
            doc.setFontSize(10);
            doc.setFont('helvetica', 'italic');
            doc.setTextColor(100, 100, 100);
            doc.text('Please bring this ticket (or a copy) to the event venue.', margin, yPos);
            yPos += 6;
            doc.text('For queries, contact: enigma@united.edu.in', margin, yPos);
            
            // Date
            yPos += 10;
            const date = new Date();
            doc.setFont('helvetica', 'normal');
            doc.text(`Generated on: ${date.toLocaleString('en-IN')}`, margin, yPos);
            
            // Save PDF
            const fileName = `ENIGMA_XIII_Ticket_${data.payment_id || 'ticket'}.pdf`;
            doc.save(fileName);
            
            console.log('✅ Ticket downloaded successfully');
        };
        
        document.head.appendChild(script);
    } catch (error) {
        console.error('Error generating ticket:', error);
        alert('Error generating ticket. Please try again or contact support.');
    }
}
