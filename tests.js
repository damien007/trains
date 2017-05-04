/**
 * Global functions for testing the functionality 'trains.js'
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

}(this));