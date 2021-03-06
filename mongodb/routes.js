const express = require("express");
const Todo = require('./models/todo');
const api = express.Router();

api.get("/todos", (req, res) => {
    const query = Todo.find({});
    query.exec(callback);
    function callback(error, data) {
        if (error) {
            console.log("error", error);
            res.status(500).send({ error: error });
            return;
        }
        res.status(200).send({ todo: data });
    }
});

api.get("/todo/:id", (req, res) => {
    // const findById = { _id: req.params.id }
    // const query = User.findOne(findById);
    const query = Todo.findById(req.params.id);
    query.exec(callback);
    function callback(error, data) {
        if (error) {
            console.log("error", error);
            res.status(500).send({ error: error });
            return;
        }
        res.status(200).send({ todo: data });
    }
});

api.post("/todo", function (req, res) {
    const todo = new Todo({ todo: req.body.todo });
    // var user = new User({
    //     username: 'Chris',
    //     password: 'sevilayha',
    //     email:'abc@gmail.com',
    //     displayName: 'displayName'
    // });
    todo.save(callback);
    function callback(error, data) {
        console.log("error", error, data);

        if (error) {
            console.log("error", error);
            res.status(500).send({ error: error });
            return;
        }
        res.status(200).send({ todo: data });
    }
});

api.put("/todo", function (req, res) {
    const findById = { _id: req.body._id }
    const update = { checked: req.body.checked }
    const query = Todo.update(findById, update);
    query.exec(callback);
    function callback(error, data) {
        if (error) {
            console.log("error", error);
            res.status(500).send({ error: error });
            return;
        }
        res.status(200).send({ todo: req.body });
    }
});

api.delete("/todo/:id", function (req, res) {
    const findById = { _id: req.params.id }
    const query = Todo.remove(findById);
    query.exec(callback);
    function callback(error, data) {
        if (error) {
            console.log("error", error);
            res.status(500).send({ error: error });
            return;
        }
        res.status(200).send({ todo: data });
    }
});



module.exports = api;