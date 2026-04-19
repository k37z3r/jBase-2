/**
 * @file src/modules/http/index.ts
 * @version 2.0.2
 * @since 2.0.0
 * @license GPL-3.0-or-later
 * @copyright Sven Minio 2026
 * @author Sven Minio <https://sven-minio.de>
 * @category HTTP
 * @description
 * * Central entry point for HTTP requests. Aggregates GET and POST methods.
 * @requires ./get
 * * HTTP GET methods (get, getText).
 * @requires ./post
 * * HTTP POST methods.
 */

import * as getMethods from './get';
import * as postMethods from './post';

/**
 * * The central HTTP client of the framework. Aggregates all HTTP methods (GET, POST, etc.) into a unified interface. Acts as a wrapper around the native `fetch` API to simplify JSON parsing, error handling, and typing.
 */
export const http = {
    ...getMethods,
    ...postMethods
};