module.exports = function(app) {
  app.dataSources.mysqlDs.automigrate('CoffeShop', function(err) {
    if (err) throw err;

    app.models.CoffeShop.create([{
      name: 'Bel Cafe',
      city: 'Vancouver'
    }, {
      name: 'Three Bees Coffee House',
      city: 'San Mateo'
    }, {
      name: 'Caffe Artigiano',
      city: 'Vancouver'
    }, ], function(err, coffeeShops) {
      if (err) throw err;

      console.log('Models created: \n', coffeeShops);
    });
  });
};
