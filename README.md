# RAG Model Application: React Frontend Overview

This React-based application leverages a Retrieval-Augmented Generation (RAG) model to generate answers from uploaded documents. The app allows users to create search engines for their documents, upload files, and retrieve insights efficiently. Below is a brief explanation of each component:

## 1. `HomePage` Component
- **Purpose**: This is the landing page where users can log in using Google authentication and access the dashboard.
- **Features**:
  - Displays the app's purpose and key features.
  - Contains a Google login button for authentication using Firebase.
  - On successful login, the user is navigated to the `/dashboard`.

### Key Functionality:
- **Google Authentication**: Using `signInWithPopup`, it logs the user in via their Google account. Once logged in, the user is redirected to the dashboard.
- **`localStorage`**: The user's UID is stored in `localStorage` for session persistence.

---

## 2. `Dashboard` Component
- **Purpose**: This component displays the user's created search engines (indexes) and allows them to create or delete indexes.
- **Features**:
  - Fetches the list of user-specific indexes.
  - Allows users to create new search engines (indexes) for uploading files.
  - Enables deletion of existing indexes.
  - Displays a button to generate a new search engine.

### Key Functionality:
- **Fetching Indexes**: The app calls the backend API (`/index`) to retrieve a list of created indexes for the logged-in user.
- **Creating an Index**: Users can create an index by entering a valid name, which is sanitized before submission.
- **Deleting an Index**: Users can delete an index, and the list of indexes is automatically refreshed after a successful deletion.

---

## 3. `SearchPage` Component
- **Purpose**: This page provides the search functionality for each index. It contains both the upload form and search form.
- **Features**:
  - Displays a "Go to Dashboard" button that redirects the user back to the dashboard.
  - Allows users to upload files for indexing and search within their uploaded files.

### Key Functionality:
- **Upload Form**: Allows users to upload documents that will be indexed for search.
- **Search Form**: A search box is provided for querying within the uploaded files of the selected index.
- **Dynamic Routing**: The `indexNumber` is dynamically extracted from the URL using `useParams`, which is then passed to the upload and search forms.

---

## 4. `UploadForm` Component

The `UploadForm` component is designed to handle file uploads in a React-based web application. It allows users to upload, view, and delete files (such as PDFs, CSVs, Word, Excel, and text files). The component integrates with a backend server to manage these files.

## **State Management**
The component uses the following states to manage file upload and display logic:
- **`File`**: Stores the currently selected file.
- **`uploadMessage`**: Displays success or error messages related to file upload.
- **`loading`**: Indicates whether a file is being uploaded.
- **`files`**: A list of previously uploaded files.
- **`loadingFile`**: Tracks the loading state of the uploaded files.
- **`error`**: Stores error messages related to file management.
- **`deleteData`**: Indicates if a file is being deleted.
- **`fileInputRef`**: A reference to the file input element to reset the input value after uploading.

## **Functions**
### `handleFileChange`
- **Description**: Updates the `File` state when a user selects a file from the file input.
- **Parameters**: 
  - `e` (Event): The file input change event.

### `handleUpload`
- **Description**: Handles the file upload process. It validates the selected file, sends it to the server, and updates the state accordingly.
- **Validation**:
  - Ensures that a file is selected.
  - Checks if the selected file type is one of the supported types (PDF, CSV, Word, Excel, text).
- **API Call**: Sends the file to the backend server using a `POST` request to the `/upload/:user-id-:index` endpoint.
- **Parameters**: None (uses component state).

### `deleteFile`
- **Description**: Deletes a file from the server and updates the file list accordingly.
- **API Call**: Sends a `DELETE` request to the `/files/:user-id-:index` endpoint.
- **Parameters**:
  - `file` (string): The name of the file to be deleted.

### `fetchFiles`
- **Description**: Fetches the list of uploaded files from the server when the component is mounted.
- **API Call**: Sends a `GET` request to the `/files/:user-id-:index` endpoint.
- **Parameters**: None.

## **JSX Structure**
1. **File Upload Section**:
   - **File Input**: A file input field for selecting a file to upload.
   - **Upload Button**: A button that triggers the file upload process.
   - **Upload Message**: Displays messages related to the file upload status (success or error).
   
2. **Uploaded Files Section**:
   - **File List**: Displays a list of uploaded files, with each file having a "Delete" button.
   - **No Files Message**: If no files are uploaded, a message "No files uploaded yet" is shown.

3. **Loading States**:
   - **File Upload Loading**: A loading message is displayed when the file is being uploaded.
   - **File Fetching Loading**: A loading message is shown when the uploaded files are being fetched.
   - **File Deletion Loading**: A "Deleting" message is shown when a file is being deleted.

## **File Types Supported**
The following file types are supported for upload:
- **PDF** (`application/pdf`)
- **CSV** (`text/csv`)
- **Word** (`application/vnd.openxmlformats-officedocument.wordprocessingml.document`)
- **Excel** (`application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`)
- **Text** (`text/plain`)

## **Component Flow**
1. **File Selection**: User selects a file to upload using the file input.
2. **File Validation**: The selected file is validated for type and existence.
3. **File Upload**: The file is uploaded to the server, and a success or error message is displayed.
4. **Display Uploaded Files**: The list of uploaded files is displayed.
5. **File Deletion**: The user can delete a file, which removes it from the backend and updates the displayed list of files.

## **Usage Example**
```jsx
<UploadForm index={1} />
```
---

## 5. `SearchForm` Component


The `SearchForm` component provides a user interface for submitting search queries and displaying the results. The component allows users to input a query, send it to the backend for processing, and display the response, which may include formatted content using Markdown.

## **State Management**
The component uses the following states to manage search query input and result display:
- **`query`**: Stores the user's search query input.
- **`result`**: Stores the search result from the backend, which is displayed as Markdown.
- **`loading`**: Indicates whether the search request is being processed.

## **Functions**
### `handleSearch`
- **Description**: Handles the search functionality by sending the query to the backend server and updating the state with the search result.
- **Steps**:
  1. Checks if the query is not empty.
  2. Sends the query to the server via a `POST` request to the `/search/:user-id-:index` endpoint.
  3. Updates the `result` state with the data received from the backend.
  4. Handles loading and error states.
- **API Call**: Sends a `POST` request to `/search/:user-id-:index` with the user's search query.
- **Parameters**: None (uses component state).

## **JSX Structure**
1. **Query Input**:
   - **Text Area**: A text area for users to input their search query.
   
2. **Search Button**:
   - A button that triggers the `handleSearch` function when clicked.
   - The button text changes to "Searching..." while the query is being processed.

3. **Search Result**:
   - **Result Display**: Displays the search result using the `ReactMarkdown` component, which renders the result as Markdown.
   - **Error Handling**: If an error occurs during the search request, an error message is displayed.
   
4. **Loading State**:
   - While the search is in progress, the button displays "Searching...".

## **Backend API Endpoint**
- **Search Query**:
  - `POST /search/:user-id-:index`
  - Request body: `{ query: "search query" }`
  - Response: The backend returns a response with a Markdown-formatted answer.
  
## **Usage Example**
```jsx
<SearchForm index={1} />
```
---

## Firebase Authentication
The application integrates Firebase Authentication to handle user logins. The user's UID is stored in `localStorage` to manage session persistence. The login process uses Google authentication via `GoogleAuthProvider` and `signInWithPopup` from Firebase.

## Backend Interaction
The app interacts with a backend to create, delete, and retrieve indexes. The interactions are done using Axios for API requests, and the backend URLs are stored in `.env` as environment variables.

### Key Endpoints:
- **GET `/index`**: Fetches a list of indexes for the logged-in user.
- **POST `/index/:user`**: Creates a new index for the user with a sanitized name.
- **DELETE `/index/:user/:index`**: Deletes a specific index for the user.

---

## User Interface and Styling
The application uses **Tailwind CSS** for styling. The UI is responsive, with components like the dashboard and search page adjusting according to the screen size. Tailwind's utility-first classes make the design scalable and flexible.

---

## Features Summary:
1. **Authentication**: Google login using Firebase.
2. **Dashboard**: Manage your search engines (create, delete, view).
3. **Search Engine Creation**: Create custom search engines based on uploaded files.
4. **Search Functionality**: Query indexed documents using AI-based retrieval methods.
5. **File Upload**: Upload files to be indexed for search.

---

## Technologies Used:
- **Frontend**: React.js, React Router, Tailwind CSS, Axios
- **Backend**: Express, Firebase Authentication, Node.js
- **APIs**: RESTful APIs for CRUD operations on indexes

---

## Conclusion:
The RAG Model Application enables efficient document searching and insight generation using advanced AI-driven technologies. The app's intuitive UI, combined with Firebase and dynamic indexing features, makes it a powerful tool for document retrieval tasks.
