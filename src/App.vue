<template>
  <div class="geo-distance">
    <h3>Garść informacji</h3>
      <ul class="tutorial">
          <li class="tutorial__item">Przyjmowany typ współrzednych to (+-) wartość w stopniach oraz położenie (NS, WE)</li>
          <li class="tutorial__item">Przykład: <strong>+90.0, -127.554334</strong> lub <strong>90.0 N, 127.554334 W</strong></li>
          <li class="tutorial__item">(NS, WE) jest opcjonalne, można użyć samych (+-)</li>
          <li class="tutorial__item">W klasie <strong>GeoCoordinates</strong> jest kilka sposobów obliczania dystansu. <br>Opowiada za to metoda <strong>_calculateDistance()</strong><br> 
            Inne sposoby są zakomentowane.
          </li>
          <li class="tutorial__item">
            Linki to metod obliczania <span><a href="https://www.movable-type.co.uk/scripts/latlong.html">Link 1</a>   	&nbsp;
            <a href="https://pl.wikibooks.org/wiki/Astronomiczne_podstawy_geografii/">Link2</a>
           </span>
          </li>

        
          
      </ul>
      <form class="geo-distance__form">
        <GeoCoordinatesInput title="Współrzedne początkowe" @changeValue='startCoordinatesValue = $event'/>
        <GeoCoordinatesInput title="Współrzedne końcowe" @changeValue='endCoordinatesValue = $event'/>
        <span v-show="error.length" class="geo-distance__form__error">{{error}}</span>
        <button class="geo-distance__form__button" @click.prevent="submitForm" :disabled="validForm">Oblicz</button>
       
      </form>


      <div v-show="visibleResult" class="geo-distance__result">
        <button @click.prevent="visibleResult = false" class="geo-distance__result__exit">X</button>
        <h3 class="geo-distance__result__title">
          Znamy dystans!
        </h3>
        <span>
           Odległość między <strong class="geo-distance__result__coordinates">{{startCoordinates}}</strong> a <strong class="geo-distance__result__coordinates">{{endCoordinates}}</strong> to:
        </span>
        
        <div class="geo-distance__values">

        
          <span class="geo-distance__value">
            {{distanceKM}} <span class="geo-distance__value__unit">km</span>
          </span>
          <span>albo</span>
          <span class="geo-distance__value">
            {{distanceM}} <span class="geo-distance__value__unit">m</span>
          </span>
        </div>
      </div>
  </div>
</template>

<script>
import GeoCoordinatesInput from './components/GeoCoordinatesInput'
import GeoCoordinates from './classes/GeoCoordinates';
export default {
  name: "App",
  components: {
    GeoCoordinatesInput
  },

  data: function() {
    return {
      startCoordinatesValue: '',
      endCoordinatesValue: '',
      startCoordinates: '',
      endCoordinates: '',
      valid: false,
      distanceKM: '',
      distanceM: '',
      visibleResult: false,
      error: ''
    }
   
  },

  methods:{
    submitForm(){
      if(this.startCoordinatesValue.length && this.endCoordinatesValue.length){
        try{
          var geo = new GeoCoordinates(this.startCoordinatesValue,this.endCoordinatesValue);
              const geoDistance = geo.getDistance();
              this.startCoordinates = this.startCoordinatesValue;
              this.endCoordinates = this.endCoordinatesValue;
              
              this.distanceKM = geoDistance.kilometer;
              this.distanceM =  geoDistance.meter ;
          
              this.$children.forEach(child => child.onChange(''));

              this.visibleResult = true;
              
        }
        catch(err){
         
            this.error = err.message;
        }

     


      }

      else{
        this.error = "Nie wypełniłeś wszystkich pól w formularzu"
      }
    },
  },
  computed:{
    validForm(){
      return  (this.startCoordinatesValue.length && this.endCoordinatesValue.length ? false: true)
    }
  }
};
</script>

<style lang="scss">
 body{
   
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      font-family: 'Poppins', sans-serif;
      
  }

  .tutorial{
    padding: 0 0 0 20px;
    margin-bottom: 50px;
    font-size: 15px;

    &__item{
      margin-bottom: 10px;
    }
  }

  .geo-distance{
    width: 500px;
    padding: 30px 15px;
    box-sizing: border-box;
    margin: auto;

    @media(max-width: 768px){
      width: 100%;
    }

    &__form{
      &__button{
        margin-left: auto;
        display: block;
        cursor: pointer;
        background: #ce0000;
        border-width: 0;
        color: white;
        padding: 15px 25px;

        &:disabled{
          background-color: #cecaca;
        }
      }

      &__error{
        background-color: #ce0000;
        color: white;
        font-weight: 600;
        font-size: 12px;
        padding: 5px;
        display: block;
        margin-bottom: 30px;
      }
    }

    &__values{
      margin-top: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      flex-direction: column;
    }

    &__value{
      margin:  15px 0;
      padding: 15px;
      background-color: #0073e8;
      color: white;
      font-size: 26px;
      font-weight: 600;

      &__unit{
        font-size: .6em;
      }
    }

    &__result{
      border: 1px solid #0073e8;
      padding: 25px;
      font-size: 14px;
      border-radius: 5px;
      margin-top: 40px;
      position: relative;
      &__title{
        margin-top: 0;
      }

      &__exit{
        background-color: transparent;
        border-width: 0;
        color: #ce0000;
        font-size: 20px;
        font-weight: 600;
        position: absolute;
        top: 0;
        right: 0;
        padding: 20px;
        cursor: pointer;        
      }
      
    }
  }

  

</style>
