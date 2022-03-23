#Node Setup By Taqi

# start 
```
cd ideal-api && npm start
```
<h3>to lunk commands<h3>
```
npm link
```
<h3>custom commands list</h3>

```frk```<br>
run this command in cmd
<h3>to add module</h3>
run
```frk-addmodule --name=moduleName```
<h3>to add auth</h3>
run
```frk-addauth```
<h3>to run sequelize in module folders</h3>
run sequelize commands and follow instructions to add in module 

# add route
add an object in core/route-config.json

#add route in module
got to module folder route.json and add the object
example : 
```[{
        "method":"get",
        "path":"/registerForm",
        "controller":"user.registerForm",
        "middlewares":[],
        "roles":[]
    }]
    ```
#to add global route from module add global : true field in that route object of route.json

# add controllers in controllers/
if any new controller file needed import it in route.js.
to bind controller with route add it in core/route-config.json 

# add middleware in middlewares/
if any new middleware file needed import it in route.js.
to bind middlewares with route add it in core/route-config.json  

<h3>to accses services<h3>
```
framework.middlewares.folder.function
``

# work flow
route.js declares all the routes in route-config.json and binds them with their respective middlewares and controllers.
add required configuration for endpoint in core/route-config.json 
and define controllers and middleware in appropriate files in respective folders
if any new file added to this folders don't forget to import them in routes/route.js

