/**
 * Simulates a map of railway stations in the form of a
 * connected weighted graph. Provides functions for computing the distance
 * along a certain route, the number of different routes between two 
 * stations, and the shortest route between two stations.
 */
(function(globals){

    "use strict";

    var map = null;
    var fileInput = document.getElementById("txtInput");
    var output = document.getElementById("txtOutput");

    /**
     * Constructor for a class of train nodes. Take an input string 
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
                output.innerText = content;
            }
            reader.readAsText(file);
        }
    });
    
}(this));