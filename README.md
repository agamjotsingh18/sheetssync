# Google Sheets and Database Synchronization

**SheetsSync** project demonstrates a solution for real-time synchronization between Google Sheets and a database (e.g., MySQL). The goal is to ensure consistency between the data in Google Sheets and the database by automatically synchronizing changes in both directions.

![SheetsSync](logo.png)

## Features

- **Real-Time Synchronization:** Automatically updates the database and Google Sheets when changes occur.
- **Conflict Handling:** Resolves conflicts by applying custom logic when discrepancies are detected between the data sources.
- **CRUD Operations:** Supports Create, Read, Update, and Delete operations on both the database and Google Sheets.

## Prerequisites

Before setting up the project, ensure you have the following:

- Node.js and npm installed
- A MySQL database
- A Google Cloud project with Google Sheets API enabled
- Google Service Account credentials

## Setup

### 1. Clone the Repository

```
git clone https://github.com/yourusername/sheetssync.git
cd sheetssync
```

### 2. Install Dependencies
```
npm install
```

### 3. Configure Environment Variables
Create a .env file in the root of your project and add the following environment variables:

```
DB_HOST=localhost       
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=sheetssync_db
GOOGLE_SHEET_ID=your_google_sheet_id
GOOGLE_SERVICE_ACCOUNT=./config/your-service-account-file.json
PORT=5000
```

### 4. Create Google Service Account

1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Create a new project (if you don't have one).
3. Enable the Google Sheets API.
4. Create a service account and download the JSON credentials file.
5. Place the credentials file in the `config/` directory and update the `GOOGLE_SERVICE_ACCOUNT` path in your `.env` file.

### 5. Create Database and Table

Set up your MySQL database and create the required table:

```
CREATE DATABASE sheetssync_db;
USE sheetssync_db;

CREATE TABLE records (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  value VARCHAR(255) NOT NULL
);
```
