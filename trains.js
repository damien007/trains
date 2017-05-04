/**
 * Simulates a map of railway stations in the form of a directed,
 * connected, weighted graph. Provides functions for computing the distance
 * along a certain route, the number of possible routes between two 
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
     * Determines the distance to travel along a certain route in the train 
     * network, or if no such route is possible. Takes an array of stations 
     * indicating the route to travel in order of the stations to be visited.
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
     * The starting station; The destination station; And the max number 
     * of stops that can be made;
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
     * destination station; And the exact number of stops that must be made;
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
     * Determines the number of possible routes between two given stations 
     * on the network. Takes 4 parameters: 
     * The starting station; The destination station; And the max distance 
     * the total route must be LESS THAN.
     * 
     * e.g. ("A", "D", 4)
     */
    TrainMap.prototype.possibleRoutesDistance=function(start,end,maxDistance){

        var routes = this.nodes;
        var possibleRoutes = 0;

        // Check exit condition to avoid infinite recursive loop
        if(!maxDistance) return;

        function findRoute(current, totalDistance){
            
            if(totalDistance >= maxDistance){
                return;
            }
            
            if(current === end && totalDistance > 0){
                possibleRoutes += 1;
            }

            for(var destination in routes[current]){

                var distance = routes[current][destination];
                findRoute(destination, totalDistance + distance);
            }
        };

        findRoute(start, 0);

        return possibleRoutes;
    }

    /**
     * Returns the distance of the shortest route possible between any two 
     * stations using an implementation of Djikstra's algorithm. 
     * Takes a starting station and and ending station to find the 
     * shortest distance between.
     * 
     * e.g. ("A", "D")
     */
    TrainMap.prototype.shortestRoute = function (start, end){

        var routes = this.nodes;
        var unvisited = [];
        var distance = {};

        for(var station in routes){

            // Initially Mark every station as unvisitied with infinite 
            // (uknown) distance from start
            unvisited.push(station);
            distance[station] = Infinity;
        }

        // Instead of marking the starting point with distance 0,
        // calculate the distance from the starting point to connecting
        // destinations initially. This allows the distance going 
        // back to the start to be found.
        for(var destination in routes[start]){
                
            var newDistance = routes[start][destination];
            if(newDistance < distance[destination]){
                distance[destination] = newDistance;
            }
        }

        function findShortest(){

            var dist = Infinity;
            var closest = unvisited[0];

            // Find the next unvisited station with shortest distance
            // from the starting point  
            for(var i = 1; i < unvisited.length; i++){

                var station = unvisited[i];
                if(distance[station] < distance[closest]){
                    closest = station;
                }
            }

            // If the next unvisited closest station is the end point
            // we have found the shortest path to it and can stop
            if(closest === end){
                return distance[closest]
            }

            // Remove the unvisited closest station from the unvisited
            // queue. Becuase we are 'Visiting' it
            var index = unvisited.indexOf(closest);
            unvisited.splice(index, 1);

            // If the distance from the unvisited closest station
            // to each other station is less than what we already
            // have update it with the new shortest distance
            for(var destination in routes[closest]){
                
                var newDistance = distance[closest] + 
                    routes[closest][destination];

                if(newDistance < distance[destination]){
                    distance[destination] = newDistance;
                }
            }

            // Repeat until 'end' is the closest unvisited station
            return findShortest();
        }
        return findShortest();
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
                        trainMap.routeDistance(["A","E","B","C","D"])+"</br>";
                    output.innerHTML += "Output #5: " + 
                        trainMap.routeDistance(["A","E","D"]) + "</br>"; 

                    // Output the number of possible routes starting 
                    // at "C" and ending at "C" with no more than 3 stops
                    output.innerHTML += "Output #6: " + 
                        trainMap.possibleRoutesMax("C", "C", 3) + "</br>"; 

                    // Output the number of possible routes starting
                    // at "A" and ending at "C" with exactly 4 stops
                    output.innerHTML += "Output #7: " + 
                        trainMap.possibleRoutesExact("A", "C", 4) + "</br>"; 

                    // Output distance of the shortest route between the
                    // given starting and end points.
                    output.innerHTML += "Output #8: " + 
                        trainMap.shortestRoute("A", "C") + "</br>"; 
                    output.innerHTML += "Output #9: " + 
                        trainMap.shortestRoute("B", "B") + "</br>"; 

                    // Output the number of possible routes starting
                    // at "C" and ending at "C" with a total distance
                    // less than 30
                    output.innerHTML += "Output #10: " + 
                        trainMap.possibleRoutesDistance("C", "C", 30)+ "</br>";
                }
                
            }
            reader.readAsText(file);
        }
    });

    /**
     * Global function for accessing TrainMap constructor for testing purposes
     */
    globals.TrainMap = function(input){

        return new TrainMap(input);
    }
    
}(this));