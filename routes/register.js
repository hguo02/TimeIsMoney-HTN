const express = require("express");
const { builtinModules } = require("module");
const router = express.Router();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const flash = require('flash');
var { body, validationResult } = require('express-validator');
// api.use(expressValidator())
// var api = express.Router();

let User = require("../models/user").user;
const { route } = require("./records");
router.get('/', checkNotAuthenticated, (req, res) => {
    res.render('register');
});


//app.use(bodyParser.urlencoded({ extended: false }));
//pvar urlencodedParser = bodyParser.urlencoded({ extended: false })

router.post('/', [
    body('name')
        .isLength({ min: 1 })
        .withMessage('Name is required'),
    body('username')
        .isLength({ min: 1 })
        .withMessage('Username is required')
        .custom(async (value, { req, loc, path }) => {
            const existingUsers = await User.find({ 'username': value });
            if (existingUsers.length > 0) {
                throw new Error("Username already exists");
            } else {
                return value;
            }
        }),
    body('password')
        .isLength({ min: 1 })
        .withMessage('Password is required')
        .isLength({ min: 6 })
        .withMessage('Password must be atleast 6 characters')
        .custom((value, { req, loc, path }) => {
            if (value !== req.body.password2) {
                throw new Error("Passwords don't match");
            } else {
                return value;
            }
        }),
    body('password2')
        .isLength({ min: 1 })
        .withMessage('Confirm password is required')
],
    async (req, res) => {

        const name = req.body.name;
        const username = req.body.username;
        const password = req.body.password;
        const password2 = req.body.password2;


        let errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.render('register', { alert: errors.array() });
        } else {
            const newUser = new User({
                name: req.body.name,
                username: req.body.username,
                password: await bcrypt.hash(password, 10),
                goals: [],
                log: []
            });
            await newUser.save();

            //console.log(await User.findByID(newUser.id));
            //flash('success', 'You are now registered!')
            res.redirect('login');
        }



    });


function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/profile')
    }
    next()
}
module.exports = router;

// Query {
//     _mongooseOptions: {},
//     _transforms: [],
//     _hooks: Kareem { _pres: Map(0) {}, _posts: Map(0) {} },
//     _executionCount: 0,
//     mongooseCollection: NativeCollection {
//       collection: Collection { s: [Object] },
//       Promise: [Function: Promise],
//       _closed: false,
//       opts: {
//         schemaUserProvidedOptions: {},
//         capped: false,
//         autoCreate: undefined,
//         Promise: [Function: Promise],
//         '$wasForceClosed': undefined
//       },
//       name: 'users',
//       collectionName: 'users',
//       conn: NativeConnection {
//         base: [Mongoose],
//         collections: [Object],
//         models: [Object],
//         config: [Object],
//         replica: false,
//         options: null,
//         otherDbs: [],
//         relatedDbs: {},
//         states: [Object: null prototype],
//         _readyState: 1,
//         _closeCalled: false,
//         _hasOpened: true,
//         plugins: [],
//         id: 0,
//         _listening: false,
//         _connectionString: 'mongodb+srv://zesponge:marioisgay@cluster0.srzy2.mongodb.net/<dbname>?retryWrites=true&w=majority',
//         _connectionOptions: [Object],
//         client: [MongoClient],
//         '$initialConnection': [Promise],
//         name: '<dbname>',
//         host: 'cluster0-shard-00-01.srzy2.mongodb.net',
//         port: 27017,
//         user: 'zesponge',
//         pass: 'marioisgay',
//         db: [Db]
//       },
//       queue: [],
//       buffer: false,
//       emitter: EventEmitter {
//         _events: [Object: null prototype] {},
//         _eventsCount: 0,
//         _maxListeners: undefined,
//         [Symbol(kCapture)]: false
//       }
//     },
//     model: Model { User },
//     schema: Schema {
//       obj: { name: [Object], username: [Object], password: [Object] },
//       paths: {
//         name: [SchemaString],
//         username: [SchemaString],
//         password: [SchemaString],
//         _id: [ObjectId],
//         __v: [SchemaNumber]
//       },
//       aliases: {},
//       subpaths: {},
//       virtuals: { id: [VirtualType] },
//       singleNestedPaths: {},
//       nested: {},
//       inherits: {},
//       callQueue: [],
//       _indexes: [],
//       methods: {},
//       methodOptions: {},
//       statics: {},
//       tree: {
//         name: [Object],
//         username: [Object],
//         password: [Object],
//         _id: [Object],
//         __v: [Function: Number],
//         id: [VirtualType]
//       },
//       query: {},
//       childSchemas: [],
//       plugins: [ [Object], [Object], [Object], [Object], [Object], [Object] ],
//       '$id': 2,
//       s: { hooks: [Kareem] },
//       _userProvidedOptions: {},
//       options: {
//         typePojoToMixed: true,
//         typeKey: 'type',
//         id: true,
//         noVirtualId: false,
//         _id: true,
//         noId: false,
//         validateBeforeSave: true,
//         read: null,
//         shardKey: null,
//         autoIndex: null,
//         minimize: true,
//         discriminatorKey: '__t',
//         optimisticConcurrency: false,
//         versionKey: '__v',
//         capped: false,
//         bufferCommands: true,
//         strictQuery: false,
//         strict: true,
//         pluralization: true
//       },
//       '$globalPluginsApplied': true,
//       _requiredpaths: [ 'password', 'username', 'name' ]
//     },
//     op: 'find',
//     options: {},
//     _conditions: {},
//     _fields: undefined,
//     _update: undefined,
//     _path: undefined,
//     _distinct: undefined,
//     _collection: NodeCollection {
//       collection: NativeCollection {
//         collection: [Collection],
//         Promise: [Function: Promise],
//         _closed: false,
//         opts: [Object],
//         name: 'users',
//         collectionName: 'users',
//         conn: [NativeConnection],
//         queue: [],
//         buffer: false,
//         emitter: [EventEmitter]
//       },
//       collectionName: 'users'
//     },
//     _traceFunction: undefined,
//     '$useProjection': true
//   }
