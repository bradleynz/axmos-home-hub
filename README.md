# Getting Started
Welcome to aXmos the new way to manage your connected home devices

### Design Patterns
The following design patterns were used:
- SOLID
- Singleton

### Architectural patterns
- CQRS - Command Query Response Segregation

### Diagrams used to explain decisions
Please find the design diagrams in the diagrams folder

### Design Decisions
* Platform - to build this API out I decided to use nest JS it provides a great framework to build highly scalable applications
* Exception Handling - added some exception handling based on edge cases
* CQRS - used this pattern to seperate logic into smaller single responsibility classes
* Datastore - implemented a static in memory datastore as the requirement mentions we don't require persistant storage
* Seeding - I have created a seeder to seed the initial data, this includes a simulation of assign, toggle, and undo
* Testing - Implemented some unit tests for the slot controller
* Was considering using an onion architecture as it creates good seperation but this would be over engineered for this design.
* Last slot action - I have implemented last slot action only, it would require some sort of entity tracking in the future.
* Slots - slots are linked to supported devices
* No UI - If I was to build this out with a UI I would use React and make modular components
* Option value gets set when toggling slots
* Added logger


### Future considerations
* Extend testing coverage
* Event sourcing
* Docker compatibility and create IaC for easier deployment to Cloud
* Utlise an API proxy in cloud environment

### Starting the application
run `npm install`
run `npm start`

to run the unit tests run `npm run test`

browse to http://localhost:3000/ I have setup swagger for ease of use

If you call http://localhost:3000/slots you can see all the seeded slots,
If you grab a slot id you can then call http://localhost:3000/slots/{slotId},
You can then perform actions using these endpoints: 
http://localhost:3000/slots/{slotId}/assign 
http://localhost:3000/slots/{slotId}/toggle 
http://localhost:3000/slots/{slotId}/undo

## Add more slots
http://localhost:3000/slots/add - POST - no need to specify a body

## Seeded slots
slotIds = [1, 2, 3]
When calling a GET request you can use one of these IDs

## Supported devices
* Dishwasher = 1,
* GarageDoor = 2,
* LivingRoomLights = 3

To assign a slot use the following body - this method uses PUT:
`{
  "supported_device": 2
}`

To toggle a slot use the following body - this method uses PUT:
`{
  "option": true
}`

for undo you don't require a body

## Diagrams
### UI Flow
![alt text](https://github.com/bradleynz/axmos-home-hub/blob/main/diagrams/ui-flow.png)
### End to End Flow
![alt text](https://github.com/bradleynz/axmos-home-hub/blob/main/diagrams/end-to-end-flow.png)
### Datastore Flow
![alt text](https://github.com/bradleynz/axmos-home-hub/blob/main/diagrams/data-store-flow.png)
### CQRS explained in context
![alt text](https://github.com/bradleynz/axmos-home-hub/blob/main/diagrams/cqrs-explained-in-context.png)
