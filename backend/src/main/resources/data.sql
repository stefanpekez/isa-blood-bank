-- ADDRESS

INSERT INTO address (id, country, street_name, street_number, town) values (1, 'Serbia', 'Danila Kisa', '16', 'Novi Sad');
INSERT INTO address (id, country, street_name, street_number, town) values (2, 'Serbia', 'Sveti Nikola', '27', 'Novi Sad');
INSERT INTO address (id, country, street_name, street_number, town) values (3, 'England', 'Queens street', '12', 'London');
INSERT INTO address (id, country, street_name, street_number, town) values (4, 'England', 'Kings street', '24', 'London');

-- CENTER

INSERT INTO center (id, description, donation_price, name, rating, working_hours, address_id) values (1, 'something', 10, 'Center A', 3.7, '07:00-17:00', 2);
INSERT INTO center (id, description, donation_price, name, rating, working_hours, address_id) values (2, 'nothing', 15, 'Center B', 4.3, '08:00-15:00', 1);

-- USER

INSERT INTO user_table (id, center_id, email, gender, name, occupation, password, role, surname, upin, work_status, address_id) values (1, 3, 'john.johnson@gmail.com', 0, 'John',  'Student', '123', 0, 'Johnson', '0000000000001', 1, 4);

INSERT INTO user_table (id, center_id, email, gender, name, occupation, password, role, surname, upin, work_status, address_id) values (2, 1, 'marko.markovic@gmail.com', 0, 'Marko', 'Worker', '123', 1, 'Markovic', '0000000000002', 2, 2);

-- BLOOD

INSERT INTO blood (id, amount, blood_type) values (1, 16, 0);
INSERT INTO blood (id, amount, blood_type) values (2, 11, 2);
INSERT INTO blood (id, amount, blood_type) values (3, 5, 3);

-- DONATOR

INSERT INTO donator (id, blood_type, loyalty, penalties, points, user_id) values (1, 2, 0, 0, 20, 1);

-- CENTER_DONATORS

INSERT INTO center_donators (center_id, donators_id) values (1, 1);

-- CENTER_ADMINS_CENTER

INSERT INTO center_admins_center (center_id, admins_center_id) values (2, 2);

-- CENTERS_TYPES_OF_BLOOD

INSERT INTO center_types_of_blood (center_id, types_of_blood_id) values (1, 1);
INSERT INTO center_types_of_blood (center_id, types_of_blood_id) values (1, 2);
INSERT INTO center_types_of_blood (center_id, types_of_blood_id) values (1, 3);