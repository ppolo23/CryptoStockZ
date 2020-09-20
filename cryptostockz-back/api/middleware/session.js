// sentTokenCookie creates a cookie which expires after one day
const sendUserIdCookie = (userId, res) => {
    // Our token expires after one day
    const oneDayToSeconds = 24 * 60 * 60;
    res.cookie('userId', userId,  
    { maxAge: oneDayToSeconds,
    // You can't access these tokens in the client's javascript
        httpOnly: true,
        // Forces to use https in production
        secure: process.env.NODE_ENV === 'production'? true: false
        });
};


// returns an object with the cookies' name as keys
const getAppCookies = (req) => {
    // We extract the raw cookies from the request headers
    const rawCookies = req.headers.cookie.split('; ');
    // rawCookies = ['myapp=secretcookie, 'analytics_cookie=beacon;']

    const parsedCookies = {};
    rawCookies.forEach(rawCookie=>{
    const parsedCookie = rawCookie.split('=');
    // parsedCookie = ['myapp', 'secretcookie'], ['analytics_cookie', 'beacon']
        parsedCookies[parsedCookie[0]] = parsedCookie[1];
    });
    return parsedCookies;
};

// Returns the value of the userId cookie
const getUserId = (req, res) =>  getAppCookies(req, res)['userId'];


// Our application store is stateful and uses a variable
const sessions = {};

const sessionHandler = (req, res, next)=> {
    userId = getUserId(req, res);
    // If we don't have a userId or the session manager doesn't recognize the userId
    // then we create a new one one
    if(!userId || !sessions[userId]) {
        // this should create a time based unique identifier
        userId = uuidv1();
        sessions[userId] = {};
        // Clearing the cookies in case the session userId is not valid
        res.clearCookie('userId');
        // Returning the newly assigned cookie value
        sendUserIdCookie(userId, res);
    }

    req.session = sessions[userId];
    // Now in our route handlers you'll have session information in req.session
    next();
};

const session = {
    sendUserIdCookie: sendUserIdCookie,
    getAppCookies: getAppCookies,
    getUserId: getUserId,
    sessionHandler: sessionHandler
}

module.exports = session