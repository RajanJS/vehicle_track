var gps = require("gps-tracking");

var options = {
    'debug': true,
    'port': 8090,
    'device_adapter': "TK103"
}

var server = gps.server(options, function(device, connection) {

    device.on("login_request", function(device_id, msg_parts) {

        // Some devices sends a login request before transmitting their position
        // Do some stuff before authenticate the device... 

        // Accept the login request. You can set false to reject the device.
        this.login_authorized(true);

    });


    /******************************
        PING - When the gps sends their position  
        ******************************/
    device.on("ping", function(data) {
        //After the ping is received
        //console.log(data);
        // console.log("I'm here now: " + data.latitude + ", " + data.longitude);
        return data;
    });

    /******************************
        ALARM - When the gps sends and alarm  
        ******************************/
    device.on("alarm", function(alarm_code, alarm_data, msg_data) {
        console.log("Help! Something happend: " + alarm_code + " (" + alarm_data.msg + ")");
    });

});