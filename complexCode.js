/*
Filename: complexCode.js

Description: This code is a simulation of a restaurant reservation system. It allows users to browse through available tables, make reservations, and manage their bookings. It also includes features like waitlist, table availability status, and sending email notifications to users.

Disclaimer: This code is a simplified version for demonstration purposes only and may not include all necessary error handling and security measures.

Author: John Doe
Date: October 1, 2022
*/

// Code starts here
// Define global variables
const MAX_TABLE_CAPACITY = 4;
let tables = [];
let bookings = [];
let waitlist = [];

// Function to initialize tables
function initializeTables() {
  for (let i = 1; i <= 10; i++) {
    tables.push({
      id: i,
      capacity: MAX_TABLE_CAPACITY,
      isOccupied: false,
    });
  }
}

// Function to display available tables
function displayAvailableTables() {
  console.log("Available Tables:");
  for (let i = 0; i < tables.length; i++) {
    if (!tables[i].isOccupied) {
      console.log(`Table ${tables[i].id} (${tables[i].capacity} seats)`);
    }
  }
}

// Function to make a reservation
function makeReservation(tableId, name, email, guests) {
  const table = tables.find((table) => table.id === tableId);
  if (!table) {
    console.log(`Table ${tableId} does not exist.`);
    return;
  }

  if (table.isOccupied) {
    console.log(`Table ${tableId} is already occupied.`);
    waitlist.push({
      tableId,
      name,
      email,
      guests,
    });
    console.log(`${name} has been added to the waitlist.`);
    return;
  }

  if (table.capacity < guests) {
    console.log(`Table ${tableId} does not have enough capacity.`);
    waitlist.push({
      tableId,
      name,
      email,
      guests,
    });
    console.log(`${name} has been added to the waitlist.`);
    return;
  }

  table.isOccupied = true;
  bookings.push({
    tableId,
    name,
    email,
    guests,
  });
  console.log(`${name} has successfully made a reservation for table ${tableId}.`);

  // Send email notification to the user
  sendEmailNotification(email, `Reservation confirmed for table ${tableId}`);
}

// Function to cancel a reservation
function cancelReservation(tableId) {
  const table = tables.find((table) => table.id === tableId);
  if (!table) {
    console.log(`Table ${tableId} does not exist.`);
    return;
  }

  if (!table.isOccupied) {
    console.log(`Table ${tableId} is not occupied.`);
    return;
  }

  const booking = bookings.find((booking) => booking.tableId === tableId);
  table.isOccupied = false;

  // Send email notification to the user
  sendEmailNotification(booking.email, `Reservation for table ${tableId} has been canceled`);

  if (waitlist.length > 0) {
    const nextGuest = waitlist.shift();
    makeReservation(nextGuest.tableId, nextGuest.name, nextGuest.email, nextGuest.guests);
  }
}

// Function to send email notification
function sendEmailNotification(email, message) {
  console.log(`Sending email to ${email}: ${message}`);
}

// Example usage of the reservation system
initializeTables();
console.log("Welcome to the Reservation System");
console.log("===============================");
console.log("Available tables:");
displayAvailableTables();
console.log("===============================");
makeReservation(1, "John Doe", "john@example.com", 2);
console.log("===============================");
cancelReservation(1);
console.log("===============================");
console.log("Available tables after cancellation:");
displayAvailableTables();
console.log("===============================");
makeReservation(1, "Jane Smith", "jane@example.com", 4);
console.log("===============================");
console.log("Available tables after reservation:");
displayAvailableTables();