/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!*****************************!*\
  !*** ./src/server/index.js ***!
  \*****************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _promise = __webpack_require__(/*! babel-runtime/core-js/promise */ 1);
	
	var _promise2 = _interopRequireDefault(_promise);
	
	var _queryservice = __webpack_require__(/*! ./dataservices/queryservice */ 2);
	
	var _dbpromise = __webpack_require__(/*! ./dataservices/dbpromise */ 4);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	console.log("It's alive");
	
	(function () {
	    var docs1 = (0, _queryservice.getDocuments)("customers", { Name: /^ł/i }, undefined, undefined, { Name: 1 }, { _id: 1, Name: 1 });
	    var docs2 = (0, _queryservice.getDocuments)("customers", { Name: /^ż/i }, undefined, undefined, { Name: 1 }, { _id: 1, Name: 1 });
	
	    _promise2.default.all([docs1, docs2]).then(function (dataa) {
	        console.log("Got Data");
	
	        dataa.forEach(function (data) {
	            data.forEach(function (element) {
	                console.log(element);
	            });
	        });
	
	        (0, _dbpromise.closeDb)();
	    }).catch(function (error) {
	        console.log("Error");
	        console.log(error);
	        (0, _dbpromise.closeDb)();
	    });
	})();
	
	console.log("It's dead");

/***/ },
/* 1 */
/*!************************************************!*\
  !*** external "babel-runtime/core-js/promise" ***!
  \************************************************/
/***/ function(module, exports) {

	module.exports = require("babel-runtime/core-js/promise");

/***/ },
/* 2 */
/*!*************************************************!*\
  !*** ./src/server/dataservices/queryservice.js ***!
  \*************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.getDocumentById = exports.getDocuments = exports.defaultCollation = undefined;
	
	var _promise = __webpack_require__(/*! babel-runtime/core-js/promise */ 1);
	
	var _promise2 = _interopRequireDefault(_promise);
	
	var _mongodb = __webpack_require__(/*! mongodb */ 3);
	
	var _dbpromise = __webpack_require__(/*! ./dbpromise */ 4);
	
	var _dbpromise2 = _interopRequireDefault(_dbpromise);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var defaultCollation = exports.defaultCollation = {
	    'locale': 'pl',
	    strength: 2,
	    caseLevel: false
	};
	
	var getDocuments = exports.getDocuments = function getDocuments(collectionName, filter, limit, skip, sort, project) {
	    return new _promise2.default(function (resolve, reject) {
	        try {
	            (function () {
	                var db = void 0;
	
	                if (!collectionName || collectionName === '') {
	                    throw new Error('collectionName not specified');
	                }
	
	                _dbpromise2.default.then(function (database) {
	                    if (!database) {
	                        throw new Error('Not connected to the Mongodb');
	                    }
	                    db = database;
	                    return db.listCollections({
	                        name: collectionName
	                    }).toArray();
	                }).then(function (collections) {
	                    if (collections.length !== 1) {
	                        throw new Error('Collection ' + collectionName + ' doesn\'t exist');
	                    }
	                    return db.collection(collectionName);
	                }).then(function (collection) {
	                    return collection.find(filter || {}, undefined, {
	                        collation: defaultCollation
	                    });
	                }).then(function (cursor) {
	                    return cursor;
	                }).then(function (cursor) {
	                    if (limit) cursor = cursor.limit(limit);
	                    return cursor;
	                }).then(function (cursor) {
	                    if (skip) cursor = cursor.skip(skip);
	                    return cursor;
	                }).then(function (cursor) {
	                    if (project) cursor = cursor.project(project);
	                    return cursor;
	                }).then(function (cursor) {
	                    if (sort) cursor = cursor.sort(sort, undefined, {
	                        collation: defaultCollation
	                    });
	                    return cursor;
	                }).then(function (cursor) {
	                    var data = cursor.toArray();
	                    return data;
	                }).then(function (data) {
	                    resolve(data);
	                }).catch(function (error) {
	                    reject(error);
	                });
	            })();
	        } catch (error) {
	            reject(error);
	        }
	    });
	};
	
	var getDocumentById = exports.getDocumentById = function getDocumentById(db, collectionName, id) {
	    return getDocuments(db, collectionName, {
	        _id: new _mongodb.ObjectID(id)
	    });
	};

/***/ },
/* 3 */
/*!**************************!*\
  !*** external "mongodb" ***!
  \**************************/
/***/ function(module, exports) {

	module.exports = require("mongodb");

/***/ },
/* 4 */
/*!**********************************************!*\
  !*** ./src/server/dataservices/dbpromise.js ***!
  \**********************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.closeDb = undefined;
	
	var _promise = __webpack_require__(/*! babel-runtime/core-js/promise */ 1);
	
	var _promise2 = _interopRequireDefault(_promise);
	
	var _mongodb = __webpack_require__(/*! mongodb */ 3);
	
	var _config = __webpack_require__(/*! ../config */ 5);
	
	var _config2 = _interopRequireDefault(_config);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var getDb = function getDb() {
	    return new _promise2.default(function (resolve, reject) {
	        try {
	            resolve(_mongodb.MongoClient.connect(_config2.default.mongodburl));
	        } catch (error) {
	            reject(error);
	        }
	    });
	};
	
	var db = getDb();
	
	var closeDb = exports.closeDb = function closeDb() {
	    db.then(function (database) {
	        if (database) {
	            database.close();
	        }
	    });
	};
	
	exports.default = db;

/***/ },
/* 5 */
/*!************************************!*\
  !*** ./src/server/config/index.js ***!
  \************************************/
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var config = {
	    mongodburl: "mongodb://localhost:27017/Maryensztadt"
	};
	
	exports.default = config;

/***/ }
/******/ ]);
//# sourceMappingURL=server.js.map