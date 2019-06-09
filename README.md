# Alexa-Custom-SDK-Implementation
This code is written in node and includes the Alexa SDK for webhook implementation which can be utilised by alexa for custom responses and implementation

# Use - steps
  1.  git clone the repo 'https://github.com/Niranjan24491/Alexa-Custom-SDK-Implementation.git'
  2.  run npm install
  3.  node index.js

# What is this used for
This code is a custom implementation of alexa-node SDK. We can write custom intents in alexa app and make API calls to this app and define our own responses. This architecture gives you the flexibility to add databases and other node modules for processing of data and return the response to Alexa device. This ready made code can be hosted in any https server and can be called from Alexa. The code also has alexa-verifier which is used during prod deployment which includes verification of API as one of the process. The whole code can also be included as Lamda function which can be hosted in AWS with minimal changes

