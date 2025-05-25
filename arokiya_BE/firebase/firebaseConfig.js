
// //  const firebaseConfig = {
// //   apiKey: "AIzaSyAFEOKUvSYt53GtijaVO4dKbNuW7taxOjQ",
// //   authDomain: "test-clofas.firebaseapp.com",
// //   projectId: "test-clofas",
// //   storageBucket: "test-clofas.appspot.com",
// //   messagingSenderId: "245640526272",
// //   appId: "1:245640526272:web:8442e0d99a66c4c819f025",
// //   measurementId: "G-8STYFK8D6S"
// // };


// // const serviceAccount = {
// //   "type": "service_account",
// //   "project_id": "test-clofas",
// //   "private_key_id": "f6e7b3b817fde4c3e1b69458183bae39db4ba59c",
// //   "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC3GAdQmWCLUR89\neNhAhW9T+Sssv9FI3P9mPH5OhQDeyvG3sVmR7ZSntLCf1MQPFG2kKeWq0yOuXDJ6\nkqrKsHIvD61wlCbPLl7Sqro6uIWwsuMzqfVJosD6Z0k3C7HkaVzwUj4jTIO9ANdq\n6FK1EZvBm16a3pyGHMoQrHRXew42HwmCdSYNdkpkuotU778ges0EgYfpOdW62AlT\nj1vmowjxcbi4ohoUYNnaIwk+1IlnPRYGoNE18SE0ry50cVIgxL9WrpIlkCi1b0w9\nOaogODd7NgkU+hhPLW3AH2LYIduwhwX1Pxshhh9itpbOCSlyarbG5larJlOxYaZZ\niP3JWuLfAgMBAAECggEAQL5j88nQvGL6t4uQeLxWgiy1ajUIJgpT28yfY1ef16iO\n8gRqJnKLIwR/gn1DuQthu+++0Xmo/+KFTRepAlSDhAW4sHsLAC8nA7qwcMxIJhQT\nyHSckqXVNJaqaqcdiCYD4c1LQMMxQHfYNOsjN/kaiUtOGFiIo9nxUBUTbM3MWDFl\n5nwLjFAjIZJU/NjDuH0rUbWi8etqtPCEr9qopjJtGsRfE+uVkjQPAc25tpXPSB/E\nyv0hKEaCDbrza4EQn8ODQUUagv7OWRPxSVWM2QV0zdThgbRhB9Fh+wJVGsNiHMVZ\nj9jy7/VzFPezT6EVzIqOGGJbHxM9mOrF1Mu9NgTqbQKBgQD4UVkTdo/ogNfx9FKb\neb8eIPbL5g3PAr9M6ztgFjI5XG/tIuDS2StBGHqSXGv6RDz0b4RyYUwbMlJei111\nlh8WZ6zn2ryYcqoxD8w1AYOQwfXiZAeB6+/bVet/2zgqr+4H+V3hPWzPqw3Ay8wv\naXkpPW4nrQcSebstG+UtmRxaGwKBgQC8wh0gkKPVJfo+aA50bUwkWVO53mTN872K\nBnkmZSCdVC4fHcgFteiHERu8WQE2wklo8AU7TkWLOphoMyD48FdAMSIW5s/yjhJS\n1TMyEli+yoJHLEBUvEK9C4NZbFtbZnyQw4URB9MtCZbWg2QVIYNLheV7/Qet6hfn\nMrgzH+vmjQKBgQDKgVzJWJlHnTt+YCe2D3Vi1rMt2XFNbwofan7Df5Z53P6SPy1m\nBiEWNyZOkfyk3l1vYjp7JQnx6/nsjG8tY736gZYqhuHi2TAeTqnUWGW4+dTSSY0t\n0QGMt+cUH+0QMuVFr4F2HKfOO8s9fXYI/FUI4sYgqSTpVkjlIqilpQXQHQKBgQCc\neLFaiGw3SgcaannpC5192EqunmujynSJkXomWNhjcx/UjYR9L2F1bbo3NPTrprzh\n7232zpiZpNYoMpIXqmw5e0FOCMHCyQDph3CsBkdoyUibpVQiqfkM6xlULJ3Cs794\n5YtOJdVp1TQj2MFDPweuuG0WjhcqlQ6BiirlvoV4FQKBgC7YnJ7797o8GKXW4NZU\nW5EQFtXOT3oFpraw9oRBEebHfiQiMCeVWBR8YSofg8xy3y63zrn3R1atwrhUCisu\ngAsVgCrAJj5qAj38lNGIR/X/UoGin2q8HXYDTF/LV97fNIuRSSy75pBiYYfiWK/e\nHVG4fVyHv9MLPuO6kf/uc0/M\n-----END PRIVATE KEY-----\n",
// //   "client_email": "firebase-adminsdk-vizrt@test-clofas.iam.gserviceaccount.com",
// //   "client_id": "114256878675738398109",
// //   "auth_uri": "https://accounts.google.com/o/oauth2/auth",
// //   "token_uri": "https://oauth2.googleapis.com/token",
// //   "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
// //   "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-vizrt%40test-clofas.iam.gserviceaccount.com",
// //   "universe_domain": "googleapis.com"
// // }


// var admin = require("firebase-admin");
// // const { getDatabase } = require('firebase-admin/database');

// // var serviceAccount = require('./creds.json');
// admin.initializeApp({
//   // credential: admin.credential.cert(serviceAccount),   // if we going to run the application need to un comment 
//   databaseURL: "https://test-clofas-default-rtdb.firebaseio.com"
// });

// var db = admin.database();

// module.exports ={db}