package com.example.vehiclebooking.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.vehiclebooking.model.Vehicle;

public interface VehicleRepository extends JpaRepository<Vehicle, Long> {
}
