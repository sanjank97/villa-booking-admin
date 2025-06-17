CREATE TABLE payments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  booking_id INT NOT NULL,
  order_id VARCHAR(100) NOT NULL,
  payment_id VARCHAR(100), -- Will be added after success
  amount DECIMAL(10,2) NOT NULL,
  currency VARCHAR(10) DEFAULT 'INR',
  status ENUM('created', 'paid', 'failed') DEFAULT 'created',
  method VARCHAR(50), -- card, netbanking, etc. (optional)
  email VARCHAR(100), -- optional user info
  phone VARCHAR(20),  -- optional user info
  payment_date DATETIME DEFAULT CURRENT_TIMESTAMP,
  
  -- Foreign key to booking table (optional but recommended)
  CONSTRAINT fk_booking_payment FOREIGN KEY (booking_id)
    REFERENCES bookings(id) ON DELETE CASCADE
);
