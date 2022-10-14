# Vouch-Digital

## Commands to run the server:

### For Client:
1) Open the folder
2) cd Vouch-Digital
3) cd client
4) npm start

### For Server:
1) Open the folder
2) cd Vouch-Digital
3) cd server
4) npm start

## PORT:
1) Client -> http://localhost:3000
2) Server -> http://localhost:3001

## Additional info:
### To add a new admin
1) Open postman
2) make it a 'POST' request
3) Put the url as -> http://localhost:3001/api/addNewAdmin
4) Choose body to pass the data with request
5) Inside body, choose 'raw' and data type as 'JSON' from the list
6) Please keep the secret key in the below object same as it is. You can chage all other key's value except secret. But, all the keys must be present and values is required for all of it
7) Example structure of data to be passed in like below 
{
    "userName" : "David",
    "password" : "hiThere676",
    "userMail" : "david@thevouch.com",
    "secret" : "donttellanyone",
}
