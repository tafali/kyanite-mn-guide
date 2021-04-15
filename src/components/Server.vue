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
          label="Server IP"
          :rules="[rules.required, rules.ipv46]"
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
          ipv46: value => {
            const patternv4 = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/gm
            const patternv6 = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/gm
            
            return patternv4.test(value) || patternv6.test(value) || 'Invalid ip'
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
