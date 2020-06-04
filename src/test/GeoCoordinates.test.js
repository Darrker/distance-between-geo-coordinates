import {assert,expect} from 'chai';
import GeoCoordinates from '../classes/GeoCoordinates';


describe('GeoCoordinates Class',function(){
    
    it('When pass wrong coordinates',function(){

        assert.throws(()=> new GeoCoordinates("asdas","dadsadsa"), Error);
      
    });

    it('When pass correct coordinates',function(){

        assert.doesNotThrow(()=> new GeoCoordinates("+90.0, -127.554334","90.0N, 12W"), Error);
      
    });
    
    it('Testing regex',function(){
        expect(GeoCoordinates.testCoordinates('+90.0, -127.554334')).to.be.true;
        expect(GeoCoordinates.testCoordinates('90.0N, 12W')).to.be.true;
        expect(GeoCoordinates.testCoordinates('90.0N, -12')).to.be.true;
        expect(GeoCoordinates.testCoordinates('-90.0N, -12')).to.be.true;
        expect(GeoCoordinates.testCoordinates('+90.0assa, -127.554334assa')).to.be.false;
        expect(GeoCoordinates.testCoordinates('+91.0, -182.554')).to.be.false;
        expect(GeoCoordinates.testCoordinates('+91.0, 172.554')).to.be.false;
        expect(GeoCoordinates.testCoordinates('+9.0, -182.554')).to.be.false;
        
    })

    it('Parsing Coordinates',function(){
        let geo = new GeoCoordinates('-30.0, -127.554334', '50.0 S, 127.554334W')
        
        expect(geo.calculatedCoorrdinates).to.deep.equal({
            start: {
                latitude:  -30.0,
                longitude: -127.554334,
            },
            end: {
                latitude: -50,
                longitude: -127.554334,
            }

        });
   
        
    })

    it('Return correct distance',function(){
        let geo = new GeoCoordinates('-30.0, -127.554334', '50.0 S, 127.554334W')
        
        expect(geo.getDistance()).to.deep.equal({
            kilometer:  "2223.90",
            meter: "2223898.53",
          
        });
   
        
    })








});