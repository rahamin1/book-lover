const firebaseStore = {

// Need to update Cats in the software
  "cats": {
    "shoshi@mail.com": {
      "Art": {
        image: "/assets/images/cats/arts.jpg"
      },
      "Fiction": {
        image: "/assets/images/cats/fictions.jpg"
      }
    },
    "yossi@mail.com": {}
  },

// Need to update Books in the software
  "bookList": {
    "shoshi@mail.com": {
      "20003": {
        catId: "Art"
      },
      "546786": {
        catId: "Fiction"
      }
    },
    "yossi@mail.com": {}
  },

// Need to update bookdetails in the software
  "bookDetails": {
    "20003": {
      title: "Caravaggio: The Complete Works",
      author: 'Sebastian Schütze',
      image: '/assets/images/arts/caravaggio.jpg',
      rating: 4,
      year: 999,
      description: ''
    },
    "546786": {}
  }
};
