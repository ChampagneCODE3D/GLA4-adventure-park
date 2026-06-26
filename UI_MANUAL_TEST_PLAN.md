# Manual UI Test Plan

This assignment is a simple static website, so a short manual UI test is enough for proof of functionality. The goal is to confirm that the main user journeys work and to collect a few screenshots as evidence.

## What this test covers
- Home page layout and content
- About page navigation
- Booking form submission
- Search filtering for users
- Responsive behavior on desktop and mobile
- Basic loading and empty-state behavior

## Test setup
- Open the site in a browser.
- If needed, use the local files directly or the published GitHub Pages URL.
- Keep the browser developer tools open only if you want to confirm network behavior.

## Test 1: Home page loads correctly
Steps:
1. Open the home page.
2. Look for the header, booking form, search area, user cards, posts, and footer.

Expected result:
- The page loads without obvious layout errors.
- The main sections are visible and readable.

Evidence to collect:
- Screenshot of the full home page.

## Test 2: About page opens and displays content
Steps:
1. Click the About link in the navigation.
2. Review the page content.

Expected result:
- The About page opens successfully.
- The page shows attraction information and the same navigation/footer style.

Evidence to collect:
- Screenshot of the About page.

## Test 3: Booking form works
Steps:
1. Scroll to the booking form.
2. Enter a name, email, date, and ticket count.
3. Submit the form.

Expected result:
- The form does not refresh the page unexpectedly.
- A confirmation message appears with a generated ticket number.

Evidence to collect:
- Screenshot of the confirmation message after submission.

## Test 4: Search filter works
Steps:
1. Find the search box for users.
2. Type a common name such as "Leanne".
3. Then try a name that should not match.

Expected result:
- Matching users appear when a valid name is entered.
- A no-results message appears when no users match.

Evidence to collect:
- Screenshot of a successful search result.
- Screenshot of the no-results state.

## Test 5: Mobile layout is usable
Steps:
1. Open the browser developer tools.
2. Switch to a mobile width such as 375px.
3. Review the home page and About page.

Expected result:
- The layout stacks cleanly.
- Text remains readable and buttons are still usable.

Evidence to collect:
- Screenshot of the home page on mobile.
- Screenshot of the About page on mobile.

## Test 6: Loading and error states are acceptable
Steps:
1. Refresh the page while the network is slow or interrupted.
2. Observe the user cards and posts area.

Expected result:
- A loading message appears while data is being fetched.
- If loading fails, an error message is shown clearly.

Evidence to collect:
- Screenshot of the loading or error state if one appears.

## Suggested evidence folder
Use the existing screenshot folder if available:
- screenshots/ui-test-frames/

Suggested screenshot names:
- home-desktop.png
- about-desktop.png
- booking-confirmation.png
- search-result.png
- no-results.png
- home-mobile.png

## Final pass checklist
- [ ] Home page loads correctly
- [ ] About page opens correctly
- [ ] Booking form submits successfully
- [ ] Search filtering works
- [ ] No-results message appears when appropriate
- [ ] Mobile layout is readable
- [ ] Screenshots were collected for evidence
