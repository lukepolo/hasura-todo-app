This is just a simple test to see how hasura webhooks work and should not be used 
in production.

## Setup
1. Run ```docker-compose up```
2. Create one user record 
3. Create one settings record

### Routes
```api/me```
Gets the users email

```api/settings```
Gets settings available if the user is a super user.

### Regular User JWT 
 
```eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoidXNlciIsIm5hbWUiOiJMdWtlIFBvbGljaW5za2kiLCJ1c2VyX2lkIjoxfQ.2DaeUoXSqYAVp8PsJjEp9SFaCfG6JgFoKp8mkGCbMAs```

### Super User JWT

```eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoic3VwZXItdXNlciIsIm5hbWUiOiJMdWtlIFBvbGljaW5za2kiLCJ1c2VyX2lkIjoxfQ.U64NrsmCzKms4EkiKghE6l71lrFxtDHokpXy5hMDh-8```

#### Known Bugs
* Settings Request will be a 200 if the user is a regular user (but without data)
* I am sure there are more, threw this thing together pretty quickly just to demo
