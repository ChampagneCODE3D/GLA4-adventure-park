const ticketForm = document.getElementById("ticketForm");
const confirmationMessage = document.getElementById("confirmationMessage");
const yearElement = document.getElementById("currentYear");
const API_BASE_URL = window.BOOKING_API_URL || "https://adventure-park-booking.onrender.com";

function generateTicketNumber() {
  const randomPart = Math.floor(1000 + Math.random() * 9000);
  return `AP-${Date.now()}-${randomPart}`;
}

if (ticketForm) {
  ticketForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!ticketForm.checkValidity()) {
      ticketForm.reportValidity();
      return;
    }

    const formData = new FormData(ticketForm);
    const name = (formData.get("name") || "Guest").toString().trim();
    const email = (formData.get("email") || "").toString().trim();
    const tickets = Number(formData.get("tickets"));

    if (!Number.isInteger(tickets) || tickets < 1) {
      if (confirmationMessage) {
        confirmationMessage.textContent = "Please enter at least 1 ticket.";
      }
      return;
    }

    const ticketNumber = generateTicketNumber();

    if (confirmationMessage) {
      confirmationMessage.textContent = "Submitting your booking...";
      confirmationMessage.style.color = "";
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/booking`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, tickets, ticketNumber, submittedAt: new Date().toISOString() })
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result.message || "Booking failed. Please try again.");
      }

      if (confirmationMessage) {
        confirmationMessage.textContent = `🎟️ Booking confirmed! Thank you, ${name}. Your ${tickets} ticket(s) are reserved. Reference: ${ticketNumber}. A confirmation has been sent to ${email}.`;
        confirmationMessage.style.color = "green";
      }
      ticketForm.reset();
    } catch (error) {
      if (confirmationMessage) {
        confirmationMessage.textContent = "We could not complete your booking right now. Please try again shortly.";
        confirmationMessage.style.color = "red";
      }
    }
  });
}

if (yearElement) {
  yearElement.textContent = String(new Date().getFullYear());
}
