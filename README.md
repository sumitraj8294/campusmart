# 🏫 Campus Mart

Campus Mart is a **Spring Boot–based backend application** designed to simplify the way college students buy, sell, and exchange goods within their campus community.  
It provides a secure and efficient platform for managing listings, users, and transactions.

---

## 🚀 Features

- 🧑‍💻 **User Authentication** (Login, Signup, Logout)
- 🛍️ **Product Management** (Add, Update, Delete, View)
- 🔍 **Search and Filter Products** by category or keywords
- 💬 **Buy/Sell Communication** between users
- 🧾 **Order and Transaction Management**
- 📦 **RESTful APIs** ready for frontend integration
- 🧠 **Spring Boot + MongoDB/MySQL** based architecture

---

## 🏗️ Tech Stack

| Layer | Technology |
|-------|-------------|
| **Backend Framework** | Spring Boot |
| **Database** | MongoDB / MySQL |
| **Build Tool** | Maven |
| **Language** | Java 17+ |
| **Security** | Spring Security, JWT |
| **IDE / Editor** | VS Code / IntelliJ IDEA |
| **API Testing** | Postman / Swagger |

---

## ⚙️ Installation and Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/campus-mart.git
cd campus-mart
2️⃣ Configure the Database

Open application.properties (or application.yml)

Update your database credentials: 

spring.data.mongodb.uri=mongodb+srv://<username>:<password>@cluster-url
# OR for MySQL
spring.datasource.url=jdbc:mysql://localhost:3306/campusmart
spring.datasource.username=root
spring.datasource.password=yourpassword

3️⃣ Build and Run the Project

For Maven users:

mvn clean install
mvn spring-boot:run


or on Windows:

.\mvnw spring-boot:run


Once started, the backend will run on:
👉 http://localhost:8080

📁 Project Structure
CampusMart/
├── src/
│   ├── main/
│   │   ├── java/com/campusmart/       # Main application source
│   │   │   ├── controller/             # REST Controllers
│   │   │   ├── model/                  # Entity classes
│   │   │   ├── repository/             # Database repositories
│   │   │   ├── service/                # Business logic
│   │   │   └── CampusMartApplication.java
│   │   └── resources/
│   │       ├── application.properties  # Configuration
│   │       └── static/                 # Static files (if any)
│   └── test/                           # Unit tests
├── pom.xml                             # Maven configuration
└── README.md                           # Project documentation

📡 API Endpoints (Example)
Method	Endpoint	Description
POST	/api/auth/signup	Register a new user
POST	/api/auth/login	Login existing user
GET	/api/products	Get all products
POST	/api/products	Add new product
DELETE	/api/products/{id}	Delete product by ID
🧪 Testing

Use Postman or Swagger UI to test the endpoints.

Swagger is available at:
👉 http://localhost:8080/swagger-ui.html (if configured)

🤝 Contributing

Contributions are always welcome!

Fork the repo

Create your feature branch:

git checkout -b feature/YourFeature


Commit your changes:

git commit -m "Add your message"


Push to the branch:

git push origin feature/YourFeature


Submit a Pull Request 🎉

🧑‍🎓 Developed By

Sumit Raj
💻 Software Developer | Java | Spring Boot | React | MongoDB
📧 sumitraj8294@gmail.com
