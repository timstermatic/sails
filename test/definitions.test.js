/**
 * definitions.test.js
 *
 * This module tests that basic waterline definitions create rules like they should.
 */

// Dependencies
var _ = require('underscore');
var parley = require('parley');
var async = require('async');
var assert = require("assert");

// Bootstrap waterline and get access to collections, especially User
var bootstrap = require('./bootstrap.test.js');
var User;

describe('definitions', function() {

	// Bootstrap waterline with default adapters and bundled test collections
	before(bootstrap.init);

	// Get User object ready to go before each test
	beforeEach(function() {
		return User = bootstrap.collections.user;
	});

	describe('createdAt', function() {
		it('should be on by default', function() {
			return User.adapter.createdAt;
		});

		it('should cause new schema to have a createdAt attribute', function(done) {
			User.adapter.describe('user',function (err,user) {
				console.log(user);
				if (err) return done(err);
				if (!(user && user.createdAt)) return done('User definition doesn\'t contain createdAt!');
				done(err);
			});
		});


		it('should cause new models to have a createdAt property', function(done) {
			User.create({},function (err,user) {
				if (err) return done(err);
				if (!(user && user.createdAt)) return done('User definition doesn\'t contain createdAt!');
				done(err);
			});
		});
	});

	describe('updatedAt', function() {
		it('should be on by default', function() {
			return User.adapter.updatedAt;
		});

		it('should cause new models to have an updatedAt property', function(done) {
			User.create({},function (err,user) {
				if (err) return done(err);
				if (!(user && user.updatedAt)) return done('User definition doesn\'t contain updatedAt!');
				done(err);
			});
		});
	});

	// When this suite of tests is complete, shut down waterline to allow other tests to run without conflicts
	after(bootstrap.teardown);
});