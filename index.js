// var app = new Vue({
//   el: "#search",
//   data: {
//     apiResults = 'hi',
//     searchQuery = [],
//   },
//   methods: {
//     apiQuery: function () {
//       fetch('https://sheetsu.com/apis/v1.0su/6c312ee92a42').then(res => res.json()).then(results => this.apiResults = results)
//     }
//   }
// });

var app = new Vue({
  el: "#search",
  data: {
    apiResults: [],
  },
  created: function () {
    console.log("created");
    this.apiQuery();
  },
  methods: {
    apiQuery: function () {
      fetch("https://sheetsu.com/apis/v1.0su/6c312ee92a42")
        .then((res) => res.json())
        .then((results) => {
          console.log(results[0]["Your college experience... 🤓"]);

          this.apiResults = results.map((el) => {
            data = Object.entries(el);
            return {
              timestamp: data[0][1],
              email: data[1][1],
              name: data[2][1],
              branch: data[3][1],
              experience: data[4][1],
              picture:
                "https://drive.google.com/uc?" +
                data[5][1]
                  .split("?")[1]
                  .split("&")
                  .find((el) => el.startsWith("id")),
            };
          });
        });
    },
  },
});
