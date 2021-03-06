/**
 * Global functions for private testing of the functionality of 'trains.js'
 */
(function(globals){

    "use strict";

    // Extremely basic test of trainMap constructor functionailty
    globals.ConstructorTest = function (){

        var input = "AB1, AC2, AD3, BC2, BD4, CD5";
        var map = globals.TrainMap(input);
        var nodes = map.nodes;

        if(nodes["A"]["B"] === 1 &&  nodes["A"]["C"] === 2 && nodes["A"]["D"] === 3 &&
            nodes["B"]["C"] === 2 && nodes["B"]["D"] === 4 && nodes["C"]["D"] === 5){
                
            return "TEST PASSED";
        }
        return "TEST FAILED";
    }

    // Extremely basic test of trainMap routeDistance functionailty
    globals.RouteDistanceTest = function (){

        var input = "AB1, AC2, AD3, BC2, BD4, CD5";
        var map = globals.TrainMap(input);

        if(map.routeDistance(["A","B","C","D"]) === 8 && map.routeDistance(["D","A"]) === "NO SUCH ROUTE"){
                
            return "TEST PASSED";
        }
        console.log(map.routeDistance(["A","B","C","D"]));
        console.log(map.routeDistance(["D","A"]));
        return "TEST FAILED";
    }

    // Extremely basic test of trainMap possibleRoutesMax functionailty
    globals.PossibleRoutesMaxTest = function (){
        var input = "AB1, AC2, AD3, BC2, CD5, DB2";
        var map = globals.TrainMap(input);

        if(map.possibleRoutesMax("A","B",4) === 4 && 
            map.possibleRoutesMax("B","D",1) === 0 && 
            map.possibleRoutesMax("B","B",6) === 2){
            
            return "TEST PASSED";
        }
        console.log(map.possibleRoutesMax("A","B",4));
        console.log(map.possibleRoutesMax("B","D",0));
        console.log(map.possibleRoutesMax("B","B",6));
        return "TEST FAILED";
    }

    // Extremely basic test of trainMap shortestRoute functionailty
    globals.ShortestRouteTest = function (){

        var input = "AB1, AC2, BC2, CD5, DA5";
        var map = globals.TrainMap(input);

        if(map.shortestRoute("A","B") === 1 &&
            map.shortestRoute("A","C") === 2 &&
            map.shortestRoute("A","D") === 7 &&
            map.shortestRoute("A","A") === 12){
            
            return "TEST PASSED";
        }
        console.log(map.shortestRoute("A","B"));
        console.log(map.shortestRoute("A","C"));
        console.log(map.shortestRoute("A","D"));
        console.log(map.shortestRoute("A","A"));
        return "TEST FAILED";
    }

    // Extremely basic test of trainMap possible routes by dinstance
    globals.PossibleRoutesDistanceTest = function (){

        var input = "AB1, AC2, BC2, CD5, DA5";
        var map = globals.TrainMap(input);

        if(map.possibleRoutesDistance("A","B", 15) === 3 &&
            map.possibleRoutesDistance("A","C", 2) === 0 &&
            map.possibleRoutesDistance("A","D", 9) === 2 &&
            map.possibleRoutesDistance("A","A", 13) === 1){
            
            return "TEST PASSED";
        }
        console.log(map.possibleRoutesDistance("A","B", 15));
        console.log(map.possibleRoutesDistance("A","C", 2));
        console.log(map.possibleRoutesDistance("A","D", 9));
        console.log(map.possibleRoutesDistance("A","A", 13));
        return "TEST FAILED";
    }

}(this));