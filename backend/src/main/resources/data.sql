-- ADDRESS

INSERT INTO address (country, street_name, street_number, town) values ('Serbia', 'Danila Kisa', '16', 'Novi Sad');
INSERT INTO address (country, street_name, street_number, town) values ('Serbia', 'Sveti Nikola', '27', 'Novi Sad');
INSERT INTO address (country, street_name, street_number, town) values ('England', 'Queens street', '12', 'London');
INSERT INTO address (country, street_name, street_number, town) values ('England', 'Kings street', '24', 'London');
INSERT INTO address (country, street_name, street_number, town) values ('Serbia', 'Jermenska', '54', 'Novi Sad');
INSERT INTO address (country, street_name, street_number, town) values ('Serbia', 'Ohridska', '15', 'Novi Sad');
INSERT INTO address (country, street_name, street_number, town) values ('Serbia', 'Mlinarska', '20', 'Beograd');

-- CENTER

INSERT INTO center (description, donation_price, name, rating, working_hours, address_id) values ('something', 10, 'Center A', 3.7, '07:00-17:00', 2);
INSERT INTO center (description, donation_price, name, rating, working_hours, address_id) values ('nothing', 15, 'Center B', 4.3, '08:00-15:00', 1);

--  ROLE

INSERT INTO role (id, name) values (1, 'ROLE_REGULAR');
INSERT INTO role (id, name) values (2, 'ROLE_ADMIN_CENTER');
INSERT INTO role (id, name) values (3, 'ROLE_ADMIN_SYSTEM');

-- USER

INSERT INTO user_table (center_id, email, gender, name, occupation, password, role_id, surname, upin, phone_number, work_status, address_id, activated) values (null, 'john.johnson@gmail.com', 0, 'John',  'Student', '$2a$10$OsT1cBe2WrC7Q8cIH1GRMO6E.xkMA0/iBKcgZ0Ibt1Z9e.rpjxYma', 1, 'Johnson', '0000000000001', '065-1236367', 1, 4, true);
INSERT INTO user_table (center_id, email, gender, name, occupation, password, role_id, surname, upin, phone_number, work_status, address_id, activated) values (2, 'marko.markovic@gmail.com', 0, 'Marko', null, '$2a$10$OsT1cBe2WrC7Q8cIH1GRMO6E.xkMA0/iBKcgZ0Ibt1Z9e.rpjxYma', 2, 'Markovic', '0000000000002', '062-2645377', 2, 2, true);
INSERT INTO user_table (center_id, email, gender, name, occupation, password, role_id, surname, upin, phone_number, work_status, address_id, activated) values (null, 'zarko.zarkovic@gmail.com', 0, 'Zarko', null, '$2a$10$OsT1cBe2WrC7Q8cIH1GRMO6E.xkMA0/iBKcgZ0Ibt1Z9e.rpjxYma', 2, 'Zarkovic', '0000000000003', '065-7387897', 2, 5, true);
INSERT INTO user_table (center_id, email, gender, name, occupation, password, role_id, surname, upin, phone_number, work_status, address_id, activated) values (null, 'marija.marijanovic@gmail.com', 1, 'Marija', null, '$2a$10$OsT1cBe2WrC7Q8cIH1GRMO6E.xkMA0/iBKcgZ0Ibt1Z9e.rpjxYma', 2, 'Marijanovic', '0000000000004', '064-2136597', 2, 7, true);
INSERT INTO user_table (center_id, email, gender, name, occupation, password, role_id, surname, upin, phone_number, work_status, address_id, activated) values (null, 'nina.ninkovic@gmail.com', 1, 'Nina', null, '$2a$10$OsT1cBe2WrC7Q8cIH1GRMO6E.xkMA0/iBKcgZ0Ibt1Z9e.rpjxYma', 3, 'Ninkovic', '0000000000005', '063-2435632', 2, 6, true);


-- BLOOD

INSERT INTO blood (amount, blood_type, center_id) values (16, 0, 1);
INSERT INTO blood (amount, blood_type, center_id) values (11, 2, 1);
INSERT INTO blood (amount, blood_type, center_id) values (5, 3, 2);

-- DONATOR

INSERT INTO donator (blood_type, loyalty, penalties, points, user_id) values (2, 0, 0, 20, 3);
INSERT INTO donator (blood_type, loyalty, penalties, points, user_id) values (1, 0, 15, 20, 1);

-- WORK_CALENDAR

INSERT INTO work_calendar (center_id) VALUES (1);
INSERT INTO work_calendar (center_id) VALUES (2);

-- CENTER_DONATORS

INSERT INTO center_donators (center_id, donators_id) values (1, 1);

-- CENTER_ADMINS_CENTER

INSERT INTO center_admins_center (center_id, admins_center_id) values (2, 2);

-- CENTERS_TYPES_OF_BLOOD

INSERT INTO center_types_of_blood (center_id, types_of_blood_id) values (1, 1);
INSERT INTO center_types_of_blood (center_id, types_of_blood_id) values (1, 2);
INSERT INTO center_types_of_blood (center_id, types_of_blood_id) values (1, 3);

-- APPOINTMENTS

INSERT INTO appointment (duration, is_reserved, scheduled_time, donator_id, work_calendar_id, start_time) values (1, false, '2022-12-23', null, 2, '14:00:00');
INSERT INTO appointment (duration, is_reserved, scheduled_time, donator_id, work_calendar_id, start_time) values (1, false, '2022-12-21', null, 2, '02:00');
INSERT INTO appointment (duration, is_reserved, scheduled_time, donator_id, work_calendar_id, start_time) values (1, false, '2022-12-23', null, 2, '00:00');
INSERT INTO appointment (duration, is_reserved, scheduled_time, donator_id, work_calendar_id, start_time) values (1, false, '2022-12-25', 1, 1, '07:00');
INSERT INTO appointment (duration, is_reserved, scheduled_time, donator_id, work_calendar_id, start_time) values (1, true, '2022-12-26', null, 2, '04:00');
INSERT INTO appointment (duration, is_reserved, scheduled_time, donator_id, work_calendar_id, start_time) values (1, true, '2022-12-22', 2, 1, '13:00');
INSERT INTO appointment (duration, is_reserved, scheduled_time, donator_id, work_calendar_id, start_time) values (1, true, '2022-12-20', 1, 2, '05:00');

INSERT INTO templates (id, data) values (1, '1. Da li ste do sada dobrovoljno davali krv ili komponente krvi?-;
2. Da li ste ikada bili odbijeni kao davalac krvi ili komponente krvi?-;
3. Da li se trenutno osecate zdravim, sposobnim i odmornim da date krv ili komponente krvi?-;
4. Da li ste nesto jeli pre dolaska na davanje krvi ili komponente krvi?-;
5. Da li se bavite opasnim zanimanjem ili hobijem?-;
6. Da li redovno (svakodnevno) uzimate bilo kakve lekove?-;
7. Da li ste poslednja 2 do 3 dana uzimali bilo kakve lekove (Npr. Brufen, Kafetin, Analgin...)?-;
8. Da li stalno uzimate aspirin? Da li ste ga uzimali u poslenjih 5 dana?-;
9. Da li ste vadili zub u proteklih 7 dana?-;
10. Da li ste u drugom stanju?-;
11. Da li trenutno imate menstruaciju?-;
12. Da li ste u poslednjih 6 meseci imali porodjaj ili prekid trudnoce?-;
13. Da li ste u proteklih 6 meseci davali krv?-;');

INSERT INTO templates (id, data) values (2, 'Dear <Name>, please activate your account by clicking the following link:' ||
                                            'http://localhost:4200/activate/<UserId>');
INSERT INTO templates (id, data) values (3, 'Dear <Name>, you have successfully reserved an appointment on <Date> at <Time> which lasts for <Duration> hours!');