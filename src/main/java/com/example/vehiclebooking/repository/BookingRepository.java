package com.example.vehiclebooking.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.vehiclebooking.model.Booking;

public interface BookingRepository extends JpaRepository<Booking, Long> {
}
