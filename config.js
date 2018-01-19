module.exports = {
  jwtKey: process.env.JWTKEY || 'examplekey',
  DBSSLKey: process.env.DBSSLKEY || null,
  DBSSLCert: process.env.DBSSLCERT || null,
  DBSSLCA: process.env.DBSSLCA || null,
  DBUser: process.env.DBUSER || 'root',
  DBPW: process.env.DBPW || 'root',
  DBName: process.env.DBNAME || 'turnbasedgameserver',
  DBHost: process.env.DBHOST || '127.0.0.1',
  DBPort: process.env.DBPORT || '3306'
}