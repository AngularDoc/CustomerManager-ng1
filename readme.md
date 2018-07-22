﻿Customer Manager with AngularJS
===============
This repo was adapted from https://github.com/DanWahlin/CustomerManagerStandard, for the purpose of demonstrating the AngularJS migration using Angular Copilot.

* Open a command prompt and navigate to the CustomerManager/server directory
* Run 'npm install'
* Navigate to the CustomerManager/client directory
* Run 'npm install' and then 'bower install'
* Navigate to the CustomerManager directory
* Run 'docker-compose build'
* Run 'docker-compose up'

If this is the first time that the API service is run, you'll need to seed the mongodb with some customer data. To do so, run this command in a separate terminal: `docker-compose -f docker-compose-mongo-seed.yml up`
