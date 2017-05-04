/**
 * Simulates a map of railway stations in the form of a
 * connected weighted graph. Provides functions for computing the distance
 * along a certain route, the number of different routes between two 
 * stations, and the shortest route between two stations.
 */
(function(globals){

    "use strict";

    var fileInput = document.getElementById("txtInput");
    var output = document.getElementById("txtOutput");

    /**
     * Constructor for a class of train nodes. Takes an input string 
     * consisting of a ', ' deliminated list of interconnected stations.
     * The first two characters range 'A-D' identify two connectected stations. 
     * The third as an intger indicates the distance between the two stations
     * 
     * e.g. input "AB5, BC4, CD8, DC8, DE6, AD5, CE2, EB3, AE7"
     */
    function TrainMap (input) {

        var nodes = {};
        var input = input.split(", ");

        for(var i = 0; i < input.length; i++){

            var origin = input[i].substring(0,1);
            var destination = input[i].substring(1,2);
            var distance = parseInt(input[i].substring(2,3));

            if(!nodes[origin]) {

                nodes[origin] = {};
            } 
            nodes[origin][destination] = distance;
        }

        this.nodes = nodes;
    }

    /**
     * Determines the distance to travel along a certain route in the train network,
     * or if no such route is possible. Takes an array of stations indicating
     * the route to travel in order of the stations to be visited.
     * 
     * e.g. ["A","D","C"]
     */
    TrainMap.prototype.routeDistance = function(route){

        var routes = this.nodes;
        var distanceTravelled = 0;
        var origin = route[0];

        for(var i = 1; i < route.length; i++){

            var destination = route[i];

            if(!routes[origin] || !routes[origin][destination]){
                return "NO SUCH ROUTE";
            }

            distanceTravelled += routes[origin][destination];
            origin = destination;
        }

        return distanceTravelled;
    }

    /**
     * Determines the number of possible route between two given stations 
     * on the network below a maximum number of stops. Takes 3 parameters: 
     * The starting station; The destination station; 
     * And the max number of stops that can be made;
     * 
     * e.g. ("A", "D", 4)
     */
    TrainMap.prototype.possibleRoutesMax = function (start, end, maxStops){

        var routes = this.nodes;
        var possibleRoutes = 0;

        // Check exit condition to avoid infinite recursive loop
        if(!maxStops) return;

        function findRoute(current, stops){
            
            if(stops > maxStops){
                return;
            }
            
            if(current === end && stops > 0){
                possibleRoutes += 1;
            }

            for(var destination in routes[current]){

                findRoute(destination, stops +1);
            }
        };

        findRoute(start, 0);

        return possibleRoutes;
    }

    /**
     * Determines the number of possible route between two given stations 
     * on the network. Takes 4 parameters: The starting station; The
     * destination station; The max number of stops that can be made;
     * AND/OR The exact number of stops that must be made;
     * 
     * e.g. ("A", "D", 4)
     */
    TrainMap.prototype.possibleRoutesExact = function (start, end, exactStops){

        var routes = this.nodes;
        var possibleRoutes = 0;

        // Check exit condition to avoid infinite recursive loop
        if(!exactStops) return;

        function findRoute(current, stops){
            
            if(stops === exactStops){

                if(current === end){
                    possibleRoutes += 1;
                }
                return;
            }

            for(var destination in routes[current]){

                findRoute(destination, stops +1);
            }
        };

        findRoute(start, 0);

        return possibleRoutes;
    }

    /**
     * Global function for accessing TrainMap constructor for testing purposes
     */
    globals.TrainMap = function(input){

        return new TrainMap(input);
    }


    fileInput.addEventListener("change", function(evt){

        var file = evt.target.files[0];
        if(file){
            var reader = new FileReader();
            reader.onload = function(e) { 
                
                var content = reader.result;
                
                // Check cotents start as expected
                if(content.substring(0,7) === "Graph: "){

                    var trainMap = null;

                    // Remove "Graph: " from start of input text
                    var input = content.substring(7);
                    
                    trainMap = new TrainMap(input);

                    // Output the distance of several routes
                    output.innerHTML = "Output #1: " + 
                        trainMap.routeDistance(["A","B","C"]) + "</br>"; 
                    output.innerHTML += "Output #2: " + 
                        trainMap.routeDistance(["A","D"]) + "</br>";
                    output.innerHTML += "Output #3: " + 
                        trainMap.routeDistance(["A","D","C"]) + "</br>";
                    output.innerHTML += "Output #4: " + 
                        trainMap.routeDistance(["A","E","B","C","D"]) + "</br>";
                    output.innerHTML += "Output #5: " + 
                        trainMap.routeDistance(["A","E","D"]) + "</br>"; 

                    output.innerHTML += "Output #6: " + 
                        trainMap.possibleRoutesMax("C", "C", 3) + "</br>"; 

                    output.innerHTML += "Output #7: " + 
                        trainMap.possibleRoutesExact("A", "C", 4) + "</br>"; 
                    
                }
                
            }
            reader.readAsText(file);
        }
    });
    
}(this));