"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactsController = void 0;
const contact_1 = require("../models/contact");
const helpers_1 = require("../helpers");
const decorators_1 = require("../decorators");
const getAll = async (req, res, next) => {
    const { _id: owner } = req.user || {};
    const { page = 1, limit = 20, favorite } = req.query;
    const skip = (Number(page) - 1) * Number(limit);
    const filter = { owner, favorite: favorite === "true" };
    const result = await contact_1.Contact.find(filter, "-createdAt -updatedAt", {
        skip,
        limit: Number(limit),
    }).populate("owner", "email subscription");
    res.json(result);
};
const getById = async (req, res, next) => {
    const { contactId } = req.params;
    const result = await contact_1.Contact.findById(contactId);
    if (!result) {
        throw (0, helpers_1.HttpError)(404, `Contact with id=${contactId} not found`);
    }
    res.json(result);
};
const createContact = async (req, res, next) => {
    const { _id: owner } = req.user || {};
    const result = await contact_1.Contact.create({ ...req.body, owner });
    res.status(201).json(result);
};
const deleteById = async (req, res, next) => {
    const { contactId } = req.params;
    const result = await contact_1.Contact.findByIdAndDelete(contactId);
    if (!result) {
        throw (0, helpers_1.HttpError)(404, `Contact with id=${contactId} not found`);
    }
    res.json({
        message: "contact deleted",
    });
};
const updateById = async (req, res, next) => {
    const { contactId } = req.params;
    const result = await contact_1.Contact.findByIdAndUpdate(contactId, req.body, {
        new: true,
    });
    if (!result) {
        throw (0, helpers_1.HttpError)(404, "Not found");
    }
    res.json(result);
};
const updateFavorite = async (req, res, next) => {
    const updateStatusContact = async (contactId, favorite) => {
        return await contact_1.Contact.findByIdAndUpdate(contactId, { favorite }, {
            new: true,
        });
    };
    const { contactId } = req.params;
    const { favorite } = req.body;
    const result = await updateStatusContact(contactId, favorite);
    if (!result) {
        throw (0, helpers_1.HttpError)(404, "Not found");
    }
    res.json(result);
};
exports.contactsController = {
    getAll: (0, decorators_1.ctrlWrapper)(getAll),
    getById: (0, decorators_1.ctrlWrapper)(getById),
    createContact: (0, decorators_1.ctrlWrapper)(createContact),
    deleteById: (0, decorators_1.ctrlWrapper)(deleteById),
    updateById: (0, decorators_1.ctrlWrapper)(updateById),
    updateFavorite: (0, decorators_1.ctrlWrapper)(updateFavorite),
};
