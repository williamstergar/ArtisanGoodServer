const {DataTypes} = require("sequelize");
const db = require("../db");

const ArtisanItem = db.define("artisanitem", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING(2000),
        allowNull: false,
      },
      availability: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      photoURL: {
        type: DataTypes.STRING(2000),
        allowNull: false,
      },
      owner_id: {
          type: DataTypes.INTEGER
      }
    });

module.exports = ArtisanItem


