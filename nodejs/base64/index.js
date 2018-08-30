const data = 'eyJjb3VudHJ5Ijoi5Lit5Zu9IiwicHJvdmluY2UiOiLljJfkuqwiLCJjaXR5Ijoi5rW35reAIiwic2V4IjoxLCJuaWNrbmFtZSI6Iumtj+m+mSIsImhlYWRpbWd1cmwiOiJodHRwOi8vdGhpcmR3eC5xbG9nby5jbi9tbW9wZW4vdmlfMzIvUTBqNFR3R1RmVElBN3NVejJjYXVzN2VzVDQyQkpleWt1UUdXNFN6WjdZM3VrYXpWTHhRWHVpY01uTzRzTmFlU1lnZUV2VklHWEY3Q3g1NkM4SnNVZWhRLzEzMiJ9';

let buf = Buffer.from(data, 'base64');
let str = buf.toString('utf8');

console.log(str);

