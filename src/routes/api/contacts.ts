import express from "express";
import { contactsController } from "../../controllers/contacts";

import { validateBody } from "../../decorators";
import { contactSchemas } from "../../validators";
import { isValidId, authenticate } from "../../middlewares";

const router = express.Router();

router.get("/", authenticate, contactsController.getAll);

router.post(
  "/",
  authenticate,
  validateBody(contactSchemas.createContactSchema),
  contactsController.createContact
);

router.get("/:contactId", authenticate, isValidId, contactsController.getById);

router.put(
  "/:contactId",
  authenticate,
  isValidId,
  validateBody(contactSchemas.createContactSchema),
  contactsController.updateById
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  validateBody(contactSchemas.updateFavoriteSchema),
  contactsController.updateFavorite
);

router.delete(
  "/:contactId",
  authenticate,
  isValidId,
  contactsController.deleteById
);

export default router;
