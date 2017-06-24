import { Meteor } from 'meteor/meteor';

import '../imports/banco.js';
console.log(Sugestoes.find().count());

Meteor.startup(() => {
    // code to run on server at startup
});