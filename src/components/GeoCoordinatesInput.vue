<template>
    <div class="geo-coordinates">
        <label class="geo-coordinates__label">
            {{title}}
        </label>
        <input class="geo-coordinates__input" type="text" v-model="text" @keyup="onChange($event.target.value)">
        <span v-show="error" class="geo-coordinates__error">Niepoprawnie wprowadzone współrzędne</span>

    </div>
</template>

<script>
import GeoCoordinates from '../classes/GeoCoordinates';

export default {
    name:'GeoCoordinatesInput',
    props: ['title'],
    data: function(){
        return{
            text: '',
            error: false
        };
    },
    methods:{
        onChange(coordinates){
            this.text = coordinates;
            if(GeoCoordinates.testCoordinates(coordinates) || !this.text.length){
                this.$emit('changeValue',coordinates);
                this.error = false;
            }
            else{
                this.error = true;
            }
         
            
        }
    }

}
</script>

<style lang="scss" scoped>

.geo-coordinates{
    margin-bottom: 20px;
    &__label{
        color: #20304d;
        font-size: 13px;
        font-weight: 600;;
        margin-bottom: 15px;
        display: block;
    }
    &__input{
        background-color: #fff;
        border: 1px solid #dedef3;
        height: 55px;
        box-sizing: border-box;
        padding: 15px;
        transition: all 1s ease;
        font-size: 14px;
        font-weight: 500;
        display: block;
        width: 100%;
        
        &:focus{
            border: 1px solid #0073e8;
        }

    }

    &__error{
        color: #ce0000;
         font-size: 11px;
        font-weight: 600;;
        margin-top: 10px;
        display: block;
    }
}

</style>