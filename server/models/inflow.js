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
    date: type.DATEONLY,
    amount: type.DECIMAL,
    category: {
      type: type.ENUM,
      values: ['income', 'one-off'],
    },
    deleted: {
      type: type.BOOLEAN,
      defaultValue: false,
    },
  });
}