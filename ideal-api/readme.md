# start 
cd ideal-api && npm start

# add route
add an object in core/route-config.json

# add controllers in controllers/
if any new controller file needed import it in route.js.
to bind controller with route add it in core/route-config.json 

# add middleware in middlewares/
if any new middleware file needed import it in route.js.
to bind middlewares with route add it in core/route-config.json  


# work flow
route.js declares all the routes in route-config.json and binds them with their respective middlewares and controllers.
add required configuration for endpoint in core/route-config.json 
and define controllers and middleware in appropriate files in respective folders
if any new file added to this folders don't forget to import them in routes/route.js

