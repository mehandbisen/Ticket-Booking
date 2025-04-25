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


# Clone the repository
git clone https://github.com/mehandbisen/Ticket-Booking.git
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

![Screenshot 2025-04-24 225520](https://github.com/user-attachments/assets/a1c8d1b5-a81d-4b0c-a0aa-a3c6281345ae)
![Screenshot 2025-04-24 225602](https://github.com/user-attachments/assets/66771400-b3cf-45e0-b0d9-7f2c2091abe9)
![Screenshot 2025-04-24 225746](https://github.com/user-attachments/assets/2aa9edb8-7925-4be7-b486-19738ecb488a)
![Screenshot 2025-04-24 225832](https://github.com/user-attachments/assets/b9b7f7d2-a1bb-4f8c-8554-4436969233b4)
![Screenshot 2025-04-24 225859](https://github.com/user-attachments/assets/dc874a71-b682-4cce-aff2-004b00dd237b)

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
