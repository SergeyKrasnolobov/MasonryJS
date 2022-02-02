import "../src/scss/style.scss";

const options = {
  0: {
    gap: 10,
    columns: 1,
  },
  700: {
    gap: 20,
    columns: 2,
  },
  1000: {
    gap: 20,
    columns: 3,
  },
};

new Masonry(document.getElementById("masonry"), options);
