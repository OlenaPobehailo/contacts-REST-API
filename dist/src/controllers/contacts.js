"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const { Contact } = require("../models/contact");
const { HttpError } = require("../helpers");
const { ctrlWrapper } = require("../decorators");
const getAll = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id: owner } = req.user;
    const { page = 1, limit = 20, favorite } = req.query;
    const skip = (page - 1) * limit;
    const filter = { owner, favorite: favorite === "true" };
    const result = yield Contact.find(filter, "-createdAt -updatedAt", {
        skip,
        limit,
    }).populate("owner", "email subscription");
    res.json(result);
});
const getById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { contactId } = req.params;
    const result = yield Contact.findById(contactId);
    if (!result) {
        throw HttpError(404, `Contact with id=${contactId} not found`);
    }
    res.json(result);
});
const createContact = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id: owner } = req.user;
    const result = yield Contact.create(Object.assign(Object.assign({}, req.body), { owner }));
    res.status(201).json(result);
});
const deleteById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { contactId } = req.params;
    const result = yield Contact.findByIdAndDelete(contactId);
    if (!result) {
        throw HttpError(404, `Contact with id=${contactId} not found`);
    }
    res.json({
        message: "contact deleted",
    });
});
const updateById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { contactId } = req.params;
    const result = yield Contact.findByIdAndUpdate(contactId, req.body, {
        new: true,
    });
    if (!result) {
        throw HttpError(404, "Not found");
    }
    res.json(result);
});
const updateFavorite = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const updateStatusContact = (contactId, favorite) => __awaiter(void 0, void 0, void 0, function* () {
        return yield Contact.findByIdAndUpdate(contactId, { favorite }, {
            new: true,
        });
    });
    const { contactId } = req.params;
    const { favorite } = req.body;
    const result = yield updateStatusContact(contactId, favorite);
    if (!result) {
        throw HttpError(404, "Not found");
    }
    res.json(result);
});
module.exports = {
    getAll: ctrlWrapper(getAll),
    getById: ctrlWrapper(getById),
    createContact: ctrlWrapper(createContact),
    deleteById: ctrlWrapper(deleteById),
    updateById: ctrlWrapper(updateById),
    updateFavorite: ctrlWrapper(updateFavorite),
};
