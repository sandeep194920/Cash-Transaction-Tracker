# Cash Transaction Tracker

## Overview
Cash Transaction Tracker is an app designed to help small business owners, particularly those running cash-only operations, keep track of customer transactions and outstanding balances. The app ensures that businesses can manage who has paid how much and who is owed money without needing to handle cash for every transaction.

### Example Use Case
A restaurant owner runs a home-based business accepting only cash. Customers may pay in advance, leaving a balance for future use, or pay at the end of the month. This app tracks these transactions, helping the owner manage customer accounts efficiently.

## Features
1. **Customer Management**
   - **List of Customers**: Displays all customers the owner is managing, each with a unique identifier, name, and outstanding balance.
   - **Add New Customer**: Provides functionality to add new customers.

2. **Customer Transaction History**
   - **Transaction List**: Displays a list of transactions for a selected customer, including transaction date, outstanding amount, and amount paid.
   - **Add New Transaction**: Allows the owner to add new transaction entries for the customer.

3. **Detailed Transaction View**
   - **Transaction Details**: Shows details of a specific transaction, including the date, amount, items purchased, and options to edit the transaction.

## Technologies Used
- **Frontend**: Expo React Native
- **Backend**: MongoDB Atlas

## Additional Development Notes
### Code Commenting
For better code readability and maintenance, use the `Better Comments` extension by Aaron Bond in VS Code. This extension provides color-coded comments for different types of annotations.

```js
// ** IMPORTANT COMMENT - Will be in green color
// *? INFO COMMENT - Will be in blue color
// *! DANGER COMMENT - Will be in red color
// TODO: - Will be in orange color 
```
