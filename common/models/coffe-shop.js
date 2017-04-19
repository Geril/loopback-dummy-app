'use strict';

module.exports = function(Coffeshop) {
  Coffeshop.status = function(cb) {
    var currentDate = new Date();
    var currentHour = currentDate.getHours();
    var OPEN_HOUR = 6;
    var CLOSE_HOUR = 20;
    console.log('Current hour is %d', currentHour);
    var response;
    if (currentHour > OPEN_HOUR && currentHour < CLOSE_HOUR) {
      response = 'We are open for business.';
    } else {
      response = 'Sorry, we are closed. Open daily from 6am to 8pm.';
    }
    cb(null, response);
  };

  Coffeshop.getName = function(shopId, cb) {
    Coffeshop.findById(shopId, function(err, instance) {
      var reponse;
      if (instance) {
        reponse = 'Name of coffe shop is: ' + instance.name;
        cb(null, reponse);
      } else {
        cb({message: 'There is no record with an id: ' + shopId + ' in our DB'});
      }
      console.log(reponse);
    });
  };

  Coffeshop.remoteMethod(
    'status', {
      http: {
        path: '/status',
        verb: 'get',
      },
      returns: {
        arg: 'status',
        type: 'string',
      },
    }
  );

  Coffeshop.remoteMethod(
      'getName', {
        http: {
          path: '/getname',
          verb: 'get',
          errorStatus: 400,
        },
        accepts: {
          arg: 'id',
          type: 'number',
          http: {
            source: 'query',
          },
        },
        returns: {
          arg: 'name',
          type: 'string',
        },
      }
  );
};
