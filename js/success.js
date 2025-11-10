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
            // Show loading state
            const originalText = downloadTicketBtn.innerHTML;
            downloadTicketBtn.disabled = true;
            downloadTicketBtn.innerHTML = '<span>⏳ Generating Ticket...</span>';
            
            generateAndDownloadTicket(registrationData || {
                name: userName,
                email: userEmail,
                payment_id: paymentId,
                order_id: orderId,
                amount: 300
            }).finally(() => {
                // Reset button
                downloadTicketBtn.disabled = false;
                downloadTicketBtn.innerHTML = originalText;
            });
        });
    }
});

// Convert image to base64
function getImageAsBase64(url, callback) {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = function() {
        const canvas = document.createElement('canvas');
        canvas.width = this.width;
        canvas.height = this.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(this, 0, 0);
        const dataURL = canvas.toDataURL('image/png');
        callback(dataURL);
    };
    img.onerror = function() {
        console.warn('Logo image failed to load, using text only');
        callback(null);
    };
    img.src = url;
}

// Generate and Download Ticket as PDF
function generateAndDownloadTicket(data) {
    return new Promise((resolve, reject) => {
        try {
            // Load jsPDF library dynamically
            if (window.jspdf) {
                createTicketPDF(data, resolve, reject);
            } else {
                const script = document.createElement('script');
                script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
                script.onload = function() {
                    createTicketPDF(data, resolve, reject);
                };
                script.onerror = function() {
                    reject(new Error('Failed to load PDF library'));
                };
                document.head.appendChild(script);
            }
        } catch (error) {
            console.error('Error generating ticket:', error);
            alert('Error generating ticket. Please try again or contact support.');
            reject(error);
        }
    });
}

function createTicketPDF(data, resolve, reject) {
    try {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        // Ticket dimensions
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        const margin = 20;
        let yPos = margin;
        
        // Colors - ENIGMA theme
        const primaryColor = [0, 255, 255]; // Cyan
        const secondaryColor = [255, 0, 255]; // Magenta
        const textColor = [255, 255, 255]; // White
        const bgColor = [15, 15, 25]; // Dark blue
        const accentColor = [0, 200, 255]; // Light cyan
        
        // ============================================
        // HEADER SECTION WITH LOGO
        // ============================================
        const headerHeight = 65;
        
        // Header background with gradient effect
        doc.setFillColor(...bgColor);
        doc.rect(0, 0, pageWidth, headerHeight, 'F');
        
        // Decorative border
        doc.setDrawColor(...primaryColor);
        doc.setLineWidth(2);
        doc.rect(0, 0, pageWidth, headerHeight);
        
        // Try to add logo
        const logoPath = 'assets/logo/ENIGMA!_20251018_152032_0000.png';
        getImageAsBase64(logoPath, function(logoBase64) {
            if (logoBase64) {
                try {
                    // Add logo (40x40 size)
                    doc.addImage(logoBase64, 'PNG', pageWidth / 2 - 20, 10, 40, 40);
                    yPos = 60;
                } catch (e) {
                    console.warn('Could not add logo image:', e);
                    yPos = 25;
                }
            } else {
                yPos = 25;
            }
            
            // Title
            doc.setTextColor(...textColor);
            doc.setFontSize(28);
            doc.setFont('helvetica', 'bold');
            doc.text('ENIGMA XIII', pageWidth / 2, yPos, { align: 'center' });
            
            yPos += 8;
            
            // Subtitle
            doc.setFontSize(11);
            doc.setFont('helvetica', 'normal');
            doc.text('Registration Confirmation Ticket', pageWidth / 2, yPos, { align: 'center' });
            
            yPos += 5;
            doc.setFontSize(9);
            doc.setTextColor(200, 200, 200);
            doc.text('The official cultural festival of United Group of Institutions', pageWidth / 2, yPos, { align: 'center' });
            
            yPos = headerHeight + 15;
            
            // ============================================
            // TICKET CONTENT
            // ============================================
            
            // Main title
            doc.setTextColor(0, 0, 0);
            doc.setFontSize(18);
            doc.setFont('helvetica', 'bold');
            doc.text('Registration Details', margin, yPos);
            
            yPos += 12;
            
            // Decorative line
            doc.setDrawColor(...primaryColor);
            doc.setLineWidth(1.5);
            doc.line(margin, yPos, pageWidth - margin, yPos);
            yPos += 10;
            
            // Get college display name
            let collegeDisplay = 'N/A';
            if (data.college === 'Other' && data.customCollege) {
                collegeDisplay = data.customCollege;
            } else {
                collegeDisplay = collegeNames[data.college] || data.college || 'N/A';
            }
            
            // Registration details with better formatting
            doc.setFontSize(10);
            doc.setFont('helvetica', 'normal');
            
            const details = [
                { label: 'Name', value: data.name || 'N/A', important: true },
                { label: 'Email', value: data.email || 'N/A' },
                { label: 'Student ID', value: data.studIdNo || 'N/A' },
                { label: 'College', value: collegeDisplay, important: true },
                { label: 'Course', value: data.course || 'N/A' },
                { label: 'Branch', value: data.branch || 'N/A' },
                { label: 'Year', value: data.year || 'N/A' },
                { label: 'Contact', value: data.contactNumber || 'N/A' },
                { label: 'Event 1', value: eventData[data.event1] || data.event1 || 'N/A', important: true },
                { label: 'Event 2', value: eventData[data.event2] || data.event2 || 'N/A', important: true },
            ];
            
            // Payment details section
            yPos += 5;
            doc.setFontSize(12);
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(...primaryColor);
            doc.text('Payment Information', margin, yPos);
            yPos += 8;
            
            doc.setFontSize(10);
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(0, 0, 0);
            
            const paymentDetails = [
                { label: 'Payment ID', value: data.payment_id || 'N/A' },
                { label: 'Order ID', value: data.order_id || 'N/A' },
                { label: 'Amount Paid', value: `₹${data.amount || 300}`, important: true }
            ];
            
            // Draw details with better styling
            [...details, ...paymentDetails].forEach((item, index) => {
                if (yPos > pageHeight - 40) {
                    doc.addPage();
                    yPos = margin + 10;
                }
                
                // Highlight important fields
                if (item.important) {
                    doc.setFillColor(240, 255, 255);
                    doc.rect(margin - 2, yPos - 6, pageWidth - (margin * 2) + 4, 8, 'F');
                }
                
                doc.setFont('helvetica', 'bold');
                doc.setTextColor(60, 60, 60);
                doc.text(item.label + ':', margin, yPos);
                
                doc.setFont('helvetica', 'normal');
                doc.setTextColor(0, 0, 0);
                const valueX = margin + 45;
                const maxWidth = pageWidth - valueX - margin;
                
                // Handle long text
                const lines = doc.splitTextToSize(item.value, maxWidth);
                doc.text(lines, valueX, yPos);
                
                yPos += lines.length * 5 + 3;
            });
            
            yPos += 10;
            
            // ============================================
            // FOOTER SECTION
            // ============================================
            
            // Footer line
            doc.setDrawColor(...primaryColor);
            doc.setLineWidth(1);
            doc.line(margin, yPos, pageWidth - margin, yPos);
            yPos += 8;
            
            // Important instructions box
            doc.setFillColor(255, 255, 240);
            doc.setDrawColor(255, 200, 0);
            doc.setLineWidth(0.5);
            const boxHeight = 35;
            doc.roundedRect(margin, yPos, pageWidth - (margin * 2), boxHeight, 3, 3, 'FD');
            
            yPos += 6;
            doc.setFontSize(9);
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(200, 100, 0);
            doc.text('📋 Important Instructions:', margin + 3, yPos);
            
            yPos += 6;
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(80, 80, 80);
            doc.setFontSize(8);
            const instructions = [
                '• Please bring this ticket (or a digital copy) to the event venue',
                '• Keep your Payment ID safe for any queries',
                '• Event dates: November 21-22, 2025',
                '• For queries: enigma@united.edu.in'
            ];
            
            instructions.forEach(instruction => {
                if (yPos > pageHeight - 15) {
                    doc.addPage();
                    yPos = margin + 10;
                }
                doc.text(instruction, margin + 5, yPos);
                yPos += 5;
            });
            
            yPos += 8;
            
            // Date and QR code area
            doc.setFontSize(8);
            doc.setFont('helvetica', 'italic');
            doc.setTextColor(120, 120, 120);
            const date = new Date();
            doc.text(`Ticket Generated: ${date.toLocaleString('en-IN', { 
                day: '2-digit', 
                month: 'short', 
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            })}`, margin, yPos);
            
            // Footer text
            yPos = pageHeight - 15;
            doc.setFontSize(7);
            doc.setTextColor(150, 150, 150);
            doc.text('This is an official ENIGMA XIII registration ticket. Unauthorized reproduction is prohibited.', 
                pageWidth / 2, yPos, { align: 'center' });
            
            // Save PDF
            const fileName = `ENIGMA_XIII_Ticket_${data.payment_id || Date.now()}.pdf`;
            doc.save(fileName);
            
            console.log('✅ Ticket downloaded successfully');
            resolve();
        } catch (error) {
            console.error('Error creating PDF:', error);
            reject(error);
        }
    });
}
