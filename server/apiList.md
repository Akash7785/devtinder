# DevTinder API

## authRoute

- POST/signup ✅
- POST/login ✅
- POST/logout ✅

## profileRoute

- GET/profile/view ✅
- PATCH/profile/edit ✅
- DELETE/profile/delete ✅
- PTACH/profile/resetPassword ✅

## connectionRequestRouter

- POST/request/send/:status/:userId
- POST/request/review/:status/:requestId

## userRouter

- GET/user/requests/recieved
- GET/user/connection
- GET/user/feed // Gets you the profiles of other users on platform

> ## Status:

> > `ignored, interested, accepeted, rejected`
