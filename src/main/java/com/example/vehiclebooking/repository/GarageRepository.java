package com.example.vehiclebooking.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.vehiclebooking.model.Garage;

public interface GarageRepository extends JpaRepository<Garage, Long> {
}
