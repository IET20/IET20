var app = new Vue({
  el: "#search",
  data: {
    apiResults: [],
    searchText: "",
    searchQuery: "",
    chosenBranch: "",
    branchQuery: "",
    resultCount: 0,
  },
  created: function () {
    this.apiQuery();
  },
  methods: {
    apiQuery: function () {
      fetch(
        "https://v2-api.sheety.co/b8aa3b0c2c9d05bda7d616ca94452da1/impressions/formResponses1"
      )
        .then((res) => res.json())
        .then((results) => {
          this.apiResults = results.formResponses1.map((el) => {
            data = Object.entries(el);
            return {
              timestamp: data[1][1],
              email: data[2][1],
              name: data[3][1],
              branch: data[4][1],
              experience: data[5][1],
              picture:
                "https://drive.google.com/uc?" +
                data[6][1].split("?").find((el) => el.startsWith("id")),
            };
          });
        });
    },
    performSearch: function () {
      if (!this.searchText) {
        alert("Kindly Enter the Name");
        return;
      }
      if (!this.chosenBranch) {
        alert("Kindly choose a branch");
        return;
      }
      this.branchQuery = this.chosenBranch;
      this.searchQuery = this.searchText;
    },
  },
  computed: {
    searchResults: function () {
      if (!this.searchQuery) return;
      if (!this.branchQuery) return;
      const branchResults = this.apiResults.filter(
        (el) => el.branch === this.branchQuery
      );
      const filteredResults = new Set();
      branchResults.forEach((el) => {
        if (
          el.name
            .trim()
            .toLowerCase()
            .startsWith(this.searchQuery.toLowerCase())
        ) {
          filteredResults.add(el);
        }
      });
      if (filteredResults.size >= 10) {
        this.resultCount = 10;
        return Array.from(filteredResults).slice(0, 10);
      }

      branchResults.forEach((el) => {
        if (
          el.name
            .trim()
            .toLowerCase()
            .split(" ")
            .some((el) => el.startsWith(this.searchQuery.toLowerCase()))
        ) {
          filteredResults.add(el);
        }
      });
      if (filteredResults.size >= 10) {
        this.resultCount = 10;
        return Array.from(filteredResults).slice(0, 10);
      }

      branchResults.forEach((el) => {
        if (
          el.name.trim().toLowerCase().includes(this.searchQuery.toLowerCase())
        ) {
          filteredResults.add(el);
        }
      });
      if (filteredResults.size >= 10) {
        this.resultCount = 10;
        return Array.from(filteredResults).slice(0, 10);
      }
      this.resultCount = filteredResults.size;
      return filteredResults;
    },
  },
});
