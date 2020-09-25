<template>
  <v-container>
    <v-row class="text-center">

      <v-col class="mb-4">
        <p>Please generate a  
            <v-chip
              class="ma-2"
              color="indigo"
              text-color="white"
              small
            >
              <v-avatar left>
                <v-icon>mdi-checkbox-marked-circle</v-icon>
              </v-avatar>
              BLS key pair
            </v-chip>  
            with <code>bls generate</code>
        </p>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-text-field
          label="Secret"
          outlined
          v-model="v.blsSecret"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-text-field
          label="Public"
          outlined
          v-model="v.blsPublic"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
          <v-btn
          :disabled="v.blsSecret.length === 0 || v.blsPublic.length === 0 "
          color="blue-grey"
          class="ma-2 white--text"
          @click="next"
          absolute
          right
          >
          Next
          <v-icon right dark>mdi-arrow-right</v-icon>
        </v-btn>
      </v-col>
    </v-row>

  </v-container>
</template>

<script>
  export default {
    props: {
      nextf: { type: Function },
    },

    data: () => ({
      v: {
        blsSecret:'',
        blsPublic:''
      }
    }),

    methods: {
      next(){
        this.nextf(this.v)
      }
    }
  }
</script>
