const router = require("express").Router();
const { v4: uuidv4 } = require("uuid");
const Item = require("../persistence/models/item");
const User = require("../persistence/models/user");
const verifyJwt = require("../middleware/auth");
const {
  validateAddItemRequestBody,
  validateUpdateItemRequestBody,
} = require("../validator/item");

router.post(
  "/add-item",
  verifyJwt,
  async (req, res) => {
    try {
      const uuid = req.user.uuid;
      const { itemName } = validateAddItemRequestBody(req.body);

      const user = await User.findOne({uuid});
      const newItem = new Item({
        itemId: uuidv4(),
        itemName,
        addedByuuid: uuid,
        addedByName: user.name
      });

      await newItem.save();

      return res.status(201).json({
        status: 201,
        message: "User added",
        data: {
          itemId: newItem.itemId,
          itemName,
          addedByuuid: uuid,
          addedByName: user.name
        },
      });
    } catch (e) {
      console.error(`Error in post user`, e);

      if (e.name === "ValidationError") {
        const message = e.message || "Bad request";
        return res.status(400).json({
          status: 400,
          message: message.split(":")[0],
          data: null,
        });
      }

      return res.status(500).json({
        status: 500,
        message: e.message || "Internal server error",
        data: null,
      });
    }
  }
);

router.get(
  "/get-item/:itemId",
  verifyJwt,
  async (req, res) => {
    try {
      const { itemId } = req.params;
      const item = await Item.findOne({ itemId });

      if (!item) {
        return res.status(404).json({
          status: 404,
          message: "Not Found",
          data: null,
        });
      }

      return res.status(200).json({
        status: 200,
        data: {
          itemId,
          itemName: item.itemName,
          addedByuuid: item.addedByuuid,
          addedByName: item.addedByName
        },
      });
    } catch (e) {
      console.error(`Error in get user by id`, e);

      if (e.name === "ValidationError") {
        const message = e.message || "Bad request";
        return res.status(400).json({
          status: 400,
          message: message.split(":")[0],
          data: null,
        });
      }

      return res.status(500).json({
        status: 500,
        message: e.message || "Internal server error",
        data: null,
      });
    }
  }
);

router.get(
  "/get-items",
  verifyJwt,
  async (req, res) => {
    try {
      const items = await Item.find();

      return res.status(200).json({
        status: 200,
        data: items.map((item) => {
          return {
            itemId: item.itemId,
            itemName: item.itemName,
            addedByuuid: item.addedByuuid,
            addedByName: item.addedByName
          };
        }),
      });
    } catch (e) {
      console.error(`Error in get user by id`, e);

      if (e.name === "ValidationError") {
        const message = e.message || "Bad request";
        return res.status(400).json({
          status: 400,
          message: message.split(":")[0],
          data: null,
        });
      }

      return res.status(500).json({
        status: 500,
        message: e.message || "Internal server error",
        data: null,
      });
    }
  }
);

router.patch(
  "/update-item/:itemId",
  verifyJwt,
  async (req, res) => {
    try {
      const uuid = req.user.uuid;
      const { itemId } = req.params;
      const { itemName } = validateUpdateItemRequestBody(req.body);

      const item = await Item.findOne({ itemId });

      if (!item) {
        return res.status(500).json({
          status: 500,
          message: "Some issue occured",
          data: null,
        });
      }

      const updateObj = {};

      if (itemName) {
        updateObj["itemName"] = itemName;
      }

      const updatedItem = await Item.findOneAndUpdate({ itemId }, updateObj, {
        new: true,
      });

      return res.status(201).json({
        status: 201,
        message: "user added",
        data: {
          itemId: updatedItem.itemId,
          itemName: updatedItem.itemName,
          addedByuuid: updatedItem.addedByuuid,
          addedByName: updatedItem.addedByName
        },
      });
    } catch (e) {
      console.error(`Error in post user`, e);

      if (e.name === "ValidationError") {
        const message = e.message || "Bad request";
        return res.status(400).json({
          status: 400,
          message: message.split(":")[0],
          data: null,
        });
      }

      return res.status(500).json({
        status: 500,
        message: e.message || "Internal server error",
        data: null,
      });
    }
  }
);

router.delete(
  "/delete-item/:itemId",
  verifyJwt,
  async (req, res) => {
    try {
      const { itemId } = req.params;

      const filter = { itemId };

      await Item.deleteOne(filter);

      return res.status(200).json({
        status: 200,
        message: "user Deleted Successfully!",
      });
    } catch (e) {
      console.log(`Error deleting the user`, e);

      if (e.name === "ValidationError") {
        const message = e.message || "Bad request";
        return res.status(400).json({
          status: 400,
          message: message.split(":")[0],
          data: null,
        });
      }

      return res.status(500).json({
        status: 500,
        message: e.message || "Internal server error",
        data: null,
      });
    }
  }
);

module.exports = router;