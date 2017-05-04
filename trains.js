/**
 * Simulates a map of railway stations in the form of a
 * connected weighted graph. Provides functions for computing the distance
 * along a certain route, the number of different routes between two 
 * stations, and the shortest route between two stations.
 */
(function(globals){

    "use strict";

    var map;

    /**
     * Constructor for a class of train nodes. Take an input string 
     * consisting of a ', ' deliminated list of nodes consisting of 3 charters.
     * The first indicating the origin node, the second the destination node,
     * and the third the wieght/distance between the nodes as an integer.
     * 
     * e.g. input "AB5, BC4, CD8, DC8, DE6, AD5, CE2, EB3, AE7"
     */
    function trainMap (input) {

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
        console.log(JSON.stringify(this.nodes));
    }

    globals.Graph = function(input){

        map = new trainMap(input);
    }

}(this));