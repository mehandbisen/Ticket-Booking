# Ticket Booking Management System 

##  ****Project Overview****

This is a web-based Ticket Booking Management System built with Django. Users can register, login, browse shows, select seats, and book tickets. The system also includes a custom admin panel for managing shows and tracking bookings. Sessions are used to handle cart logic, and the project is containerized using Docker with Jenkins for CI/CD automation.

---

##  **Setup & Run Instructions**

### ** Requirements**

- Python 3.10+
- Docker & Docker Compose
- Git



### ** Installation**

```bash
# Clone the repository
git clone https://github.com/your-username/ticket-booking-system.git
cd ticket-booking-system

# Create virtual environment (optional if not using Docker)
python -m venv env
source env/bin/activate  # On Windows: env\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Start the server
python manage.py runserver


### **Run with Docker**
docker-compose up --build

### ** Tech Stack Used**
Backend: Django (Class-Based Views)

Database: MySQL

Frontend: HTML, Bootstrap

Containerization: Docker, Docker Compose

CI/CD: Jenkins (via Jenkinsfile)

Others: Django Sessions, Custom Admin Panel (no Django Admin)



### **Screenshots**

![Screenshot 2025-04-24 225520](https://github.com/user-attachments/assets/57bf08ad-451d-4dc6-8b69-06f24af62aad)
![Screenshot 2025-04-24 225602](https://github.com/user-attachments/assets/5a52346f-eba8-40da-9087-7778187c4f5e)
![Screenshot 2025-04-24 225746](https://github.com/user-attachments/assets/507e8080-deb0-4ac2-a9e8-ad26db0bd791)
![Screenshot 2025-04-24 225832](https://github.com/user-attachments/assets/70766678-cddb-42c5-a42f-db9f7cb4405c)
![Screenshot 2025-04-24 225859](https://github.com/user-attachments/assets/bb66b788-6e28-42b1-be7a-07667fd74723)

###  **Docker and Jenkins Notes**
** Docker**
Uses a Dockerfile for building the Django app container.

MySQL setup included in docker-compose.yml.

Environment variables are managed via .env file (if applicable).

** Jenkins**
CI/CD setup via Jenkinsfile:

Pulls code from GitHub.

Builds and tests the application.

Deploys Docker containers.
