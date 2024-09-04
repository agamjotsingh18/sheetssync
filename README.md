# Google Sheets and Database Synchronization

**SheetSync** project demonstrates a solution for real-time synchronization between Google Sheets and a database (e.g., MySQL). The goal is to ensure consistency between the data in Google Sheets and the database by automatically synchronizing changes in both directions.

![SheetsSync](logo-sheetssync.png)

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


## Approach
### Setup and Configuration:

Modules: We use googleapis for interacting with Google Sheets, path to handle file paths, google-auth-library for authentication, and dotenv to manage environment variables.
Environment Variables, Google Sheets API Initialization: Load environment variables from a .env file to get sensitive data like the Google Sheets ID and the service account key file path.
API Client: Instantiate a Sheets API client to make requests to Google Sheets.


### Functions:

- readSheet(range):

Purpose: Reads data from a specified range in the Google Sheet.
Steps: Uses the Sheets API to fetch values from the given range and returns the data. If there’s an error, it logs it and re-throws it.

- writeSheet(range, values):

Purpose: Writes data to a specified range in the Google Sheet.
Steps: Find Empty Row: Calls getFirstEmptyRow to determine the first empty row in the sheet.
Append Data: Appends the provided values to the determined row. If there’s an error, it logs it and re-throws it.

- getFirstEmptyRow(spreadsheetId):

Purpose: Determines the first empty row in the sheet.
Steps: Fetch Data: Retrieves all existing rows from column A.
Calculate Empty Row: Calculates the next available row based on the current row count. If there’s an error, it logs it and re-throws it.

## Challenges

During the project, I encountered several challenges related to building the synchronization logic between Google Sheets and the database. One of the primary difficulties was ensuring data consistency, which involved handling discrepancies and conflicts between the two data sources. Implementing accurate range selection and data parsing for reading data from Google Sheets proved complex, especially when the data format or location varied. Writing data introduced its own set of challenges, such as accurately finding the first empty row in the sheet and managing concurrency issues to prevent data from being overwritten or misaligned. Additionally, error handling required careful attention to ensure that errors were logged properly and that there were strategies in place for retrying failed operations and recovering from issues without compromising data integrity. Overall, the project required navigating these complexities to create a reliable synchronization system.
