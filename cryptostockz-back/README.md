# CryptoStockZ - BACKEND NODE + EXPRESS

## TABLA DE CONTENIDO
<!--ts-->
   * [Ejecución](#ejecución)
      * [Desarrollo](#desarrollo)
      * [Producción](#producción)
      * [Generar tablas base de datos](#generar-base-de-datos)
   * [Conexion con la base de datos](#conexion-con-la-base-de-datos)
      * [Base de datos](#base-de-datos)
      * [Usuario](#usuario)
      * [Configruación postgresql](#configuración-postgresql)
      * [Entornos](#entornos)
   * [Cookies y Tokens](#cookies-y-tokens)
      * [Token](#token)
      * [Cookie](#cookie)
<!--te-->

## EJECUCIÓN
### DESARROLLO

``` bash
npm start
```

### PRODUCCIÓN

Ejecutar así hará que los parámetros de la base de datos sean los de producción.

``` bash
NODE_ENV='production' npm start
```


### GENERAR BASE DE DATOS

La primera vez que ejecutamos no tenemos base de datos creada, ejecutando con el servidor con el siguiente comando regeneraremos la base de datos.

``` bash
RECREATE_DB=true npm start
```


## CONEXION BASE DE DATOS

Instalar servidor postgresql 12 (googlear)

### BASE DE DATOS
Crear una base de datos con nombre -> "cryptostockz"

### USUARIO
Crear un usuario -> "cryptostockz"
Darle una contraseña -> "cryptostockz"

```bash
CREATE ROLE cryptostockz WITH LOGIN PASSWORD 'cryptostockz'
```

Darle permisos -> ALL

Ejemplo:
``` sql
CREATE DATABASE cryptostockz
    WITH 
    OWNER = cryptostockz
    ENCODING = 'UTF8'
    CONNECTION LIMIT = -1;

GRANT ALL ON DATABASE cryptostockz TO cryptostockz;
```

### CONFIGURACIÓN POSTGRESQL

En el archivo `posgresql.conf`

``` bash
sudo nano /etc/postgresql/12/main/postgresql.conf 
```

Asegurarnos que el puerto es `5434` y que escucha en `localhost`

En un entorno Mac para instalar postgres debemos lanzar los siguientes comandos.

```bash
brew doctor
brew update
brew install postgres
```

Buscar donde se encuentra el fichero de configuración.
```bash
sudo find / -name "postgresql.conf"
```
copiar la primera ruta que aparece que será parecida a /usr/local/var/postgres/postgresql.conf y editar las lineas de localhost y port cambiandolo a `5434`
```bash
nano /usr/local/var/postgres/postgresql.conf
```

Para comprobar que está iniciado el servicio
```bash
pg_ctl -D /usr/local/var/postgres start
```
Acceder con el comando a postgres
```bash
psql -p 5434 postgres
```

### ENTORNOS 
Podemos establecer otros parámetros en el archivo `config.js`

``` js
    development: {
        username: "cryptostockz", // your sql username
        password: "cryptostockz", // your sql password (may be null)
        database: "cryptostockz", // db name
        host: "127.0.0.1", // local host
        port: "5434",
        dialect: "postgres"
        },
    production: {
        username: "UNDEFINED", // your sql username
        password: "UNDEFINED", // your sql password (may be null)
        database: "UNDEFINED", // db name
        host: "127.0.0.1", // local host
        port: "5434", // local host
        dialect: "postgres"
        }
```


## COOKIES Y TOKENS

Para dar seguridad al sistema he incluido en el servidor la gestión de sesiones mediante cookie y una gestión de roles mediante token.

Cuando un usuario se logea se le dá automáticamente una cookie y un token. 

### TOKEN
Con el token comprobamos el rol que tiene el usuario, nunca podrá hacer peticiones al sisitema que no sean publicas sin uno de estos.

Habrá peticiones "seguras" como la creación de producto que únicamente las podrán generar aquellas cuentas de manufacturers.

En esta ocasión es indiferente el usuario en sí que las genere. Las cuentas de manufacturer siempre pueden generar productos asociados a su cuenta.

### COOKIE
Habrá transacciones que a diferencia de las anteriores "seguras" implican que sólo puedan ser realizadas por un usuario. Por ejemplo la transacción de la propiedad de un artículo.

Para ello tendremos que comprobar siempre que el owner es el mismo que el que se encuentra en la cookie.

Ej:
``` js
const { session } = require("../middleware")

let user_id = session.getUserId(req, res) //Devuelve el user_id logeado
```

Metiendo este trozo de código en las transacciones "no seguras" podremos comprobar que el ejecutor es el correcto. (Ej: Propietario del producto es user_id)

