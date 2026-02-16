-- Sample Utah draw odds data for testing
-- This includes a few units for Elk and Deer with various point levels

-- Elk - Unit 1 - General Season
INSERT INTO utah_draw_odds (year, species, unit_number, hunt_code, hunt_description, bonus_points, total_applicants, successful_applicants, total_permits, success_ratio, success_percentage) VALUES
(2025, 'Elk', '1', 'LE101', 'Any Bull - Oct 1-15', 0, 1200, 12, 15, '1 in 100', 1.00),
(2025, 'Elk', '1', 'LE101', 'Any Bull - Oct 1-15', 5, 850, 25, 15, '1 in 34', 2.94),
(2025, 'Elk', '1', 'LE101', 'Any Bull - Oct 1-15', 10, 550, 45, 15, '1 in 12.2', 8.18),
(2025, 'Elk', '1', 'LE101', 'Any Bull - Oct 1-15', 15, 320, 85, 15, '1 in 3.8', 26.56),
(2025, 'Elk', '1', 'LE101', 'Any Bull - Oct 1-15', 20, 180, 125, 15, '1 in 1.4', 69.44),
(2025, 'Elk', '1', 'LE101', 'Any Bull - Oct 1-15', 25, 85, 75, 15, '1 in 1.1', 88.24);

-- Elk - Unit 2A - Spike Hunt
INSERT INTO utah_draw_odds (year, species, unit_number, hunt_code, hunt_description, bonus_points, total_applicants, successful_applicants, total_permits, success_ratio, success_percentage) VALUES
(2025, 'Elk', '2A', 'LE201', 'Spike Bull - Sept 15-30', 0, 2500, 250, 300, '1 in 10', 10.00),
(2025, 'Elk', '2A', 'LE201', 'Spike Bull - Sept 15-30', 5, 1800, 350, 300, '1 in 5.1', 19.44),
(2025, 'Elk', '2A', 'LE201', 'Spike Bull - Sept 15-30', 10, 950, 425, 300, '1 in 2.2', 44.74),
(2025, 'Elk', '2A', 'LE201', 'Spike Bull - Sept 15-30', 15, 450, 285, 300, '1 in 1.6', 63.33),
(2025, 'Elk', '2A', 'LE201', 'Spike Bull - Sept 15-30', 20, 220, 180, 300, '1 in 1.2', 81.82);

-- Elk - Unit 15 - Premium Hunt
INSERT INTO utah_draw_odds (year, species, unit_number, hunt_code, hunt_description, bonus_points, total_applicants, successful_applicants, total_permits, success_ratio, success_percentage) VALUES
(2025, 'Elk', '15', 'LE1501', 'Any Bull - Rifle', 0, 5200, 5, 5, '1 in 1040', 0.10),
(2025, 'Elk', '15', 'LE1501', 'Any Bull - Rifle', 10, 3800, 8, 5, '1 in 475', 0.21),
(2025, 'Elk', '15', 'LE1501', 'Any Bull - Rifle', 15, 2100, 15, 5, '1 in 140', 0.71),
(2025, 'Elk', '15', 'LE1501', 'Any Bull - Rifle', 20, 950, 35, 5, '1 in 27.1', 3.68),
(2025, 'Elk', '15', 'LE1501', 'Any Bull - Rifle', 25, 420, 85, 5, '1 in 4.9', 20.24),
(2025, 'Elk', '15', 'LE1501', 'Any Bull - Rifle', 30, 180, 125, 5, '1 in 1.4', 69.44);

-- Deer - Unit 3 - General Hunt
INSERT INTO utah_draw_odds (year, species, unit_number, hunt_code, hunt_description, bonus_points, total_applicants, successful_applicants, total_permits, success_ratio, success_percentage) VALUES
(2025, 'Deer', '3', 'LD301', 'Any Buck - Rifle', 0, 3200, 320, 400, '1 in 10', 10.00),
(2025, 'Deer', '3', 'LD301', 'Any Buck - Rifle', 5, 2400, 550, 400, '1 in 4.4', 22.92),
(2025, 'Deer', '3', 'LD301', 'Any Buck - Rifle', 10, 1200, 650, 400, '1 in 1.8', 54.17),
(2025, 'Deer', '3', 'LD301', 'Any Buck - Rifle', 15, 550, 420, 400, '1 in 1.3', 76.36),
(2025, 'Deer', '3', 'LD301', 'Any Buck - Rifle', 20, 250, 215, 400, '1 in 1.2', 86.00);

-- Deer - Unit 12 - Muzzleloader
INSERT INTO utah_draw_odds (year, species, unit_number, hunt_code, hunt_description, bonus_points, total_applicants, successful_applicants, total_permits, success_ratio, success_percentage) VALUES
(2025, 'Deer', '12', 'LD1201', 'Any Buck - Muzzleloader', 0, 1800, 90, 100, '1 in 20', 5.00),
(2025, 'Deer', '12', 'LD1201', 'Any Buck - Muzzleloader', 5, 1300, 180, 100, '1 in 7.2', 13.85),
(2025, 'Deer', '12', 'LD1201', 'Any Buck - Muzzleloader', 10, 720, 250, 100, '1 in 2.9', 34.72),
(2025, 'Deer', '12', 'LD1201', 'Any Buck - Muzzleloader', 15, 380, 210, 100, '1 in 1.8', 55.26),
(2025, 'Deer', '12', 'LD1201', 'Any Buck - Muzzleloader', 20, 180, 145, 100, '1 in 1.2', 80.56);

-- Deer - Unit 27 - Archery
INSERT INTO utah_draw_odds (year, species, unit_number, hunt_code, hunt_description, bonus_points, total_applicants, successful_applicants, total_permits, success_ratio, success_percentage) VALUES
(2025, 'Deer', '27', 'LD2701', 'Any Buck - Archery', 0, 950, 190, 200, '1 in 5', 20.00),
(2025, 'Deer', '27', 'LD2701', 'Any Buck - Archery', 5, 680, 280, 200, '1 in 2.4', 41.18),
(2025, 'Deer', '27', 'LD2701', 'Any Buck - Archery', 10, 320, 220, 200, '1 in 1.5', 68.75),
(2025, 'Deer', '27', 'LD2701', 'Any Buck - Archery', 15, 120, 105, 200, '1 in 1.1', 87.50);
