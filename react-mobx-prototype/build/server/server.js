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

	'use strict';
	
	var _express = __webpack_require__(/*! express */ 1);
	
	var _express2 = _interopRequireDefault(_express);
	
	var _bodyParser = __webpack_require__(/*! body-parser */ 2);
	
	var _bodyParser2 = _interopRequireDefault(_bodyParser);
	
	var _morgan = __webpack_require__(/*! morgan */ 3);
	
	var _morgan2 = _interopRequireDefault(_morgan);
	
	var _helmet = __webpack_require__(/*! helmet */ 4);
	
	var _helmet2 = _interopRequireDefault(_helmet);
	
	var _path = __webpack_require__(/*! path */ 5);
	
	var _path2 = _interopRequireDefault(_path);
	
	var _compression = __webpack_require__(/*! compression */ 6);
	
	var _compression2 = _interopRequireDefault(_compression);
	
	var _middleware = __webpack_require__(/*! ./middleware */ 7);
	
	var _dbpromise = __webpack_require__(/*! ./dataservices/dbpromise */ 12);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	//(()=>{
	//    let docs1 = getDocuments(`customers`, {Name: /^ł/i }, undefined, undefined, { Name: 1 }, {_id: 1, Name: 1}); 
	//    let docs2 = getDocuments(`customers`, {Name: /^ż/i }, undefined, undefined, { Name: 1 }, {_id: 1, Name: 1});
	//
	//    Promise.all([docs1, docs2])
	//    .then((dataa) => {
	//        console.log(`Got Data`);
	//
	//        dataa.forEach((data)=>{
	//            data.forEach((element) => {
	//                console.log(element);
	//            });
	//        });
	//        return getDocumentById(`customers`,`58482575fc13ae13f9000256`);
	//    }).then((doc)=>{
	//        console.log(doc);
	//    }).then(()=>{
	//        closeDb();
	//    }).catch((error) => {
	//        console.log(`Error`);
	//        console.log(error);
	//        closeDb();
	//    });
	//})();
	
	
	var app = (0, _express2.default)();
	app.use((0, _morgan2.default)('combined'));
	
	// Define the port to run on
	app.set('port', 80);
	app.set('ip', '0.0.0.0');
	
	// define static paths
	var staticDir = _path2.default.join(process.cwd(), 'build/client');
	console.log('Static dir is: ' + staticDir);
	app.use('/', (0, _helmet2.default)());
	app.use('/', (0, _compression2.default)({
	  level: 9
	}));
	app.use('/', _express2.default.static(staticDir));
	
	// define /api API
	// configure app to use bodyParser()
	// this will let us get the data from a POST
	app.use('/api', (0, _helmet2.default)({
	  noCache: true
	}));
	app.use('/api', (0, _compression2.default)({
	  level: 6
	}));
	app.use('/api', _bodyParser2.default.urlencoded({
	  extended: true
	}));
	app.use('/api', _bodyParser2.default.json());
	
	app.get('/api/mycustomers', _middleware.getCustomersHandler);
	app.get('/api/mycustomers/:id', _middleware.getCustomerByIdHandler);
	
	// Listen for requests
	var server = app.listen(app.get('port'), app.get('ip'), function () {
	  var port = server.address().port;
	  console.log('Listening on port ' + port);
	});

/***/ },
/* 1 */
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ function(module, exports) {

	module.exports = require("express");

/***/ },
/* 2 */
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/***/ function(module, exports) {

	module.exports = require("body-parser");

/***/ },
/* 3 */
/*!*************************!*\
  !*** external "morgan" ***!
  \*************************/
/***/ function(module, exports) {

	module.exports = require("morgan");

/***/ },
/* 4 */
/*!*************************!*\
  !*** external "helmet" ***!
  \*************************/
/***/ function(module, exports) {

	module.exports = require("helmet");

/***/ },
/* 5 */
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ function(module, exports) {

	module.exports = require("path");

/***/ },
/* 6 */
/*!******************************!*\
  !*** external "compression" ***!
  \******************************/
/***/ function(module, exports) {

	module.exports = require("compression");

/***/ },
/* 7 */
/*!****************************************!*\
  !*** ./src/server/middleware/index.js ***!
  \****************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _getCustomersHandler = __webpack_require__(/*! ./getCustomersHandler */ 8);
	
	Object.defineProperty(exports, "getCustomersHandler", {
	  enumerable: true,
	  get: function get() {
	    return _getCustomersHandler.getCustomersHandler;
	  }
	});
	
	var _getCustomerByIdHandler = __webpack_require__(/*! ./getCustomerByIdHandler */ 15);
	
	Object.defineProperty(exports, "getCustomerByIdHandler", {
	  enumerable: true,
	  get: function get() {
	    return _getCustomerByIdHandler.getCustomerByIdHandler;
	  }
	});

/***/ },
/* 8 */
/*!******************************************************!*\
  !*** ./src/server/middleware/getCustomersHandler.js ***!
  \******************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.getCustomersHandler = undefined;
	
	var _queryservice = __webpack_require__(/*! ../dataservices/queryservice */ 9);
	
	var getCustomersHandler = exports.getCustomersHandler = function getCustomersHandler(req, res) {
	    try {
	        (0, _queryservice.getDocuments)('customers', undefined, undefined, undefined, { Name: 1 }, { _id: 1, Name: 1 }).then(function (dataa) {
	            res.json(dataa);
	        }).catch(function (error) {
	            res.json({ error: error });
	        });
	    } catch (error) {
	        res.json({ error: error });
	    }
	};

/***/ },
/* 9 */
/*!*************************************************!*\
  !*** ./src/server/dataservices/queryservice.js ***!
  \*************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.getDocumentById = exports.getDocuments = exports.defaultCollation = undefined;
	
	var _promise = __webpack_require__(/*! babel-runtime/core-js/promise */ 10);
	
	var _promise2 = _interopRequireDefault(_promise);
	
	var _mongodb = __webpack_require__(/*! mongodb */ 11);
	
	var _dbpromise = __webpack_require__(/*! ./dbpromise */ 12);
	
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
	
	var getDocumentById = exports.getDocumentById = function getDocumentById(collectionName, id) {
	    return new _promise2.default(function (resolve, reject) {
	        try {
	            if (!id || id === '') {
	                throw new Error('The id parameter is mandatory');
	            }
	            getDocuments(collectionName, { _id: new _mongodb.ObjectID(id) }).then(function (docs) {
	                if (docs && docs.length === 1) {
	                    resolve(docs[0]);
	                } else {
	                    reject(new Error('The document wuth id: ' + id + ' doesn\'t exist'));
	                }
	            }).catch(function (error) {
	                reject(error);
	            });
	        } catch (error) {
	            reject(error);
	        }
	    });
	};

/***/ },
/* 10 */
/*!************************************************!*\
  !*** external "babel-runtime/core-js/promise" ***!
  \************************************************/
/***/ function(module, exports) {

	module.exports = require("babel-runtime/core-js/promise");

/***/ },
/* 11 */
/*!**************************!*\
  !*** external "mongodb" ***!
  \**************************/
/***/ function(module, exports) {

	module.exports = require("mongodb");

/***/ },
/* 12 */
/*!**********************************************!*\
  !*** ./src/server/dataservices/dbpromise.js ***!
  \**********************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.closeDb = undefined;
	
	var _freeze = __webpack_require__(/*! babel-runtime/core-js/object/freeze */ 13);
	
	var _freeze2 = _interopRequireDefault(_freeze);
	
	var _promise = __webpack_require__(/*! babel-runtime/core-js/promise */ 10);
	
	var _promise2 = _interopRequireDefault(_promise);
	
	var _mongodb = __webpack_require__(/*! mongodb */ 11);
	
	var _config = __webpack_require__(/*! ../config */ 14);
	
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
	
	(0, _freeze2.default)(db);
	exports.default = db;

/***/ },
/* 13 */
/*!******************************************************!*\
  !*** external "babel-runtime/core-js/object/freeze" ***!
  \******************************************************/
/***/ function(module, exports) {

	module.exports = require("babel-runtime/core-js/object/freeze");

/***/ },
/* 14 */
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

/***/ },
/* 15 */
/*!*********************************************************!*\
  !*** ./src/server/middleware/getCustomerByIdHandler.js ***!
  \*********************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.getCustomerByIdHandler = undefined;
	
	var _queryservice = __webpack_require__(/*! ../dataservices/queryservice */ 9);
	
	var getCustomerByIdHandler = exports.getCustomerByIdHandler = function getCustomerByIdHandler(req, res) {
	    try {
	        var customerId = req.params.id;
	        console.log('Id is: ' + customerId);
	
	        (0, _queryservice.getDocumentById)('customers', customerId).then(function (data) {
	            res.json(data);
	        }).catch(function (error) {
	            res.status(500).send('Internal Server Error: ' + error); //500 Internal Server Error
	        });
	    } catch (error) {
	        res.status(500).send('Internal Server Error: ' + error); //500 Internal Server Error
	    }
	};

/***/ }
/******/ ]);
//# sourceMappingURL=server.js.map