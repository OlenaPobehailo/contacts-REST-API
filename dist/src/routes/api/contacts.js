"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const contacts_1 = require("../../controllers/contacts");
const { validateBody } = require("../../decorators");
const { contactSchemas } = require("../../validators");
const { isValidId, authenticate } = require("../../middlewares");
const router = express_1.default.Router();
router.get("/", authenticate, contacts_1.contactsController.getAll);
router.post("/", authenticate, validateBody(contactSchemas.createContactSchema), contacts_1.contactsController.createContact);
router.get("/:contactId", authenticate, isValidId, contacts_1.contactsController.getById);
router.put("/:contactId", authenticate, isValidId, validateBody(contactSchemas.createContactSchema), contacts_1.contactsController.updateById);
router.patch("/:contactId/favorite", authenticate, isValidId, validateBody(contactSchemas.updateFavoriteSchema), contacts_1.contactsController.updateFavorite);
router.delete("/:contactId", authenticate, isValidId, contacts_1.contactsController.deleteById);
exports.default = router;
