/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /exams              ->  index
 * POST    /exams              ->  create
 * GET     /exams/:id          ->  show
 * PUT     /exams/:id          ->  update
 * DELETE  /exams/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Exam = require('./exam.model');

// Get list of exams
exports.index = function(req, res) {
  Exam.find(function (err, exams) {
    if(err) { return handleError(res, err); }
    return res.json(200, exams);
  });
};

// Get a single exam
exports.show = function(req, res) {
  Exam.findById(req.params.id, function (err, exam) {
    if(err) { return handleError(res, err); }
    if(!exam) { return res.send(404); }
    return res.json(exam);
  });
};

// Creates a new exam in the DB.
exports.create = function(req, res) {
  Exam.create(req.body, function(err, exam) {
    if(err) { return handleError(res, err); }
    return res.json(201, exam);
  });
};

// Updates an existing exam in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Exam.findById(req.params.id, function (err, exam) {
    if (err) { return handleError(res, err); }
    if(!exam) { return res.send(404); }
    var updated = _.merge(exam, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, exam);
    });
  });
};

// Deletes a exam from the DB.
exports.destroy = function(req, res) {
  Exam.findById(req.params.id, function (err, exam) {
    if(err) { return handleError(res, err); }
    if(!exam) { return res.send(404); }
    exam.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
