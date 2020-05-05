// *Incomes*

// - date - Date
// - account - foreign key
// - amount - decimal
// - type - int (0 = income, 1 = one-off)

module.exports = (sequelize, type) => {
  return sequelize.define("inflow", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    date: {
      type: type.DATEONLY,
      allowNull: false,
    },
    amount: {
      type: type.DECIMAL,
      allowNull: false,
    },
    category: {
      type: type.ENUM,
      values: ['income', 'one-off'],
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