class GeoCoordinates {
    static regex = /^\s*([-+])?([1-8]?\d(?:\.\d+)?|90(?:\.0+)?)\s?([nNsS])?\s*,\s*([-+])?(180(?:\.0+)?|(?:(?:1[0-7]\d)|(?:[1-9]?\d))(?:\.\d+)?)\s?([eEWw])?\s*$/;
    earthRadiusKm = 6371;
    meterDistance = '';
    kilometerDistance = '';
    calculatedCoorrdinates= {};
    constructor(start, end){ 

        this.addCoordinates(start,end);
    }

    addCoordinates(start, end){
     
        if(GeoCoordinates.testCoordinates(start) && GeoCoordinates.testCoordinates(end)){
       
            this.coordinates = {start,end};
       
            let searchStart = GeoCoordinates.regex.exec(start);
        
            let startLatitude = {
                operator: searchStart[1],
                value: searchStart[2],
                direction: searchStart[3]
            };
            let startLongitude  = {
                operator: searchStart[4],
                value: searchStart[5],
                direction: searchStart[6]
            };

            let searchEnd = GeoCoordinates.regex.exec(end);
        
            let endLatitude = {
                operator: searchEnd[1],
                value: searchEnd[2],
                direction: searchEnd[3]
            };
            let endLongitude  = {
                operator: searchEnd[4],
                value: searchEnd[5],
                direction: searchEnd[6]
            };

            this.calculatedCoorrdinates ={
                start: {
                    latitude:  GeoCoordinates._getDataFromCoordinate(startLatitude),
                    longitude: GeoCoordinates._getDataFromCoordinate(startLongitude),
                },
                end: {
                    latitude: GeoCoordinates._getDataFromCoordinate(endLatitude),
                    longitude: GeoCoordinates._getDataFromCoordinate(endLongitude),
                }

            }

     
            
           
        }
        else{
            let error = new Error('Niepoprawne współrzędne');
            error.name = '';
            
            throw error;
        }

    }

   static testCoordinates(coordinates){
 
        return GeoCoordinates.regex.test(coordinates);
    }


    static _getDataFromCoordinate(coordinate){
        let value;
     
        if(GeoCoordinates._ifExist(coordinate.direction)){
            if(GeoCoordinates._containsSWDirection(coordinate.direction)){
                value = parseFloat('-'+coordinate.value);
            
            }
            else{
                value = parseFloat(coordinate.value);
            }
        }
        else{
            if(GeoCoordinates._ifExist(coordinate.operator)){
                value = parseFloat(coordinate.operator+coordinate.value);
            }
            else{
                value = parseFloat(coordinate.value);
            }
            
        }
       
       
        return value;

       
    }

    static _containsSWDirection(coordinate){
        return /[sSWw]/.test(coordinate);
    }
    static _ifExist(value){
        return typeof value !== 'undefined';
    }

    // without including Earth's curvature
    // calculateDistance(){
    //     this.meterDistance = '';
    //     this.kilometerDistance = '';

    //     let kilometerDistance =
    //         Math.sqrt(Math.pow(this.calculatedCoorrdinates.end.latitude - this.calculatedCoorrdinates.start.latitude,2) + 
    //         Math.pow(Math.cos((this.calculatedCoorrdinates.start.latitude * Math.PI)/180) ,2) * 
    //         Math.pow(this.calculatedCoorrdinates.end.longitude - this.calculatedCoorrdinates.start.longitude,2)) * (40075.704 / 360);
        // this.kilometerDistance = this._parseNumberWithExponents(kilometerDistance) ;
        // this.meterDistance = this._parseNumberWithExponents(kilometerDistance * 1000);
        // return {
        //     meter: this.meterDistance,
        //     kilometer: this.kilometerDistance
        // };
    // }

    // ‘haversine’ formula 
    _calculateDistance(){
           
        const dLat = this._degreesToRadians(this.calculatedCoorrdinates.end.latitude-this.calculatedCoorrdinates.start.latitude);
        const dLon = this._degreesToRadians(this.calculatedCoorrdinates.end.longitude-this.calculatedCoorrdinates.start.longitude);


        const lat1 = this._degreesToRadians(this.calculatedCoorrdinates.start.latitude);
        const lat2 = this._degreesToRadians(this.calculatedCoorrdinates.end.latitude);

        var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        this.kilometerDistance = this._parseNumberWithExponents(this.earthRadiusKm*c) ;
        this.meterDistance = this._parseNumberWithExponents(this.earthRadiusKm*c * 1000);
        return {
            meter: this.meterDistance,
            kilometer: this.kilometerDistance
        };
    }

    getDistance(){
        return this._calculateDistance();
    }

    getMeterDistance(){
        this._calculateDistance();
        return this.meterDistance;
    }
    getKilometerDistance(){
        this._calculateDistance();
        return this.kilometerDistance;
    }
    _degreesToRadians(degrees) {
        return degrees * Math.PI / 180;
    }

    _parseNumberWithExponents(number){
        let regex = /^([+-]?\d*\.?\d*)e([+-]?\d*)$/
        if(regex.test(number)){
            let search = regex.exec(number);
            return (parseFloat(search[1]).toFixed(2)+'^'+search[2]);
        }
        else{
            return number.toFixed(2)
        }
        
    }


    resetCoordinates(){
        this.startCoordinates = '';
        this.endCoordinates = '';
    }

}

export default GeoCoordinates;