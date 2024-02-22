const axios = require("axios");
const User = require("../model/user");

const facebookAppId = process.env.FACEBOOK_APP_ID;
const facebookAppSecret = process.env.FACEBOOK_APP_SECRET;
const redirectUri =
  "https://7468-223-178-99-249.ngrok-free.app/facebook/callback";
const verificationToken = process.env.SECRET_KEY;

exports.authRedirect = (req, res) => {
  const { userId } = req.query;

  const authUrl = `https://www.facebook.com/v19.0/dialog/oauth?client_id=${facebookAppId}&redirect_uri=${redirectUri}&state=${userId}&scope=public_profile,email,pages_messaging,pages_messaging_subscriptions,pages_manage_metadata`;

  res.redirect(authUrl);
};

exports.authCallback = async (req, res) => {
  const { code } = req.query;

  const { io } = req.app;

  const { state } = req.query;

  try {
    // Exchange the code for an access token
    const response = await axios.get(
      "https://graph.facebook.com/v13.0/oauth/access_token",
      {
        params: {
          client_id: facebookAppId,
          client_secret: facebookAppSecret,
          redirect_uri: redirectUri,
          code,
        },
      }
    );

    const { access_token, expires_in } = response.data;

    const newResponse = await axios.get(
      "https://graph.facebook.com/v13.0/me/accounts",
      {
        params: {
          access_token: access_token,
        },
      }
    );

    const pages = newResponse.data.data;

    const newResponse2 = await axios.get(
      "https://graph.facebook.com/v13.0/me",
      {
        params: {
          access_token: access_token,
          fields: "id,picture", // Specify the fields you want to retrieve
        },
      }
    );

    const userData = newResponse2.data;

    const profilePictureUrl = userData.picture.data.url;

    const facebook = {
      access_token,
      status: true,
      id: userData.id,
      profileImg: profilePictureUrl,
      page: {
        access_token: pages[0].access_token,
        id: pages[0].id,
        name: pages[0].name,
      },
      messages: {},
    };

    const user = await User.findOne({ _id: state });

    user.facebook = facebook;
    await user.save();

    io.emit("auth_done", {
      pageName: pages[0].name,
    });

    res.send("Successfully authenticated. You can close this window.");
  } catch (error) {
    console.error("Error exchanging code for access token:", error);
    res.status(500).send("Error during authentication.");
  }
};

exports.webhookGet = (req, res) => {
  const hubChallenge = req.query["hub.challenge"];
  const hubMode = req.query["hub.mode"];

  if (
    hubMode === "subscribe" &&
    req.query["hub.verify_token"] === verificationToken
  ) {
    res.status(200).send(hubChallenge);
  } else {
    res.sendStatus(403);
  }
};

exports.webhookPost = (req, res) => {
  const body = req.body;

  const { io } = req.app;

  if (body.object === "page") {
    body.entry.forEach(async (entry) => {
      const webhookEvent = entry.messaging[0];

      const user = await User.findOne({
        "facebook.page.id": webhookEvent.recipient.id,
      });

      const newMessage = {
        timestamp: webhookEvent.timestamp,
        message: webhookEvent.message.text,
        type: "received",
      };

      io.emit("new_message", { newMessage, id: webhookEvent.sender.id });

      if (user.facebook.messages[webhookEvent.sender.id]) {
        user.facebook.messages[webhookEvent.sender.id].push(newMessage);
      } else {
        user.facebook.messages[webhookEvent.sender.id] = [newMessage];
      }

      user.markModified("facebook.messages");
      await user.save();
    });
  }

  res.status(200).send("EVENT_RECEIVED");
};

exports.deleteIntegration = async (req, res) => {
  try {
    const { user_id } = req.userData;

    const user = await User.findOne({ _id: user_id });

    user.facebook.status = false;
    user.markModified("facebook");
    user.save();

    res.status(200).json({ success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false });
  }
};

exports.conversations = async (req, res) => {
  try {
    const { user_id } = req.userData;

    const user = await User.findOne({ _id: user_id }).lean();

    const messages = user.facebook.messages;

    const conversations = {};

    for (let senderId of Object.keys(messages)) {
      const response = await axios.get(
        `https://graph.facebook.com/v19.0/${senderId}`,
        {
          params: {
            fields: "name,picture,email",
            access_token: user.facebook.page.access_token,
          },
        }
      );

      const messagesLength = messages[senderId].length;

      conversations[senderId] = {
        name: response.data.name,
        email: response.data.email,
        lastMessage: messages[senderId][messagesLength - 1],
      };
    }

    res.status(200).json({ success: true, conversations });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false });
  }
};

exports.indieConversation = async (req, res) => {
  try {
    const { user_id } = req.userData;

    const { conversationId } = req.body;

    const user = await User.findOne({ _id: user_id });

    const messages = user.facebook.messages[conversationId];

    res.status(200).json({ success: true, messages });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false });
  }
};

exports.sendMessage = async (req, res) => {
  try {
    const { user_id } = req.userData;

    const { conversationId, newMessage } = req.body;

    const user = await User.findOne({ _id: user_id });

    await axios.post(
      "https://graph.facebook.com/v13.0/me/messages",
      {
        recipient: {
          id: conversationId,
        },
        message: {
          text: newMessage.message,
        },
      },
      {
        params: {
          access_token: user.facebook.page.access_token,
        },
      }
    );

    await user.facebook.messages[conversationId].push(newMessage);
    user.markModified("facebook.messages");
    user.save();

    res.status(200).json({ success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false });
  }
};
