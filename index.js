var app = new Vue({
  el: "#search",
  data: {
    apiResults: [],
    searchText: "",
    searchQuery: "",
    chosenBranch: "",
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
    performSearch: function () {
      if (!this.chosenBranch) {
        alert("Choose a branch");
        return;
      }
      if (!this.searchText) {
        alert("Enter Name");
        return;
      }
      this.searchQuery = this.searchText;
    },
  },
  computed: {
    searchResults: function () {
      if (!this.searchQuery) return;
      const branchResults = this.apiResults.filter(
        (el) => el.branch === this.chosenBranch
      );
      console.log(branchResults);
      const filteredResults = new Set();
      branchResults.forEach((el) => {
        if (
          el.name.trim().toLowerCase().includes(this.searchQuery.toLowerCase())
        ) {
          filteredResults.add(el);
        }
      });
      console.log(filteredResults);
      if (filteredResults.size >= 10)
        return Array.from(filteredResults).slice(0, 10);

      if (filteredResults.size === 0) {
        return [{ none: true }];
      }

      return filteredResults;
    },
  },
});
