import 'vuetify/styles'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'

import { createVuetify } from 'vuetify'

export default createVuetify({
  components,
  directives,

  defaults: {
    VBtn: {
      density: 'comfortable',
    },
    VAlert: {
      density: 'compact',
    },
    VSelect: {
      hideDetails: true,
      density: 'comfortable',
    },
    VTextField: {
      density: 'comfortable',
      variant: 'outlined',
    },
  },

  theme: {
    themes: {
      light: {
        dark: false,
        colors: {
          primary: '#00bd7e',
          secondary: '#F8F9FA',
        },
      },
    },
  },
})
