'use strict';

/**
 * e-book service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::e-book.e-book');
