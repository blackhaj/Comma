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
    accountName: {
      type: type.STRING,
      allowNull: false,
      notEmpty: true,
    },
    interestRate: type.DECIMAL,
    accountType: {
      type: type.ENUM,
      values: ['current', 'savings', 'investment'],
    },
    isin: type.STRING,
    assetClass: {
      type: type.ENUM,
      values: ['shares', 'bonds', 'cash'],
    },
    deleted: {
      type: type.BOOLEAN,
      defaultValue: false,
    },
  });
};