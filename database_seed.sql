-- 🔄 cheesedb Data Refresh Script
-- ----------------------------------
-- This script ONLY refreshes/resets data (truncates and re-inserts)
-- Does NOT create tables - assumes tables already exist
-- Run this whenever you want to reset your product data

-- Step 0: Use the cheesedb database
USE cheesedb;

-- Ensure order_data table exists (stores checkout form details)
CREATE TABLE IF NOT EXISTS order_data (
  id INT NOT NULL AUTO_INCREMENT,
  firstName VARCHAR(255),
  lastName VARCHAR(255),
  email VARCHAR(255),
  phone VARCHAR(64),
  address VARCHAR(512),
  city VARCHAR(255),
  postalCode VARCHAR(64),
  billingAddress VARCHAR(512),
  paymentMethod VARCHAR(64),
  notes TEXT,
  shippingMethod VARCHAR(64),
  giftWrap TINYINT(1),
  deliveryDate VARCHAR(64),
  subtotal DECIMAL(12,2),
  discount DECIMAL(12,2),
  shippingCost DECIMAL(12,2),
  tax DECIMAL(12,2),
  total DECIMAL(12,2),
  created DATETIME DEFAULT CURRENT_TIMESTAMP,
  lastUpdated DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Augment order_item_data with checkout-related columns (idempotent)
SET @tbl := 'order_item_data';

SET @c := (SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME=@tbl AND COLUMN_NAME='customerFirstName');
SET @sql := IF(@c=0, 'ALTER TABLE order_item_data ADD COLUMN customerFirstName VARCHAR(255) NULL', 'SELECT 1'); PREPARE s FROM @sql; EXECUTE s; DEALLOCATE PREPARE s;

SET @c := (SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME=@tbl AND COLUMN_NAME='customerLastName');
SET @sql := IF(@c=0, 'ALTER TABLE order_item_data ADD COLUMN customerLastName VARCHAR(255) NULL', 'SELECT 1'); PREPARE s FROM @sql; EXECUTE s; DEALLOCATE PREPARE s;

SET @c := (SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME=@tbl AND COLUMN_NAME='customerEmail');
SET @sql := IF(@c=0, 'ALTER TABLE order_item_data ADD COLUMN customerEmail VARCHAR(255) NULL', 'SELECT 1'); PREPARE s FROM @sql; EXECUTE s; DEALLOCATE PREPARE s;

SET @c := (SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME=@tbl AND COLUMN_NAME='customerPhone');
SET @sql := IF(@c=0, 'ALTER TABLE order_item_data ADD COLUMN customerPhone VARCHAR(64) NULL', 'SELECT 1'); PREPARE s FROM @sql; EXECUTE s; DEALLOCATE PREPARE s;

SET @c := (SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME=@tbl AND COLUMN_NAME='shippingAddress');
SET @sql := IF(@c=0, 'ALTER TABLE order_item_data ADD COLUMN shippingAddress VARCHAR(512) NULL', 'SELECT 1'); PREPARE s FROM @sql; EXECUTE s; DEALLOCATE PREPARE s;

SET @c := (SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME=@tbl AND COLUMN_NAME='shippingCity');
SET @sql := IF(@c=0, 'ALTER TABLE order_item_data ADD COLUMN shippingCity VARCHAR(255) NULL', 'SELECT 1'); PREPARE s FROM @sql; EXECUTE s; DEALLOCATE PREPARE s;

SET @c := (SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME=@tbl AND COLUMN_NAME='shippingPostalCode');
SET @sql := IF(@c=0, 'ALTER TABLE order_item_data ADD COLUMN shippingPostalCode VARCHAR(64) NULL', 'SELECT 1'); PREPARE s FROM @sql; EXECUTE s; DEALLOCATE PREPARE s;

SET @c := (SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME=@tbl AND COLUMN_NAME='billingAddress');
SET @sql := IF(@c=0, 'ALTER TABLE order_item_data ADD COLUMN billingAddress VARCHAR(512) NULL', 'SELECT 1'); PREPARE s FROM @sql; EXECUTE s; DEALLOCATE PREPARE s;

SET @c := (SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME=@tbl AND COLUMN_NAME='paymentMethod');
SET @sql := IF(@c=0, 'ALTER TABLE order_item_data ADD COLUMN paymentMethod VARCHAR(64) NULL', 'SELECT 1'); PREPARE s FROM @sql; EXECUTE s; DEALLOCATE PREPARE s;

SET @c := (SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME=@tbl AND COLUMN_NAME='shippingMethod');
SET @sql := IF(@c=0, 'ALTER TABLE order_item_data ADD COLUMN shippingMethod VARCHAR(64) NULL', 'SELECT 1'); PREPARE s FROM @sql; EXECUTE s; DEALLOCATE PREPARE s;

SET @c := (SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME=@tbl AND COLUMN_NAME='giftWrap');
SET @sql := IF(@c=0, 'ALTER TABLE order_item_data ADD COLUMN giftWrap TINYINT(1) NULL', 'SELECT 1'); PREPARE s FROM @sql; EXECUTE s; DEALLOCATE PREPARE s;

SET @c := (SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME=@tbl AND COLUMN_NAME='deliveryDate');
SET @sql := IF(@c=0, 'ALTER TABLE order_item_data ADD COLUMN deliveryDate VARCHAR(64) NULL', 'SELECT 1'); PREPARE s FROM @sql; EXECUTE s; DEALLOCATE PREPARE s;

-- Ensure shippingCost column exists in order_item_data (for shipping fee per item if needed)
SET @c := (SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME=@tbl AND COLUMN_NAME='shippingCost');
SET @sql := IF(@c=0, 'ALTER TABLE order_item_data ADD COLUMN shippingCost DECIMAL(12,2) NULL', 'SELECT 1'); PREPARE s FROM @sql; EXECUTE s; DEALLOCATE PREPARE s;

-- Step 1: Disable foreign key checks to allow truncation
SET FOREIGN_KEY_CHECKS = 0;

-- Step 2: Truncate tables (delete all rows + reset auto_increment)
TRUNCATE TABLE product_data;
TRUNCATE TABLE menu_data;

-- Step 3: Re-enable foreign key checks
SET FOREIGN_KEY_CHECKS = 1;

-- Step 3.5: Ensure id columns are AUTO_INCREMENT (in case they're not)
ALTER TABLE product_data MODIFY COLUMN id INT NOT NULL AUTO_INCREMENT;
ALTER TABLE menu_data MODIFY COLUMN id INT NOT NULL AUTO_INCREMENT;

-- Step 4: Insert cheesecake product seed data
INSERT INTO product_data (id, name, description, categoryName, unitOfMeasure, price, imageFile)
VALUES
  (1, 'Oreo Cheesecake - Oven-Baked', 'Delicious creamy cheesecake with crushed Oreo cookies, baked to perfection in the oven', 'Oven-Baked', 'piece', '899.00', 'assets/products/oreo-oven-baked.jpg'),
  (2, 'Biscoff Cheesecake - Oven-Baked', 'Rich and creamy cheesecake with Biscoff cookie butter, oven-baked for a perfect texture', 'Oven-Baked', 'piece', '999.00', 'assets/products/biscoff-oven-baked.jpg'),
  (3, 'Blueberry Cheesecake - Oven-Baked', 'Classic New York-style cheesecake with fresh blueberries, perfectly baked in the oven with a smooth and creamy texture', 'Oven-Baked', 'piece', '799.00', 'assets/products/blueberry-oven-baked.jpg'),
  (4, 'Oreo Cheesecake - No-Bake', 'Creamy no-bake cheesecake with crushed Oreo cookies, chilled to perfection without baking', 'No-Bake', 'piece', '849.00', 'assets/products/oreo-no-bake.jpg'),
  (5, 'Biscoff Cheesecake - No-Bake', 'Delicious no-bake cheesecake with Biscoff cookie butter, chilled and ready to enjoy', 'No-Bake', 'piece', '949.00', 'assets/products/biscoff-no-bake.jpg'),
  (6, 'Blueberry Cheesecake - No-Bake', 'Classic no-bake cheesecake with fresh blueberries, perfectly chilled with a smooth and creamy texture', 'No-Bake', 'piece', '749.00', 'assets/products/blueberry-no-bake.jpg');

-- Step 5: Insert menu data (with id values for clarity)
INSERT INTO menu_data (id, name, description, routerPath, categoryName, icon)
VALUES
  (1, 'Home', 'Welcome to YourBrand', '', 'main', 'home.svg'),
  (2, 'About', 'Learn about us', 'about', 'main', 'about.svg'),
  (3, 'Products', 'Browse all products', 'products', 'main', 'product.svg'),
  (4, 'Checkout', 'Checkout your cart', 'checkout', 'main', 'checkout.svg'),
  (5, 'Support', 'Get support', 'support', 'main', 'support.svg');

-- Step 6: Verify the data
SELECT * FROM product_data;
SELECT * FROM menu_data;
SELECT * FROM order_item_data;
