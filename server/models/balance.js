// *Balances:*

// - account_id - integer
// - date - Date
// - amount - decimal

module.exports = (sequelize, type) => {
  return sequelize.define("balance", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    date: type.DATEONLY,
    balance: type.DECIMAL,
    deleted: {
      type: type.BOOLEAN,
      defaultValue: false,
    },
  });
}