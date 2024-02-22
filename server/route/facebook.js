const express = require("express");
const router = express.Router();
const { valToken } = require("../middleware/auth");
const controller = require("../controller/facebook");

router.get("/", controller.authRedirect);

router.get("/callback", controller.authCallback);

router.get("/webhook", controller.webhookGet);

router.post("/webhook", controller.webhookPost);

router.get("/deleteIntegration", valToken, controller.deleteIntegration);

router.get("/conversations", valToken, controller.conversations);

router.post("/indieConversations", valToken, controller.indieConversation);

router.post("/sendMessage", valToken, controller.sendMessage);

module.exports = router;
