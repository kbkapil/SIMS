// app.js - Main JavaScript file for Garage Booking System

document.addEventListener('DOMContentLoaded', function() {
    // Initialize based on current page
    const currentPage = window.location.pathname;

    if (currentPage.includes('bookings.html')) {
        loadBookings();
        setupFilters();
    } else if (currentPage.includes('new-booking.html')) {
        setupBookingForm();
    }
});

// Load and display all bookings
async function loadBookings() {
    try {
        const response = await fetch('/api/bookings');
        if (!response.ok) {
            throw new Error('Failed to fetch bookings');
        }
        const bookings = await response.json();
        displayBookings(bookings);
    } catch (error) {
        console.error('Error loading bookings:', error);
        document.getElementById('bookings-container').innerHTML = `
            <div class="content-section text-center">
                <p>Error loading bookings. Please try again later.</p>
                <button onclick="loadBookings()" class="btn btn-primary">Retry</button>
            </div>
        `;
    }
}

// Display bookings in the container
function displayBookings(bookings) {
    const container = document.getElementById('bookings-container');

    if (bookings.length === 0) {
        container.innerHTML = `
            <div class="content-section text-center">
                <p>No bookings found.</p>
                <a href="new-booking.html" class="btn btn-primary">Create Your First Booking</a>
            </div>
        `;
        return;
    }

    const bookingsHtml = `
        <div class="content-section">
            <h2 class="text-center">Your Bookings (${bookings.length})</h2>
            <div class="bookings-list">
                ${bookings.map(booking => `
                    <div class="booking-card">
                        <div class="booking-header">
                            <h3>${booking.serviceType}</h3>
                            <span class="status-badge status-${booking.status.toLowerCase()}">${booking.status}</span>
                        </div>
                        <div class="booking-details">
                            <p><strong>Vehicle:</strong> ${booking.vehicleNumber} (${booking.vehicleType})</p>
                            <p><strong>Date:</strong> ${new Date(booking.date).toLocaleDateString()}</p>
                            <p><strong>Time:</strong> ${booking.timeSlot}</p>
                            ${booking.model ? `<p><strong>Model:</strong> ${booking.model}</p>` : ''}
                            ${booking.specialInstructions ? `<p><strong>Notes:</strong> ${booking.specialInstructions}</p>` : ''}
                        </div>
                        ${booking.status === 'PENDING' ? `
                            <div class="booking-actions">
                                <button onclick="updateBookingStatus(${booking.id}, 'APPROVED')" class="btn btn-success btn-sm">Approve</button>
                                <button onclick="updateBookingStatus(${booking.id}, 'REJECTED')" class="btn btn-danger btn-sm">Reject</button>
                            </div>
                        ` : ''}
                    </div>
                `).join('')}
            </div>
        </div>
    `;

    container.innerHTML = bookingsHtml;
}

// Setup filters and search
function setupFilters() {
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const statusFilter = document.getElementById('statusFilter');
    const sortBy = document.getElementById('sortBy');
    const refreshBtn = document.getElementById('refreshBtn');

    searchBtn.addEventListener('click', filterBookings);
    searchInput.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            filterBookings();
        }
    });
    statusFilter.addEventListener('change', filterBookings);
    sortBy.addEventListener('change', filterBookings);
    refreshBtn.addEventListener('click', loadBookings);
}

// Filter bookings based on search and filters
function filterBookings() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const statusFilter = document.getElementById('statusFilter').value;
    const sortBy = document.getElementById('sortBy').value;

    // This would require storing the original bookings
    // For simplicity, reload and filter client-side
    loadBookings(); // In a real app, you'd filter the cached data
}

// Update booking status
async function updateBookingStatus(id, status) {
    try {
        const endpoint = status === 'APPROVED' ? `/api/bookings/${id}/approve` : `/api/bookings/${id}/reject`;
        const response = await fetch(endpoint, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Failed to update booking status');
        }

        const updatedBooking = await response.json();
        alert(`Booking ${status.toLowerCase()} successfully!`);
        loadBookings(); // Refresh the list
    } catch (error) {
        console.error('Error updating booking status:', error);
        alert('Error updating booking status. Please try again.');
    }
}

// Setup booking form submission
function setupBookingForm() {
    const form = document.getElementById('bookingForm');
    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();

            const formData = new FormData(form);
            const bookingData = {
                serviceType: formData.get('serviceType'),
                date: formData.get('date'),
                timeSlot: formData.get('timeSlot'),
                vehicleNumber: formData.get('vehicleNumber'),
                vehicleType: formData.get('vehicleType'),
                model: formData.get('model'),
                specialInstructions: formData.get('specialInstructions')
            };

            try {
                const response = await fetch('/api/bookings', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(bookingData)
                });

                if (!response.ok) {
                    throw new Error('Failed to create booking');
                }

                const newBooking = await response.json();
                alert('Booking created successfully!');
                form.reset();
                // Optionally redirect to bookings page
                // window.location.href = 'bookings.html';
            } catch (error) {
                console.error('Error creating booking:', error);
                alert('Error creating booking. Please try again.');
            }
        });
    }
}
