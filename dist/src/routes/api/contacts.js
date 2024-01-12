"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const contacts_1 = require("../../controllers/contacts");
const decorators_1 = require("../../decorators");
const validators_1 = require("../../validators");
const middlewares_1 = require("../../middlewares");
const router = express_1.default.Router();
router.get("/", middlewares_1.authenticate, contacts_1.contactsController.getAll);
router.post("/", middlewares_1.authenticate, (0, decorators_1.validateBody)(validators_1.contactSchemas.createContactSchema), contacts_1.contactsController.createContact);
router.get("/:contactId", middlewares_1.authenticate, middlewares_1.isValidId, contacts_1.contactsController.getById);
router.put("/:contactId", middlewares_1.authenticate, middlewares_1.isValidId, (0, decorators_1.validateBody)(validators_1.contactSchemas.createContactSchema), contacts_1.contactsController.updateById);
router.patch("/:contactId/favorite", middlewares_1.authenticate, middlewares_1.isValidId, (0, decorators_1.validateBody)(validators_1.contactSchemas.updateFavoriteSchema), contacts_1.contactsController.updateFavorite);
router.delete("/:contactId", middlewares_1.authenticate, middlewares_1.isValidId, contacts_1.contactsController.deleteById);
exports.default = router;
