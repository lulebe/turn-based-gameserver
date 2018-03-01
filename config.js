module.exports = {
  jwtKey: process.env.JWTSECRET || 'examplekey',
  DBSSLKey: process.env.DBSSLKEY || null,
  DBSSLCert: process.env.DBSSLCERT || null,
  DBSSLCA: process.env.DBSSLCA || null,
  DBUser: process.env.DBUSER || 'root',
  DBPW: process.env.DBPW || 'root',
  DBName: process.env.DBNAME || 'turnbasedgameserver',
  DBHost: process.env.DBHOST || '127.0.0.1',
  DBPort: process.env.DBPORT || '3306',
  Port: process.env.PORT || 8080,
  GameName: process.env.GAMENAME || 'Default turn-based',
  FbKey: process.env.FB_KEY || {},
  FbUrl: process.env.FB_URL || '',
  maxGameAge: process.env.MAX_GAME_AGE || 48 * 3600
}