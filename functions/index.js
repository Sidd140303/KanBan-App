/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });


const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

const { onDocumentCreated, onDocumentDeleted } = require("firebase-functions/v2/firestore");
const { getFirestore, FieldValue } = require("firebase-admin/firestore");
const { initializeApp } = require("firebase-admin/app");


initializeApp();
exports.createBoardsData = onDocumentCreated('users/{uid}/boards/{boardId}', async event => {
    const { uid, boardId } = event.params
    const firestore = getFirestore()
    return await firestore.doc(`users/${uid}/boardsData/${boardId}`).set({
        tabs: {
            todos: [],
            inProgress: [],
            completed: []
        },
        lastUpdated: FieldValue.serverTimestamp(),
    })
})
exports.deleteBoardData = onDocumentDeleted('users/{uid}/boards/{boardId}', async event => {
    const { uid, boardId } = event.params
    const firestore = getFirestore()
    return await firestore.doc(`users/${uid}/boardsData/${boardId}`).delete()
})


