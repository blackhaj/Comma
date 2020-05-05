// *Transfers*

// - date - Date
// - account_to - foreign key
// - account_from - foreign key
// - amount - decimal

module.exports = (sequelize, type) => {
  return sequelize.define("transfer", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    accountFrom: {
      type: type.INTEGER,
      references: {
        model: "accounts", // 'persons' refers to table name
        key: "id", // 'id' refers to column name in persons table
      },
      allowNull: false,
    },
    accountTo: {
      type: type.INTEGER,
      references: {
        model: "accounts", // 'persons' refers to table name
        key: "id", // 'id' refers to column name in persons table
      },
      allowNull: false,
    },
    date: {
      type: type.DATEONLY,
      allowNull: false,
    },
    amount: {
      type: type.DECIMAL,
      allowNull: false,
    },
    deleted: {
      type: type.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
  });
};
