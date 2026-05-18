# Beds24 Integration Research

## Overview
Beds24 is a comprehensive online booking engine and channel management platform. 
Free for 1 property. ~20€/month for channel manager (Booking.com, Expedia, etc.).

## Quick Integration Options

### 1. Booking Widget (Easiest)
- Go to: `(SETTINGS) > BOOKING ENGINE > BOOKING WIDGETS`
- Choose: Availability Calendar, Booking Box, or Simple Button
- Copy generated HTML code
- Paste into Astro component
- Supports 30+ languages

### 2. Embedded iFrame
- Generator at: `(SETTINGS) > BOOKING ENGINE > BOOKING WIDGETS > iFrame GENERATOR`
- Adjustable height/width
- Note: Modern browsers block third-party cookies
- Solution: Use URL parameter passing (provided by Beds24)

### 3. Custom HTML Form (Most Control)
Post to: `https://beds24.com/booking2.php`

**Parameters:**
- `propid` – Property ID
- `roomid` – Specific room ID
- `ownerid` – Show all properties
- `fdate_date` + `fdate_monthyear` – Check-in
- `numnight` – Length of stay
- `numadult` / `numchild` – Guest count
- `lang` – Language code
- `referer` – Tracking code

### 4. Developer API
- Enable at: `SETTINGS > ACCOUNT > ACCOUNT ACCESS`
- JSON API recommended
- Key functions: `getAvailabilities`, `setBooking`, `getPropertyContent`
- Rate limit: One call at a time, spaced by seconds

## Next Steps for Hostalet de Tossa
1. Create free Beds24 account for Hostalet
2. Set up property details, rooms, rates
3. Generate booking widget
4. Replace Netlify Forms with Beds24 widget on room pages
5. Keep Netlify Forms as fallback during transition

## Resources
- [Booking Widgets](https://beds24.com/booking-widgets.html)
- [Embedded Iframe Wiki](https://wiki.beds24.com/index.php/Embedded_Iframe)
- [Custom Widget Wiki](https://wiki.beds24.com/index.php/Make_Your_Own_Booking_Widget)
- [API Docs](https://www.beds24.com/api/)
