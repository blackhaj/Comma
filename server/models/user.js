module.exports = (sequelize, type) => {
  return sequelize.define("user", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: type.STRING,
      unique: true,
      isEmail: true,
      allowNull: false,
      notEmpty: true,
    },
    password: {
      type: type.STRING,
      len: [5, 50],
      allowNull: false,
      notEmpty: true,
    },
    dob: type.DATEONLY,
    targetRetirementAge: type.INTEGER,
    deleted: {
      type: type.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
  });
};


// USERs
// email type.STRING,
// password - type.STRING (pre encrypted)
// DOB - type.DATEONLY
// retirement age - type.DATEONLY
