DROP TABLE IF EXISTS countries CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS operators CASCADE;
DROP TABLE IF EXISTS packageImage CASCADE;
DROP TABLE IF EXISTS packages CASCADE;
DROP TABLE IF EXISTS packageType CASCADE;
DROP TABLE IF EXISTS roles CASCADE;
DROP TABLE IF EXISTS roles_users CASCADE;
DROP TABLE IF EXISTS reviews CASCADE;
DROP TABLE IF EXISTS rating CASCADE;
DROP FUNCTION IF EXISTS relateImagesToPackages(TEXT[], int) CASCADE;


CREATE TABLE countries (
	abrev VARCHAR(2) PRIMARY KEY,
	name VARCHAR(64) NOT NULL
);

CREATE TABLE users (
	id BIGSERIAL PRIMARY KEY,
	-- personal data
	name VARCHAR(60) DEFAULT 'Sea Explorer',
	birthDate date,
	-- contact information
	email VARCHAR(255) NOT NULL UNIQUE,
	telephone VARCHAR(60),
    -- company information
	shopName VARCHAR(60) DEFAULT 'Explorer',
	websiteLink VARCHAR(255) DEFAULT 'No website',
	--address
	address VARCHAR(255),
	zipcode VARCHAR(255),
	country VARCHAR(2) REFERENCES countries(abrev),
	-- security
	password VARCHAR(255) NOT NULL,
	token VARCHAR(64) NOT NULL,
	admin bit NOT NULL DEFAULT '0',
	-- active or not
	active bit NOT NULL DEFAULT '0'
);

CREATE TABLE operators (
	id BIGINT REFERENCES users(id),
	accepted bit NOT NULL DEFAULT '0'
);

CREATE TABLE packageType (
	id BIGSERIAL PRIMARY KEY,
	description VARCHAR(30) NOT NULL
);


CREATE TABLE packageImage (
	id BIGSERIAL PRIMARY KEY,
	idPackage BIGINT DEFAULT NULL,
	imageName VARCHAR(255) NOT NULL
);

CREATE TABLE rating (
	id BIGSERIAL PRIMARY KEY,
	description VARCHAR(5) NOT NULL
);

CREATE TABLE packages (
	id BIGSERIAL PRIMARY KEY,
	operatorID BIGINT REFERENCES users(id),
	--  package info
	package_type BIGINT REFERENCES packageType(id),
	certification VARCHAR (140) NOT NULL,
	currency VARCHAR (140) NOT NULL,
	n_dives REAL NOT NULL,
	dive_sites VARCHAR(100) NOT NULL,
	title VARCHAR (140) NOT NULL,
	price REAL NOT NULL,
	description VARCHAR(500) NOT NULL, -- description, duration, included, not included, what you'll see, duration, max depth, visibility, best-season, special
	-- Geolocation
	country_code VARCHAR(2) REFERENCES countries(abrev),
	lat REAL NOT NULL DEFAULT 0,
	lng REAL NOT NULL DEFAULT 0
);

CREATE TABLE description (
	id BIGSERIAL PRIMARY KEY,
	package_type BIGINT REFERENCES packageType(id),
	certification VARCHAR (140) NOT NULL,
	difficulty BIGINT REFERENCES rating(id),
	currency VARCHAR (140) NOT NULL
);

CREATE TABLE roles (
	id BIGSERIAL PRIMARY KEY,
	description VARCHAR(10) NOT NULL
);

CREATE TABLE roles_users (
	userid BIGINT REFERENCES users(id),
	roleid BIGINT REFERENCES roles(id)
);

CREATE TABLE reviews (
	id BIGSERIAL PRIMARY KEY,
	title VARCHAR (100) NOT NULL,
	rating BIGINT REFERENCES rating(id),
	comment VARCHAR (500) NOT NULL,
	packageid BIGINT REFERENCES packages(id),
	userid BIGINT REFERENCES users(id),
	reviewdate VARCHAR (100) NOT NULL DEFAULT NOW()
);

-- INSERT rating
INSERT INTO rating ("description") VALUES (E'1');
INSERT INTO rating ("description") VALUES (E'2');
INSERT INTO rating ("description") VALUES (E'3');
INSERT INTO rating ("description") VALUES (E'4');
INSERT INTO rating ("description") VALUES (E'5');

-- INSERT packageTypes
INSERT INTO packageType ("description") VALUES (E'Fundive');
INSERT INTO packageType ("description") VALUES (E'CompletePackage');
INSERT INTO packageType ("description") VALUES (E'DiveCourse');

-- INSERT ROLES
INSERT INTO roles ("description") VALUES (E'GUEST');
INSERT INTO roles ("description") VALUES (E'MEMBER');
INSERT INTO roles ("description") VALUES (E'OPERATOR');
INSERT INTO roles ("description") VALUES (E'ADMIN');

-- INSERT COUNTRIES

INSERT INTO countries ("abrev", "name") VALUES (E'AF', E'Afghanistan');
INSERT INTO countries ("abrev", "name") VALUES (E'AX', E'Åland Islands');
INSERT INTO countries ("abrev", "name") VALUES (E'AL', E'Albania');
INSERT INTO countries ("abrev", "name") VALUES (E'DZ', E'Algeria');
INSERT INTO countries ("abrev", "name") VALUES (E'AS', E'American Samoa');
INSERT INTO countries ("abrev", "name") VALUES (E'AD', E'Andorra');
INSERT INTO countries ("abrev", "name") VALUES (E'AO', E'Angola');
INSERT INTO countries ("abrev", "name") VALUES (E'AI', E'Anguilla');
INSERT INTO countries ("abrev", "name") VALUES (E'AQ', E'Antarctica');
INSERT INTO countries ("abrev", "name") VALUES (E'AG', E'Antigua & Barbuda');
INSERT INTO countries ("abrev", "name") VALUES (E'AR', E'Argentina');
INSERT INTO countries ("abrev", "name") VALUES (E'AM', E'Armenia');
INSERT INTO countries ("abrev", "name") VALUES (E'AW', E'Aruba');
INSERT INTO countries ("abrev", "name") VALUES (E'AC', E'Ascension Island');
INSERT INTO countries ("abrev", "name") VALUES (E'AU', E'Australia');
INSERT INTO countries ("abrev", "name") VALUES (E'AT', E'Austria');
INSERT INTO countries ("abrev", "name") VALUES (E'AZ', E'Azerbaijan');
INSERT INTO countries ("abrev", "name") VALUES (E'BS', E'Bahamas');
INSERT INTO countries ("abrev", "name") VALUES (E'BH', E'Bahrain');
INSERT INTO countries ("abrev", "name") VALUES (E'BD', E'Bangladesh');
INSERT INTO countries ("abrev", "name") VALUES (E'BB', E'Barbados');
INSERT INTO countries ("abrev", "name") VALUES (E'BY', E'Belarus');
INSERT INTO countries ("abrev", "name") VALUES (E'BE', E'Belgium');
INSERT INTO countries ("abrev", "name") VALUES (E'BZ', E'Belize');
INSERT INTO countries ("abrev", "name") VALUES (E'BJ', E'Benin');
INSERT INTO countries ("abrev", "name") VALUES (E'BM', E'Bermuda');
INSERT INTO countries ("abrev", "name") VALUES (E'BT', E'Bhutan');
INSERT INTO countries ("abrev", "name") VALUES (E'BO', E'Bolivia');
INSERT INTO countries ("abrev", "name") VALUES (E'BA', E'Bosnia & Herzegovina');
INSERT INTO countries ("abrev", "name") VALUES (E'BW', E'Botswana');
INSERT INTO countries ("abrev", "name") VALUES (E'BR', E'Brazil');
INSERT INTO countries ("abrev", "name") VALUES (E'IO', E'British Indian Ocean Territory');
INSERT INTO countries ("abrev", "name") VALUES (E'VG', E'British Virgin Islands');
INSERT INTO countries ("abrev", "name") VALUES (E'BN', E'Brunei');
INSERT INTO countries ("abrev", "name") VALUES (E'BG', E'Bulgaria');
INSERT INTO countries ("abrev", "name") VALUES (E'BF', E'Burkina Faso');
INSERT INTO countries ("abrev", "name") VALUES (E'BI', E'Burundi');
INSERT INTO countries ("abrev", "name") VALUES (E'KH', E'Cambodia');
INSERT INTO countries ("abrev", "name") VALUES (E'CM', E'Cameroon');
INSERT INTO countries ("abrev", "name") VALUES (E'CA', E'Canada');
INSERT INTO countries ("abrev", "name") VALUES (E'IC', E'Canary Islands');
INSERT INTO countries ("abrev", "name") VALUES (E'CV', E'Cape Verde');
INSERT INTO countries ("abrev", "name") VALUES (E'BQ', E'Caribbean Netherlands');
INSERT INTO countries ("abrev", "name") VALUES (E'KY', E'Cayman Islands');
INSERT INTO countries ("abrev", "name") VALUES (E'CF', E'Central African Republic');
INSERT INTO countries ("abrev", "name") VALUES (E'EA', E'Ceuta & Melilla');
INSERT INTO countries ("abrev", "name") VALUES (E'TD', E'Chad');
INSERT INTO countries ("abrev", "name") VALUES (E'CL', E'Chile');
INSERT INTO countries ("abrev", "name") VALUES (E'CN', E'China');
INSERT INTO countries ("abrev", "name") VALUES (E'CX', E'Christmas Island');
INSERT INTO countries ("abrev", "name") VALUES (E'CC', E'Cocos (Keeling) Islands');
INSERT INTO countries ("abrev", "name") VALUES (E'CO', E'Colombia');
INSERT INTO countries ("abrev", "name") VALUES (E'KM', E'Comoros');
INSERT INTO countries ("abrev", "name") VALUES (E'CG', E'Congo - Brazzaville');
INSERT INTO countries ("abrev", "name") VALUES (E'CD', E'Congo - Kinshasa');
INSERT INTO countries ("abrev", "name") VALUES (E'CK', E'Cook Islands');
INSERT INTO countries ("abrev", "name") VALUES (E'CR', E'Costa Rica');
INSERT INTO countries ("abrev", "name") VALUES (E'CI', E'Côte d’Ivoire');
INSERT INTO countries ("abrev", "name") VALUES (E'HR', E'Croatia');
INSERT INTO countries ("abrev", "name") VALUES (E'CU', E'Cuba');
INSERT INTO countries ("abrev", "name") VALUES (E'CW', E'Curaçao');
INSERT INTO countries ("abrev", "name") VALUES (E'CY', E'Cyprus');
INSERT INTO countries ("abrev", "name") VALUES (E'CZ', E'Czech Republic');
INSERT INTO countries ("abrev", "name") VALUES (E'DK', E'Denmark');
INSERT INTO countries ("abrev", "name") VALUES (E'DG', E'Diego Garcia');
INSERT INTO countries ("abrev", "name") VALUES (E'DJ', E'Djibouti');
INSERT INTO countries ("abrev", "name") VALUES (E'DM', E'Dominica');
INSERT INTO countries ("abrev", "name") VALUES (E'DO', E'Dominican Republic');
INSERT INTO countries ("abrev", "name") VALUES (E'EC', E'Ecuador');
INSERT INTO countries ("abrev", "name") VALUES (E'EG', E'Egypt');
INSERT INTO countries ("abrev", "name") VALUES (E'SV', E'El Salvador');
INSERT INTO countries ("abrev", "name") VALUES (E'GQ', E'Equatorial Guinea');
INSERT INTO countries ("abrev", "name") VALUES (E'ER', E'Eritrea');
INSERT INTO countries ("abrev", "name") VALUES (E'EE', E'Estonia');
INSERT INTO countries ("abrev", "name") VALUES (E'ET', E'Ethiopia');
INSERT INTO countries ("abrev", "name") VALUES (E'FK', E'Falkland Islands');
INSERT INTO countries ("abrev", "name") VALUES (E'FO', E'Faroe Islands');
INSERT INTO countries ("abrev", "name") VALUES (E'FJ', E'Fiji');
INSERT INTO countries ("abrev", "name") VALUES (E'FI', E'Finland');
INSERT INTO countries ("abrev", "name") VALUES (E'FR', E'France');
INSERT INTO countries ("abrev", "name") VALUES (E'GF', E'French Guiana');
INSERT INTO countries ("abrev", "name") VALUES (E'PF', E'French Polynesia');
INSERT INTO countries ("abrev", "name") VALUES (E'TF', E'French Southern Territories');
INSERT INTO countries ("abrev", "name") VALUES (E'GA', E'Gabon');
INSERT INTO countries ("abrev", "name") VALUES (E'GM', E'Gambia');
INSERT INTO countries ("abrev", "name") VALUES (E'GE', E'Georgia');
INSERT INTO countries ("abrev", "name") VALUES (E'DE', E'Germany');
INSERT INTO countries ("abrev", "name") VALUES (E'GH', E'Ghana');
INSERT INTO countries ("abrev", "name") VALUES (E'GI', E'Gibraltar');
INSERT INTO countries ("abrev", "name") VALUES (E'GR', E'Greece');
INSERT INTO countries ("abrev", "name") VALUES (E'GL', E'Greenland');
INSERT INTO countries ("abrev", "name") VALUES (E'GD', E'Grenada');
INSERT INTO countries ("abrev", "name") VALUES (E'GP', E'Guadeloupe');
INSERT INTO countries ("abrev", "name") VALUES (E'GU', E'Guam');
INSERT INTO countries ("abrev", "name") VALUES (E'GT', E'Guatemala');
INSERT INTO countries ("abrev", "name") VALUES (E'GG', E'Guernsey');
INSERT INTO countries ("abrev", "name") VALUES (E'GN', E'Guinea');
INSERT INTO countries ("abrev", "name") VALUES (E'GW', E'Guinea-Bissau');
INSERT INTO countries ("abrev", "name") VALUES (E'GY', E'Guyana');
INSERT INTO countries ("abrev", "name") VALUES (E'HT', E'Haiti');
INSERT INTO countries ("abrev", "name") VALUES (E'HN', E'Honduras');
INSERT INTO countries ("abrev", "name") VALUES (E'HK', E'Hong Kong SAR China');
INSERT INTO countries ("abrev", "name") VALUES (E'HU', E'Hungary');
INSERT INTO countries ("abrev", "name") VALUES (E'IS', E'Iceland');
INSERT INTO countries ("abrev", "name") VALUES (E'IN', E'India');
INSERT INTO countries ("abrev", "name") VALUES (E'ID', E'Indonesia');
INSERT INTO countries ("abrev", "name") VALUES (E'IR', E'Iran');
INSERT INTO countries ("abrev", "name") VALUES (E'IQ', E'Iraq');
INSERT INTO countries ("abrev", "name") VALUES (E'IE', E'Ireland');
INSERT INTO countries ("abrev", "name") VALUES (E'IM', E'Isle of Man');
INSERT INTO countries ("abrev", "name") VALUES (E'IL', E'Israel');
INSERT INTO countries ("abrev", "name") VALUES (E'IT', E'Italy');
INSERT INTO countries ("abrev", "name") VALUES (E'JM', E'Jamaica');
INSERT INTO countries ("abrev", "name") VALUES (E'JP', E'Japan');
INSERT INTO countries ("abrev", "name") VALUES (E'JE', E'Jersey');
INSERT INTO countries ("abrev", "name") VALUES (E'JO', E'Jordan');
INSERT INTO countries ("abrev", "name") VALUES (E'KZ', E'Kazakhstan');
INSERT INTO countries ("abrev", "name") VALUES (E'KE', E'Kenya');
INSERT INTO countries ("abrev", "name") VALUES (E'KI', E'Kiribati');
INSERT INTO countries ("abrev", "name") VALUES (E'XK', E'Kosovo');
INSERT INTO countries ("abrev", "name") VALUES (E'KW', E'Kuwait');
INSERT INTO countries ("abrev", "name") VALUES (E'KG', E'Kyrgyzstan');
INSERT INTO countries ("abrev", "name") VALUES (E'LA', E'Laos');
INSERT INTO countries ("abrev", "name") VALUES (E'LV', E'Latvia');
INSERT INTO countries ("abrev", "name") VALUES (E'LB', E'Lebanon');
INSERT INTO countries ("abrev", "name") VALUES (E'LS', E'Lesotho');
INSERT INTO countries ("abrev", "name") VALUES (E'LR', E'Liberia');
INSERT INTO countries ("abrev", "name") VALUES (E'LY', E'Libya');
INSERT INTO countries ("abrev", "name") VALUES (E'LI', E'Liechtenstein');
INSERT INTO countries ("abrev", "name") VALUES (E'LT', E'Lithuania');
INSERT INTO countries ("abrev", "name") VALUES (E'LU', E'Luxembourg');
INSERT INTO countries ("abrev", "name") VALUES (E'MO', E'Macau SAR China');
INSERT INTO countries ("abrev", "name") VALUES (E'MK', E'Macedonia');
INSERT INTO countries ("abrev", "name") VALUES (E'MG', E'Madagascar');
INSERT INTO countries ("abrev", "name") VALUES (E'MW', E'Malawi');
INSERT INTO countries ("abrev", "name") VALUES (E'MY', E'Malaysia');
INSERT INTO countries ("abrev", "name") VALUES (E'MV', E'Maldives');
INSERT INTO countries ("abrev", "name") VALUES (E'ML', E'Mali');
INSERT INTO countries ("abrev", "name") VALUES (E'MT', E'Malta');
INSERT INTO countries ("abrev", "name") VALUES (E'MH', E'Marshall Islands');
INSERT INTO countries ("abrev", "name") VALUES (E'MQ', E'Martinique');
INSERT INTO countries ("abrev", "name") VALUES (E'MR', E'Mauritania');
INSERT INTO countries ("abrev", "name") VALUES (E'MU', E'Mauritius');
INSERT INTO countries ("abrev", "name") VALUES (E'YT', E'Mayotte');
INSERT INTO countries ("abrev", "name") VALUES (E'MX', E'Mexico');
INSERT INTO countries ("abrev", "name") VALUES (E'FM', E'Micronesia');
INSERT INTO countries ("abrev", "name") VALUES (E'MD', E'Moldova');
INSERT INTO countries ("abrev", "name") VALUES (E'MC', E'Monaco');
INSERT INTO countries ("abrev", "name") VALUES (E'MN', E'Mongolia');
INSERT INTO countries ("abrev", "name") VALUES (E'ME', E'Montenegro');
INSERT INTO countries ("abrev", "name") VALUES (E'MS', E'Montserrat');
INSERT INTO countries ("abrev", "name") VALUES (E'MA', E'Morocco');
INSERT INTO countries ("abrev", "name") VALUES (E'MZ', E'Mozambique');
INSERT INTO countries ("abrev", "name") VALUES (E'MM', E'Myanmar (Burma)');
INSERT INTO countries ("abrev", "name") VALUES (E'NA', E'Namibia');
INSERT INTO countries ("abrev", "name") VALUES (E'NR', E'Nauru');
INSERT INTO countries ("abrev", "name") VALUES (E'NP', E'Nepal');
INSERT INTO countries ("abrev", "name") VALUES (E'NL', E'Netherlands');
INSERT INTO countries ("abrev", "name") VALUES (E'NC', E'New Caledonia');
INSERT INTO countries ("abrev", "name") VALUES (E'NZ', E'New Zealand');
INSERT INTO countries ("abrev", "name") VALUES (E'NI', E'Nicaragua');
INSERT INTO countries ("abrev", "name") VALUES (E'NE', E'Niger');
INSERT INTO countries ("abrev", "name") VALUES (E'NG', E'Nigeria');
INSERT INTO countries ("abrev", "name") VALUES (E'NU', E'Niue');
INSERT INTO countries ("abrev", "name") VALUES (E'NF', E'Norfolk Island');
INSERT INTO countries ("abrev", "name") VALUES (E'KP', E'North Korea');
INSERT INTO countries ("abrev", "name") VALUES (E'MP', E'Northern Mariana Islands');
INSERT INTO countries ("abrev", "name") VALUES (E'NO', E'Norway');
INSERT INTO countries ("abrev", "name") VALUES (E'OM', E'Oman');
INSERT INTO countries ("abrev", "name") VALUES (E'PK', E'Pakistan');
INSERT INTO countries ("abrev", "name") VALUES (E'PW', E'Palau');
INSERT INTO countries ("abrev", "name") VALUES (E'PS', E'Palestinian Territories');
INSERT INTO countries ("abrev", "name") VALUES (E'PA', E'Panama');
INSERT INTO countries ("abrev", "name") VALUES (E'PG', E'Papua New Guinea');
INSERT INTO countries ("abrev", "name") VALUES (E'PY', E'Paraguay');
INSERT INTO countries ("abrev", "name") VALUES (E'PE', E'Peru');
INSERT INTO countries ("abrev", "name") VALUES (E'PH', E'Philippines');
INSERT INTO countries ("abrev", "name") VALUES (E'PN', E'Pitcairn Islands');
INSERT INTO countries ("abrev", "name") VALUES (E'PL', E'Poland');
INSERT INTO countries ("abrev", "name") VALUES (E'PT', E'Portugal');
INSERT INTO countries ("abrev", "name") VALUES (E'PR', E'Puerto Rico');
INSERT INTO countries ("abrev", "name") VALUES (E'QA', E'Qatar');
INSERT INTO countries ("abrev", "name") VALUES (E'RE', E'Réunion');
INSERT INTO countries ("abrev", "name") VALUES (E'RO', E'Romania');
INSERT INTO countries ("abrev", "name") VALUES (E'RU', E'Russia');
INSERT INTO countries ("abrev", "name") VALUES (E'RW', E'Rwanda');
INSERT INTO countries ("abrev", "name") VALUES (E'WS', E'Samoa');
INSERT INTO countries ("abrev", "name") VALUES (E'SM', E'San Marino');
INSERT INTO countries ("abrev", "name") VALUES (E'ST', E'São Tomé & Príncipe');
INSERT INTO countries ("abrev", "name") VALUES (E'SA', E'Saudi Arabia');
INSERT INTO countries ("abrev", "name") VALUES (E'SN', E'Senegal');
INSERT INTO countries ("abrev", "name") VALUES (E'RS', E'Serbia');
INSERT INTO countries ("abrev", "name") VALUES (E'SC', E'Seychelles');
INSERT INTO countries ("abrev", "name") VALUES (E'SL', E'Sierra Leone');
INSERT INTO countries ("abrev", "name") VALUES (E'SG', E'Singapore');
INSERT INTO countries ("abrev", "name") VALUES (E'SX', E'Sint Maarten');
INSERT INTO countries ("abrev", "name") VALUES (E'SK', E'Slovakia');
INSERT INTO countries ("abrev", "name") VALUES (E'SI', E'Slovenia');
INSERT INTO countries ("abrev", "name") VALUES (E'SB', E'Solomon Islands');
INSERT INTO countries ("abrev", "name") VALUES (E'SO', E'Somalia');
INSERT INTO countries ("abrev", "name") VALUES (E'ZA', E'South Africa');
INSERT INTO countries ("abrev", "name") VALUES (E'GS', E'South Georgia & South Sandwich Islands');
INSERT INTO countries ("abrev", "name") VALUES (E'KR', E'South Korea');
INSERT INTO countries ("abrev", "name") VALUES (E'SS', E'South Sudan');
INSERT INTO countries ("abrev", "name") VALUES (E'ES', E'Spain');
INSERT INTO countries ("abrev", "name") VALUES (E'LK', E'Sri Lanka');
INSERT INTO countries ("abrev", "name") VALUES (E'BL', E'St. Barthélemy');
INSERT INTO countries ("abrev", "name") VALUES (E'SH', E'St. Helena');
INSERT INTO countries ("abrev", "name") VALUES (E'KN', E'St. Kitts & Nevis');
INSERT INTO countries ("abrev", "name") VALUES (E'LC', E'St. Lucia');
INSERT INTO countries ("abrev", "name") VALUES (E'MF', E'St. Martin');
INSERT INTO countries ("abrev", "name") VALUES (E'PM', E'St. Pierre & Miquelon');
INSERT INTO countries ("abrev", "name") VALUES (E'VC', E'St. Vincent & Grenadines');
INSERT INTO countries ("abrev", "name") VALUES (E'SD', E'Sudan');
INSERT INTO countries ("abrev", "name") VALUES (E'SR', E'Suriname');
INSERT INTO countries ("abrev", "name") VALUES (E'SJ', E'Svalbard & Jan Mayen');
INSERT INTO countries ("abrev", "name") VALUES (E'SZ', E'Swaziland');
INSERT INTO countries ("abrev", "name") VALUES (E'SE', E'Sweden');
INSERT INTO countries ("abrev", "name") VALUES (E'CH', E'Switzerland');
INSERT INTO countries ("abrev", "name") VALUES (E'SY', E'Syria');
INSERT INTO countries ("abrev", "name") VALUES (E'TW', E'Taiwan');
INSERT INTO countries ("abrev", "name") VALUES (E'TJ', E'Tajikistan');
INSERT INTO countries ("abrev", "name") VALUES (E'TZ', E'Tanzania');
INSERT INTO countries ("abrev", "name") VALUES (E'TH', E'Thailand');
INSERT INTO countries ("abrev", "name") VALUES (E'TL', E'Timor-Leste');
INSERT INTO countries ("abrev", "name") VALUES (E'TG', E'Togo');
INSERT INTO countries ("abrev", "name") VALUES (E'TK', E'Tokelau');
INSERT INTO countries ("abrev", "name") VALUES (E'TO', E'Tonga');
INSERT INTO countries ("abrev", "name") VALUES (E'TT', E'Trinidad & Tobago');
INSERT INTO countries ("abrev", "name") VALUES (E'TA', E'Tristan da Cunha');
INSERT INTO countries ("abrev", "name") VALUES (E'TN', E'Tunisia');
INSERT INTO countries ("abrev", "name") VALUES (E'TR', E'Turkey');
INSERT INTO countries ("abrev", "name") VALUES (E'TM', E'Turkmenistan');
INSERT INTO countries ("abrev", "name") VALUES (E'TC', E'Turks & Caicos Islands');
INSERT INTO countries ("abrev", "name") VALUES (E'TV', E'Tuvalu');
INSERT INTO countries ("abrev", "name") VALUES (E'UM', E'U.S. Outlying Islands');
INSERT INTO countries ("abrev", "name") VALUES (E'VI', E'U.S. Virgin Islands');
INSERT INTO countries ("abrev", "name") VALUES (E'UG', E'Uganda');
INSERT INTO countries ("abrev", "name") VALUES (E'UA', E'Ukraine');
INSERT INTO countries ("abrev", "name") VALUES (E'AE', E'United Arab Emirates');
INSERT INTO countries ("abrev", "name") VALUES (E'GB', E'United Kingdom');
INSERT INTO countries ("abrev", "name") VALUES (E'US', E'United States');
INSERT INTO countries ("abrev", "name") VALUES (E'UY', E'Uruguay');
INSERT INTO countries ("abrev", "name") VALUES (E'UZ', E'Uzbekistan');
INSERT INTO countries ("abrev", "name") VALUES (E'VU', E'Vanuatu');
INSERT INTO countries ("abrev", "name") VALUES (E'VA', E'Vatican City');
INSERT INTO countries ("abrev", "name") VALUES (E'VE', E'Venezuela');
INSERT INTO countries ("abrev", "name") VALUES (E'VN', E'Vietnam');
INSERT INTO countries ("abrev", "name") VALUES (E'WF', E'Wallis & Futuna');
INSERT INTO countries ("abrev", "name") VALUES (E'EH', E'Western Sahara');
INSERT INTO countries ("abrev", "name") VALUES (E'YE', E'Yemen');
INSERT INTO countries ("abrev", "name") VALUES (E'ZM', E'Zambia');
INSERT INTO countries ("abrev", "name") VALUES (E'ZW', E'Zimbabwe');


CREATE FUNCTION relateImagesToPackages(TEXT[], int) RETURNS void AS $$
	DECLARE 
		x  TEXT; 
	BEGIN 
		FOREACH x in ARRAY $1
		LOOP 
			INSERT INTO packageImage(imageName, idPackage) VALUES(x,$2); 
		END LOOP;
	END;
$$ LANGUAGE plpgsql;
