const Author = require("./author.model.js");

exports.seedAuthors = () => {
  console.log("Seeding");
  const events = [
    { name: "Jorge Luis Borges" },
    { name: "Gabriel Garcia Marquez" },
    { name: "Franco Battista" },
    { name: "Alberto Arlt" }
  ];

  // use the Event model to insert/save
  for (event of events) {
    const author = new Author({
      name: event.name
    });

    author
      .save()
      .then(data => {
        console.log(data);
      })
      .catch(err => {
        console.log(err);
      });
  }
};
