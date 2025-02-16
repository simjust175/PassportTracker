<template>
    
        <v-checkbox v-model="checkbox" class="d-flex">
            <template v-slot:label>
                <div class="text-subtitle-2">
                   6 months in advance
                </div>
            </template>
        </v-checkbox>
</template>
<script>
export default {
    data() {
        return {
            checkbox: false,
        }
    },
    watch:{
        checkbox(newVal){
            this.$emit("selection", newVal)
        }
    }
}
</script>