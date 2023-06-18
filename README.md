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


## Supported devices
* Dishwasher = 1,
* GarageDoor = 2,
* LivingRoomLights = 3

this use the PUT method so you will need a body:
for assign this maps to src/enums/supported-device.enum.ts:
`{
  "supported_device": 2
}`

for toggle this maps to a true/false boolean its generic will map to OPEN/CLOSE etc:
`{
  "option": true
}`

for undo you don't require a body


### Found this task really enjoyable :D
