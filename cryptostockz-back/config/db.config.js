// db.config.js

module.exports = {

  RECREATE_DB: false, 
  db: {
      development: {
          username: "cryptostockz", // your sql username
          password: "cryptostockz", // your sql password (may be null)
          database: "cryptostockz", // db name
          host: "127.0.0.1", // local host
          port: "5434",
          dialect: "postgres",
          pool: {
            max: 10,
            min: 0,
            acquire: 30000,
            idle: 10000
          }
          
        },
      production: {
          username: "UNDEFINED", // your sql username
          password: "UNDEFINED", // your sql password (may be null)
          database: "UNDEFINED", // db name
          host: "127.0.0.1", // local host
          port: "5434", // local host
          dialect: "postgres"
        }
  }
  
};


