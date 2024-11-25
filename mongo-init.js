db = db.getSiblingDB("LaFresca_DB");

db.createUser({
    user: "la-fresca",
    pwd: "1234",
    roles: [
        {
            role: "readWrite",
            db: "LaFresca_DB"
        }
    ]
});

db.createCollection("User");

db.User.insertOne({
    "_id": ObjectId("669f54dcef9be4740c34768c"),
    "FirstName": "Super",
    "LastName": "Admin",
    "Email": "admin@admin.com",
    "Password": "$2a$10$qjvnaQ1ouiyHWAOAe492LeOsvE93O8ak3gPyBWTSKe1KSwVX/HM0K",
    "PhoneNumber": "string",
    "Address": "string",
    "Role": "ADMIN",
    "CafeId": "string",
    "Deleted": 0,
    "username": "admin@admin.com",
    "_class": "org.lafresca.lafrescabackend.Models.User"
});
