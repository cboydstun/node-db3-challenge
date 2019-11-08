const db = require('../data/dbConfig');

// Returns all schemes in the database.
const find = () =>{
    return db('schemes')
    .select('*')
};

// Returns the scheme with the matching id in the database.
const findById = id =>{
    return db('schemes')
    .select('*')
    .where({id})
    .first();
};

// Returns the steps for a scheme based on the scheme id.
const findSteps = id =>{
    return db
    .select('steps.*')
    .from('steps')
    .join('schemes', 'schemes.id', '=', 'steps.scheme_id')
    .where('schemes.id', id)
    .orderBy('steps.step_number');
};

//Returns the id of the new scheme added to the database.
const add = scheme =>{
    return db('schemes', 'id')
    .insert(scheme)
    .then(id => findById(...id));
};

// Returns the changes count and updates the information
const update = (changes, id) =>{
    return db('schemes')
    .where('id', id)
    .update(changes, '*')
    .then(count => findById(id));
};

// Returns the number of schemes deleted.
const remove = id =>{
    return db('schemes')
    .where({id})
    .delete();
};

module.exports = {
    find,
    findById,
    findSteps,
    add,
    update,
    remove,
};