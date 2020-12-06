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

        <v-checkbox class="pa-2 warning text-no-wrap rounded-r-xl" dark color="indigo"
          v-model="added"
        > <template v-slot:label> <span > I added it</span> </template>
        </v-checkbox>

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
          label="Server IPv4"
          :rules="[rules.required, rules.ipv4]"
          outlined
          v-model="d.serverIp"
        ></v-text-field>
      </v-col>
      <v-col cols="5">
        <v-text-field
          label="Server Port"
          :rules="[rules.required, rules.port]"
          outlined
          v-model="d.serverPort"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
          <v-btn
          color="blue-grey"
          class="ma-2 white--text"
          @click="back"
          absolute
          left
          >
          <v-icon left dark>mdi-arrow-left</v-icon>
          Back
          </v-btn>
          <v-btn
          :disabled="d.serverIp.length === 0 || d.serverPort.length === 0 || !added"
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
      backf: { type: Function },
      d: Object
    },

    data: () => ({
      added: false,
      rules: {
          required: value => !!value || 'Required.',
          port: value => {
            const pattern = /^([0-9]{1,4}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5])$/
            return pattern.test(value) || 'Invalid port.'
          },
          ipv4: value => {
            const pattern = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/gm
            return pattern.test(value) || 'Invalid ipv4.'
          }
        }
    }),

    methods: {
      next(){
        this.nextf()
      },
      back(){
        this.backf()
      },
    }
  }
</script>
