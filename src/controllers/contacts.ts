import { Response, NextFunction } from "express";

import { Contact } from "../models/contact";
import { HttpError } from "../helpers";
import { ctrlWrapper } from "../decorators";

import { ICustomRequest } from "../interfaces/ICustomRequest";
import Filter from "../interfaces/IFilter";

const getAll = async (
  req: ICustomRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { _id: owner } = req.user || {};
  const { page = 1, limit = 20, favorite } = req.query;
  const skip = (Number(page) - 1) * Number(limit);

  const filter: Filter = { owner, favorite: favorite === "true" };

  const result = await Contact.find(filter, "-createdAt -updatedAt", {
    skip,
    limit: Number(limit),
  }).populate("owner", "email subscription");

  res.json(result);
};

const getById = async (
  req: ICustomRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);

  if (!result) {
    throw HttpError(404, `Contact with id=${contactId} not found`);
  }

  res.json(result);
};

const createContact = async (
  req: ICustomRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { _id: owner } = req.user || {};
  const result = await Contact.create({ ...req.body, owner });
  res.status(201).json(result);
};

const deleteById = async (
  req: ICustomRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndDelete(contactId);

  if (!result) {
    throw HttpError(404, `Contact with id=${contactId} not found`);
  }

  res.json({
    message: "contact deleted",
  });
};

const updateById = async (
  req: ICustomRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { contactId } = req.params;

  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const updateFavorite = async (
  req: ICustomRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const updateStatusContact = async (contactId: string, favorite: boolean) => {
    return await Contact.findByIdAndUpdate(
      contactId,
      { favorite },
      {
        new: true,
      }
    );
  };

  const { contactId } = req.params;
  const { favorite } = req.body;

  const result = await updateStatusContact(contactId, favorite);

  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

export const contactsController = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  createContact: ctrlWrapper(createContact),
  deleteById: ctrlWrapper(deleteById),
  updateById: ctrlWrapper(updateById),
  updateFavorite: ctrlWrapper(updateFavorite),
};
