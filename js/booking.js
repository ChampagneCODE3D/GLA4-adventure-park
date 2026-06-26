const ticketForm = document.getElementById("ticketForm");
const confirmationMessage = document.getElementById("confirmationMessage");
const yearElement = document.getElementById("currentYear");
const API_BASE_URL = window.BOOKING_API_URL || "";

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
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/booking`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          tickets,
          ticketNumber,
          submittedAt: new Date().toISOString()
        })
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result.message || "The booking service is unavailable right now.");
      }

      if (confirmationMessage) {
        confirmationMessage.textContent = `Thank you, ${name}. Your booking for ${tickets} ticket(s) is confirmed. Ticket Number: ${ticketNumber}.`;
      }
      ticketForm.reset();
    } catch (error) {
      if (confirmationMessage) {
        confirmationMessage.textContent = error.message || "We could not submit your booking. Please try again later.";
      }
    }
  });
}

if (yearElement) {
  yearElement.textContent = String(new Date().getFullYear());
}
