<template>
  <v-container>
    <v-row class="text-center">
      <v-col class="mb-4">
        <p>Please put this line in your  
            <v-chip
              class="ma-2"
              color="indigo"
              text-color="white"
              small
            >
              kyan.conf
            </v-chip> 
            file at your server. 

            And re-run it with <code>./kyand</code>
        </p>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-subheader>masternodeblsprivkey={{d.blsSecret}}</v-subheader>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="5">
        <v-text-field
          label="Server IP"
          outlined
          v-model="v.serverIp"
        ></v-text-field>
      </v-col>
      <v-col cols="5">
        <v-text-field
          label="Server Port"
          outlined
          v-model="v.serverPort"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
          <v-btn
          :disabled="v.serverIp.length === 0 || v.serverPort.length === 0 "
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
        serverIp:'',
        serverPort:'7577'
      }
    }),

    methods: {
      next(){
        this.nextf(this.v)
      }
    }
  }
</script>
