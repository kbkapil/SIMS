package com.example.vehiclebooking;

import com.example.garage.GarageApplication;
import com.example.vehiclebooking.model.Booking;
import com.example.vehiclebooking.repository.BookingRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest(classes = GarageApplication.class)
@AutoConfigureMockMvc
public class BookingControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private BookingRepository bookingRepository;

    @BeforeEach
    public void setup() {
        bookingRepository.deleteAll();
    }

    @Test
    public void testCreateBooking() throws Exception {
        String bookingJson = "{ \"serviceType\": \"Oil Change\", \"date\": \"2025-09-01\", \"timeSlot\": \"10:00-11:00\", \"vehicle\": { \"id\": 1 }, \"garage\": { \"id\": 1 } }";

        mockMvc.perform(post("/api/bookings")
                .contentType(MediaType.APPLICATION_JSON)
                .content(bookingJson))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.serviceType", is("Oil Change")))
                .andExpect(jsonPath("$.status", is("PENDING")));
    }

    @Test
    public void testGetAllBookings() throws Exception {
        Booking booking = new Booking();
        booking.setServiceType("Tire Change");
        booking.setDate("2025-09-02");
        booking.setTimeSlot("11:00-12:00");
        booking.setStatus("PENDING");
        bookingRepository.save(booking);

        mockMvc.perform(get("/api/bookings"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(1)))
                .andExpect(jsonPath("$[0].serviceType", is("Tire Change")));
    }

    @Test
    public void testApproveBooking() throws Exception {
        Booking booking = new Booking();
        booking.setServiceType("Brake Check");
        booking.setDate("2025-09-03");
        booking.setTimeSlot("12:00-13:00");
        booking.setStatus("PENDING");
        Booking saved = bookingRepository.save(booking);

        mockMvc.perform(put("/api/bookings/" + saved.getId() + "/approve"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status", is("APPROVED")));
    }

    @Test
    public void testRejectBooking() throws Exception {
        Booking booking = new Booking();
        booking.setServiceType("Engine Tune");
        booking.setDate("2025-09-04");
        booking.setTimeSlot("13:00-14:00");
        booking.setStatus("PENDING");
        Booking saved = bookingRepository.save(booking);

        mockMvc.perform(put("/api/bookings/" + saved.getId() + "/reject"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status", is("REJECTED")));
    }
}
