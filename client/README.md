# This is the layout of the tables in the database on ElephantSQL

CREATE TABLE user_table (
	id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	email TEXT NOT NULL, 
	password TEXT NOT NULL,
	nickname VARCHAR(30) NOT NULL UNIQUE,
	score INT DEFAULT 0,
	money INT DEFAULT 500
); 

CREATE TABLE rider_table (
	id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	name VARCHAR(50) NOT NULL UNIQUE,
	price INT DEFAULT 10, 
	roster INT,
	added_at DATE,
	team VARCHAR(50),
	image TEXT,
	classic_pnts INT DEFAULT 0,
	gc_pnts INT DEFAULT 0,
	tt_pnts INT DEFAULT 0,
	sprint_pnts INT DEFAULT 0,
	climb_pnts INT DEFAULT 0,
	next_race TEXT,
	CONSTRAINT fk_ownership
		FOREIGN KEY(roster)
			REFERENCES user_table(id)
			ON DELETE SET NULL
);

CREATE TABLE score_table (
	id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	rider VARCHAR(50) NOT NULL, 
	score INT NOT NULL,
	prev_score INT NOT NULL,
	updated_at DATE,
	CONSTRAINT unchanged_score
		UNIQUE (rider, score),
	CONSTRAINT fk_scoring
		FOREIGN KEY(rider)
			REFERENCES rider_table(name)
			ON DELETE CASCADE
);

CREATE TABLE roster_table (
	id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  roster INT NOT NULL,
	rider VARCHAR(50) NOT NULL,
	end_date DATE,
	start_date DATE NOT NULL,
	CONSTRAINT fk_roster
		FOREIGN KEY (roster)
			REFERENCES user_table(id),
	CONSTRAINT fk_rider
		FOREIGN KEY (rider)
			REFERENCES rider_table(name)
);

# this is the layout of an example user in Auth0

{
    "created_at": "2022-01-17T19:51:28.347Z",
    "email": "natashajvandam@outlook.com",
    "identities": [
        {
            "connection": "user-table",
            "provider": "auth0",
            "user_id": 1,
            "isSocial": false
        }
    ],
    "name": "natashajvandam@outlook.com",
    "nickname": "natasha",
    "picture": "https://s.gravatar.com/avatar/d778680553a12b9b5d5a573eb85973e0?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fna.png",
    "updated_at": "2022-01-18T16:18:58.723Z",
    "user_id": "auth0|1",
    "last_ip": "2001:1c05:1405:9900:ed:23ba:fb06:8274",
    "last_login": "2022-01-18T16:18:58.723Z",
    "logins_count": 2,
    "blocked_for": [],
    "guardian_authenticators": []
}