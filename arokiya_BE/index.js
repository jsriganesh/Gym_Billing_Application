const express = require('express')
const app = express()
const mongoos = require('mongoose')
app.use(express.json()) // Middleware
const port = 4004
const cors = require('cors');

app.use(cors({
  origin: 'http://localhost:3000',  // Allow requests from your local frontend
}));


// var admin = require("firebase-admin");
// var serviceAccount = require('./firebase/creds.json');
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://test-clofas-default-rtdb.firebaseio.com"
// });

const dbName = 'gym-dg'
const uri = "mongodb+srv://jsriganesh535:clo_123@clofas.xtsjvzp.mongodb.net/gym-db?retryWrites=true&w=majority";

// const Category = require('./models/membersModel');
// const Item = require('./models/notusing_itemModel');

mongoos.connect(uri).then((res) => {
    console.log('Data base connected ☺️')
    app.listen(port, () => {
        console.log('server is running in 4004 port')
    })
}).catch(error => console.log('error:', error))



const membersController = require('./controllers/membersController');
const paymentHistoryController = require('./controllers/paymentHistoryController');
const planController = require('./controllers/planController');
const renewPlanController = require('./controllers/renewPlanController');
const dietPlanController = require('./controllers/dietPlanController');
// const paymentRepotyChartController = require('./controllers/not-using-paymentReportChartController');

// const itemController = require('./controllers/notusing_itemController');
app.use('/members', membersController);
app.use('/plan', planController);
app.use('/paymentHistory', paymentHistoryController);
app.use('/renewplan',renewPlanController );
app.use('/dietPlan',dietPlanController );
// app.use('/paymentReportChar',paymentRepotyChartController );

// app.use('/item', itemController);

// const  listAllUsers=()=> {
//     //REF DOC // https://stackoverflow.com/questions/46939765/retrieving-a-list-of-users-who-have-registered-using-firebase-auth
//     admin.auth().listUsers(1000)
//       .then(function(listUsersResult) {
//         listUsersResult.users.forEach(function(userRecord) {
//           console.log('user****', userRecord.toJSON().providerData);
//         });
//         if (listUsersResult.pageToken) {
//           listAllUsers(listUsersResult.pageToken);
//         }
//       })
//       .catch(function(error) {
//         console.log('Error listing users:', error);
//       });
//   }
  
//   listAllUsers()