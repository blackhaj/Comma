// export getOne, getMany, createOne, updateOne, deleteOne,

// Each a function which takes a model and returns a function that takes req, res
// User accessed on the req
// returns json with {data: payload}

const readOne = model => async (req, res, next) => {
  try {
    const doc = await model.findOne({
      where: {
        userId: req.user.id,
        id: req.params.id,
        deleted: false,
      },
    });
    if (!doc) {
      return res.status(400).end();
    }
    res.status(200).json({ data: doc.dataValues });
  } catch (error) {
    return next(error);
  }
};

const readMany = model => async (req, res, next) => {
  try {
    let docs = await model.findAll({
      where: {
        userId: req.user.id,
        deleted: false,
      },
    });
    if (docs.length === 0) {
      return res.status(400).end();
    }
    docs = docs.map(doc => doc.dataValues);
    res.status(200).json({ data: docs });
  } catch (error) {
    return next(error);
  }
};

const createOne = model => async (req, res, next) => {
  try {
    const { id, deleted, createdAt, updatedAt, ...data} = req.body;
    const created = await model.create({
      userId: req.user.id,
      ...data,
    });
    res.status(200).json({ data: created.dataValues });
  } catch (error) {
    return next(error);
  }
};

const updateOne = model => async (req, res, next) => {
  try {
    const { id, createdAt, updatedAt, ...data} = req.body;
    const updated = await model.update({
      ...data,
    }, {
      returning: true,
      where: {
        userId: req.user.id,
        id: req.params.id,
      },
    });
    if (updated[0] === 0) {
      return res.status(400).end();
    }
    res.status(200).json({ data: updated[1][0].dataValues });
  } catch (error) {
    return next(error);
  }
};

const deleteOne = model => async (req, res, next) => {
  try {
    const { id, deleted, createdAt, updatedAt, ...data} = req.body;
    const deletedDoc = await model.update({
      deleted: true,
    }, {
      returning: true,
      where: {
        userId: req.user.id,
        id: req.params.id,
      },
    });
    if (deletedDoc[0] === 0) {
      return res.status(400).end();
    }
    res.status(200).json({ data: deletedDoc[1][0].dataValues });
  } catch (error) {
    return next(error);
  }
};

module.exports.crudControllers = (model) => {
  return {
    readOne: readOne(model),
    readMany: readMany(model),
    createOne: createOne(model),
    updateOne: updateOne(model),
    deleteOne: deleteOne(model),
  };
};
