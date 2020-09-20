const db = require("../models");
const config = require("../../config/auth.config");
const { session } = require("../middleware");
const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");


exports.signup = (req, res) => {
  // Save User to Database
  User.create({
    username: req.body.username,
    email: req.body.email,
    name: req.body.name,
    purchases: 0,
    sales: 0,
    level: 0,
    password: bcrypt.hashSync(req.body.password, 8),
    metamaskAccount: req.body.metamaskAccount, //Habrá que cogerla directamente desde el front con web3
  })
    .then(user => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles
            }
          }
        }).then(roles => {
          //Seteo de los roles recibidos en el body
          //y publico por defecto
          user.setRoles(roles)
          user.setPermissions([1]).then(() => {
            res.status(200).send({ message: "User was registered successfully!" });
          });
        });
      } else {
        //Rol de usuario base y perfil publico, ambos por defecto
        user.setRoles([1])
        user.setPermissions([1]).then(() => {
          res.status(200).send({ message: "User was registered successfully!" });
        });
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: config.token_expiry // 24 hours
      });

      var authorities = [];
      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }

        // GENERATE COOKIE
        session.sendUserIdCookie(user.id, res) 
        res.status(200).send({
          roles: authorities,
          username: user.username,  
          accessToken: token
        });
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.signout = (req, res) => {
  req.logout();
  res.clearCookie('');
  req.session.destroy();
  res.redirect('/');
};
