# Adventure Park Booking Backend

This project includes a small backend for the booking form.

## Setup
1. Copy .env.example to .env.
2. Fill in your Microsoft Outlook SMTP credentials.
3. Deploy the server to Render.
4. Set the deployed URL in the booking page via a global variable:

```html
<script>
  window.BOOKING_API_URL = 'https://your-render-app.onrender.com';
</script>
```

## Important
- Do not put your real email password in the repo.
- Keep .env local and set it in Render dashboard environment variables.
