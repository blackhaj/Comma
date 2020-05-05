// *Accounts:*

// - userId - int
// - account_name - string
// - interest_rate - decimal
// - account_type - int (0 = current account, 1 = high interest, 2 = investment instrument)
// - isin - string
// - asset_class - string

module.exports = (sequelize, type) => {
  return sequelize.define("account", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: type.INTEGER,
      references: {
        model: "users", // 'persons' refers to table name
        key: "id", // 'id' refers to column name in persons table
      },
      allowNull: false,
    },
    accountName: {
      type: type.STRING,
      allowNull: false,
      notEmpty: true,
    },
    interestRate: type.DECIMAL,
    accountType: {
      type: type.ENUM,
      values: ['current', 'savings', 'investment'],
      allowNull: false,
    },
    isin: type.STRING,
    assetClass: {
      type: type.ENUM,
      values: ['shares', 'bonds', 'cash'],
      allowNull: false,
      defaultValue: 'cash',
    },
    deleted: {
      type: type.BOOLEAN,
      defaultValue: false,
    },
  });
};