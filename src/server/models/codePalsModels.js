// require postgres
const { Pool } = require('pg');

// set URI
const PG_URI = 'postgres://icpmmiqd:HaCOX4pTAib-RkWrrUNjPj5IDXh_cck0@babar.db.elephantsql.com/icpmmiqd';

// connect to database
const pool = new Pool({
    connectionString: PG_URI
});

/*
CREATE TABLE people (
  person_id serial NOT NULL,
  first_name varchar,
  last_name varchar,
  points integer
)
*/

module.exports = {
    query: (text, params, callback) => {
        console.log('executed query', text);
        return pool.query(text, params, callback);
    }
}

/*
SQL DB STUFF
CREATE TABLE  public.species (
	"_id" serial NOT NULL,
	"name" varchar NOT NULL,
	"classification" varchar,
	"average_height" varchar,
	"average_lifespan" varchar,
	"hair_colors" varchar,
	"skin_colors" varchar,
	"eye_colors" varchar,
	"language" varchar,
	"homeworld_id" bigint,
	CONSTRAINT "species_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE
);

MONGOOSE STUFF:
// sets a schema for the 'species' collection
const speciesSchema = new Schema({
  name: String,
  classification: String,
  average_height: String,
  average_lifespan: String,
  hair_colors: String,
  skin_colors: String,
  eye_colors: String,
  language: String,
  homeworld: String,
  homeworld_id: {
    // type of ObjectId makes this behave like a foreign key referencing the 'planet' collection
    type: Schema.Types.ObjectId,
    ref: 'planet'
  }
});

// creats a model for the 'species' collection that will be part of the export
const Species = mongoose.model('species', speciesSchema);
*/

// EXPORT all the models in an object to be used in the controller