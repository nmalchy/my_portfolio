<template>
  <v-container
    id="user-profile"
    fluid
    tag="section"
  >
    <v-row justify="center">
      <v-col
        cols="12"
        md="8"
      >
        <base-material-card>
          <template v-slot:heading>
            <div class="display-2 font-weight-light">
              Skills
            </div>
          </template>
          <v-row>
            <v-col
              cols="4"
              md="4"
            >
              <v-list>
                <v-list-item
                  v-for="(item, i) in items"
                  :key="i"
                >
                  <v-list-item-icon>
                    <v-icon v-text="item.icon" />
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title v-text="item.text" />
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-col>
            <v-col
              cols="4"
              md="4"
            >
              <v-list>
                <v-list-item
                  v-for="(item, i) in items2"
                  :key="i"
                >
                  <v-list-item-icon>
                    <v-icon v-text="item.icon" />
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title v-text="item.text" />
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-col>
            <v-col
              cols="4"
              md="4"
            >
              <v-list>
                <v-list-item
                  v-for="(item, i) in items3"
                  :key="i"
                >
                  <v-list-item-icon>
                    <v-icon v-text="item.icon" />
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title v-text="item.text" />
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-col>
          </v-row>
        </base-material-card>
        <base-material-card>
          <template v-slot:heading>
            <div class="display-2 font-weight-light">
              Work & Volunteer Experience
            </div>
          </template>
          <v-row>
            <v-col
              cols="12"
              md="12"
            >
              <v-timeline>
                <v-timeline-item
                  v-for="(year, i) in years"
                  :key="i"
                  :color="year.color"
                  small
                  right
                >
                  <template v-slot:opposite>
                    <span
                      :class="`headline font-weight-bold ${year.color}--text`"
                      v-text="year.year"
                    />
                  </template>
                  <div class="py-4">
                    <h2 :class="`headline font-weight-light mb-4 ${year.color}--text`">
                      {{ year.company }}
                    </h2>
                    <div>
                      {{ year.description }}
                    </div>
                  </div>
                </v-timeline-item>
              </v-timeline>
            </v-col>
          </v-row>
        </base-material-card>
      </v-col>

      <v-col
        cols="12"
        md="4"
      >
        <v-card class="pa-5">
          <v-img
            class="rounded-lg"
            contain
            height="auto"
            width="auto"
            src="../../../assets/biopic.png"
          />
          <v-card-text class="text-center">
            <h6 class="display-1 mb-1 grey--text">
              Full-Stack Software Developer
            </h6>

            <h4 class="display-2 font-weight-light mb-3">
              Noah Malchy
            </h4>
            <p class="display-1 font-weight-light mb-1">
              Welcome to my portfolio! My name is Noah, and I'm a software developer based in beautiful
              British Columbia. In my spare time I enjoy rockin' out on the drums, playing competitive sports/videogames,
              and I always have an audiobook on the go!
            </p>
            <br>
            <v-btn
              color="success"
              rounded
              class="mr-0"
              to="/contact"
            >
              Contact
            </v-btn>
          </v-card-text>
        </v-card>
        <base-material-card>
          <template v-slot:heading>
            <div class="display-2 font-weight-light">
              Education
            </div>
          </template>
          <v-row>
            <v-col
              cols="12"
              md="12"
            >
              <v-card-title>University of British Columbia</v-card-title>
              <v-card-text>Faculty of Science, BSc in Biology (2013-2018)</v-card-text>
            </v-col>
          </v-row>
        </base-material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    data: () => ({
      items: [
        {
          icon: 'mdi-language-html5',
          text: 'HTML5',
        },
        {
          icon: 'mdi-language-css3',
          text: 'CSS3',
        },
        {
          icon: 'mdi-language-javascript',
          text: 'JavaScript',
        },
        {
          icon: 'mdi-language-php',
          text: 'PHP',
        },
        {
          icon: 'mdi-language-python',
          text: 'Python',
        },
      ],
      items2: [
        {
          icon: 'mdi-vuejs',
          text: 'Vue/Vuex/Vue-Router',
        },
        {
          icon: 'mdi-vuetify',
          text: 'Vuetify',
        },
        {
          icon: 'mdi-laravel',
          text: 'Laravel',
        },
        {
          icon: 'mdi-jquery',
          text: 'jQuery',
        },
        {
          icon: 'mdi-react',
          text: 'React',
        },
      ],
      items3: [
        {
          icon: 'mdi-database',
          text: 'MySQL',
        },
        {
          icon: 'mdi-bash',
          text: 'Linux CLI (Bash)',
        },
        {
          icon: 'mdi-git',
          text: 'Git',
        },
        {
          icon: 'mdi-npm',
          text: 'Node Package Manager',
        },
        {
          icon: 'mdi-wordpress',
          text: 'WordPress',
        },
      ],
      items4: [
        {
          icon: 'mdi-database',
          text: 'MySQL',
        },
        {
          icon: 'mdi-bash',
          text: 'Linux CLI (Bash)',
        },
        {
          icon: 'mdi-git',
          text: 'Git',
        },
        {
          icon: 'mdi-npm',
          text: 'Node Package Manager',
        },
        {
          icon: 'mdi-wordpress',
          text: 'WordPress',
        },
      ],
      years: [
        {
          color: 'cyan',
          year: 'February 1st 2020 - Present',
          company: 'Brikers',
          description: 'Full-Stack Software Developer, Maple Ridge, BC',
        },
        {
          color: 'green',
          year: '2017 - 2019',
          company: 'City of Vancouver',
          description: 'Operations Worker II, Vancouver, BC',
        },
        {
          color: 'pink',
          year: '2016 - 2017',
          company: 'Cimona Cafe & Overtime Landscaping',
          description: 'Server & Landscaper, Richmond, BC',
        },
        {
          color: 'orange',
          year: '2014 - 2016',
          company: 'Jewish Family Services (Food Bank)',
          description: 'Volunteer, Vancouver, BC',
        },
        {
          color: 'amber',
          year: '2012 - 2015',
          company: 'McDonald\'s',
          description: 'Customer Service Representative, Mission, BC',
        },
      ],
      model: 1,
    }),
  }
</script>
