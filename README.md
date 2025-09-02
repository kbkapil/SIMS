# Garage Vehicle Booking System

A comprehensive Spring Boot application designed for managing vehicle bookings in garages. This system provides a full-featured platform for users to book vehicles, administrators to manage garages and bookings, and includes user authentication and authorization.

## Features

### User Management
- User registration and login
- Role-based access control (User, Admin)
- Secure authentication with Spring Security

### Vehicle Management
- Add, update, and manage vehicle inventory
- Track vehicle availability and status
- Associate vehicles with specific garages

### Garage Management
- Create and manage multiple garages
- Assign vehicles to garages
- Admin dashboard for garage oversight

### Booking System
- Users can book available vehicles
- Real-time availability checking
- Booking history and management
- Admin approval workflow

### Admin Dashboard
- Comprehensive admin interface
- User management
- Garage and vehicle oversight
- Booking management and analytics

## Technology Stack

- **Backend**: Java 17, Spring Boot 3.5.5
- **Database**: MySQL with Spring Data JPA
- **Frontend**: Thymeleaf templates, HTML, CSS, JavaScript
- **Security**: Spring Security
- **Build Tool**: Maven
- **Testing**: JUnit

## Prerequisites

- Java 17 or higher
- Maven 3.6+
- MySQL 8.0+

## Installation and Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/kbkapil/SIMS.git
   cd SIMS
   ```

2. **Configure Database**
   - Create a MySQL database
   - Update `src/main/resources/application.properties` with your database credentials:
     ```properties
     spring.datasource.url=jdbc:mysql://localhost:3306/your_database_name
     spring.datasource.username=your_username
     spring.datasource.password=your_password
     ```

3. **Build and Run**
   ```bash
   mvn clean install
   mvn spring-boot:run
   ```

4. **Access the Application**
   - Open your browser and navigate to `http://localhost:8080`
   - Default admin credentials (if configured in DataInitializer)

## Project Structure

```
src/
├── main/
│   ├── java/com/example/vehiclebooking/
│   │   ├── config/          # Security and application configuration
│   │   ├── controller/      # REST controllers and web controllers
│   │   ├── model/           # JPA entities
│   │   ├── repository/      # Data access layer
│   │   └── service/         # Business logic layer
│   ├── resources/
│   │   ├── static/          # CSS, JS, images
│   │   ├── templates/       # Thymeleaf templates
│   │   └── application.properties
│   └── java/com/example/garage/
│       └── GarageApplication.java
└── test/                    # Unit and integration tests
```

## API Endpoints

### Authentication
- `POST /login` - User login
- `POST /register` - User registration
- `POST /logout` - User logout

### User Operations
- `GET /dashboard` - User dashboard
- `GET /bookings` - View user bookings
- `POST /bookings` - Create new booking

### Admin Operations
- `GET /admin/dashboard` - Admin dashboard
- `GET /admin/users` - Manage users
- `GET /admin/garages` - Manage garages
- `GET /admin/bookings` - Manage bookings

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

Kapil Bisen - kapilbisen@gmail.com

Project Link: [https://github.com/kbkapil/SIMS](https://github.com/kbkapil/SIMS)
