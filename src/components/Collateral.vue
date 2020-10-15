<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-img
          :src="require('../assets/kyanlogo.svg')"
          class="my-3"
          contain
          height="100"
        />
      </v-col>

      <v-col class="mb-4">
        <h2>
          Welcome to Kyanite MasterNode Installation
        </h2> 
        <p>Please send collateral and get 
            <v-chip
              class="ma-2"
              color="indigo"
              text-color="white"
              small
            >
              <v-avatar left>
                <v-icon>mdi-checkbox-marked-circle</v-icon>
              </v-avatar>
              MasterNode Outputs
            </v-chip>  
            with <code>masternode outputs</code> 
            <v-btn icon color="indigo" v-if="!d.manuel" @click="runcmd('./kyan-cli masternode outputs')">
              <v-icon>mdi-arrow-right-drop-circle</v-icon>
            </v-btn>
        </p>

      </v-col>
    </v-row>

    <v-row>
      <v-col cols="9">
        <v-text-field
          label="Collateral Hash"
          outlined
          hint="For example, a138b262dc3e3....."
          v-model="v.collateralHash"
        ></v-text-field>
      </v-col>

      <v-col cols="3">
        <v-text-field
          label="Collateral Index"
          outlined
          hint="Number, like 0, 1, 2 ..."
          v-model="v.collateralIndex"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
          <v-btn
          :disabled="v.collateralHash.length === 0 || v.collateralIndex.length === 0 "
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
      d: Object
    },

    data: () => ({
      v: {
        collateralHash:'',
        collateralIndex:''
      }
    }),

    methods: {
      next(){
        this.nextf(this.v)
      }
    }
  }
</script>
