# 🌍 Travel King - Hotel Booking and Room Rental Web App

Travel King is a full-stack MERN application that allows users to browse, book, and manage hotel stays. It includes both user-facing and admin-facing interfaces with secure authentication and media upload support via Cloudinary.
## 🛠️ Tech Stack

### Frontend
- ⚛️ React.js
- 📦 Axios
- 🌐 React Router
- 🎨 SCSS Modules
- 🔐 Context API for Auth

### Backend
- 🟢 Node.js
- 🚂 Express.js
- 🛢️ MongoDB (Mongoose)
- 🔐 JWT Authentication
- 🔄 RESTful APIs

### Other Tools
- ☁️ Cloudinary (Image Uploads)
- 🛡️ Role-based Access (Admin/User)
- 🔒 bcrypt (Password Hashing)

---

## 📁 Project Structure

travel-king/
├── api/ # Backend server (Node.js + Express)
├── client/ # User-facing frontend (React)
├── admin/ # Admin dashboard (React)
└── README.md

yaml
Copy
Edit

---

## ⚙️ Setup Instructions (Local)

### 1. Clone the repository

```bash
git clone https://github.com/your-username/travel-king.git
cd travel-king


2. Install dependencies
bash
Copy
Edit
# API
cd api
npm install

# Client
cd ../client
npm install

# Admin
cd ../admin
npm install


3. Configure Environment Variables
In api/.env:
env
Copy
Edit
PORT=8000
MONGO_URL=your_mongo_db_connection_string
JWT_SECRET=your_jwt_secret
In client/.env and admin/.env (for Cloudinary):
env
Copy
Edit
REACT_APP_CLOUDINARY_UPLOAD_PRESET=upload
REACT_APP_CLOUDINARY_CLOUD_NAME=your_cloud_name


4. Run the App
bash
Copy
Edit
# Start API
cd api
npm start

# Start Client
cd ../client
npm start

# Start Admin
cd ../admin
npm start


📦 Features
🔍 Browse and search hotels

🧾 Book rooms by date

🛂 Admin can add/edit/delete hotels & rooms

🖼️ Upload photos to Cloudinary

👥 User & Admin authentication

🔐 JWT-based secure login


👥 Authentication Roles
Role	Capabilities
User:	Browse hotels, book rooms
Admin:	Manage hotels, rooms, users

🤝 Contributing
Contributions are welcome! Feel free to open issues or pull requests.

📬 Contact
Made with ❤️ by  Anish Mishra

✉️ Email: anishmishra1507@gmail.com

🔗 LinkedIn: https://www.linkedin.com/in/anish-mishra-09b025231/

