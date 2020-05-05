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
    date: {
      type: type.DATEONLY,
      allowNull: false,
    },
    balance: {
      type: type.DECIMAL,
      allowNull: false,
    },
    userId: {
      type: type.INTEGER,
      references: {
        model: "users", // 'persons' refers to table name
        key: "id", // 'id' refers to column name in persons table
      },
      allowNull: false,
    },
    accountId: {
      type: type.INTEGER,
      references: {
        model: "accounts", // 'persons' refers to table name
        key: "id", // 'id' refers to column name in persons table
      },
      allowNull: false,
    },
    deleted: {
      type: type.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
  });
}