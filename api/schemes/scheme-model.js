const db = require('../../data/db-config');
function find() {
    return db('schemes as sc')
    .leftJoin('steps as st', 'sc.scheme_id', 'st.scheme_id')
    .select('sc.*')
    .count('st.step_id as number_of_steps')
    .groupBy('sc.scheme_id')
    .orderBy('sc.scheme_id','asc')
}

async function findById(scheme_id) { // EXERCISE B
  /*
  */
      const rawScheme = await db('schemes as sc')
      .leftJoin('steps as st', 'sc.scheme_id', 'st.scheme_id')
      .where('sc.scheme_id', scheme_id)
      .select('st.*', 'sc.scheme_name', 'sc.scheme_id')
      .orderBy('st.step_number','asc')

      const reformedScheme = {
        scheme_id: rawScheme[0].scheme_id,
        scheme_name: rawScheme[0].scheme_name,
        steps: [],
      };
      rawScheme.forEach(each => {
        if (each.step_id) {
          reformedScheme.steps.push({
            step_id: each.step_id,
            step_number: each.step_number,
            instructions: each.instructions,
          })
        }
      })
      return reformedScheme;    
}

async function findSteps(scheme_id) { // EXERCISE C
  /*
    1C- Build a query in Knex that returns the following data.
    The steps should be sorted by step_number, and the array
    should be empty if there are no steps for the scheme:

      [
        {
          "step_id": 5,
          "step_number": 1,
          "instructions": "collect all the sheep in Scotland",
          "scheme_name": "Get Rich Quick"
        },
        {
          "step_id": 4,
          "step_number": 2,
          "instructions": "profit",
          "scheme_name": "Get Rich Quick"
        }
      ]
  */
      const steps = await db('schemes as sc')
        .leftJoin('steps as st', 'sc.scheme_id','st.scheme_id')
        .select('st.step_id', 'st.step_number', 'st.instructions', 'sc.scheme_name')
        .where('sc.scheme_id', scheme_id)
        .orderBy('step_number', 'asc');
      if (!steps[0].step_id) {
        return []
      } else {
        return steps
      }
}

function add(scheme) { // EXERCISE D
  /*
    1D- This function creates a new scheme and resolves to _the newly created scheme_.
  */
 return db('schemes').insert(scheme)
  .then(([scheme_id]) => {
    return db('schemes')
      .where('scheme_id', scheme_id)
      .first()
  });
}

function addStep(scheme_id, step) { // EXERCISE E
  /*
    1E- This function adds a step to the scheme with the given `scheme_id`
    and resolves to _all the steps_ belonging to the given `scheme_id`,
    including the newly created one.
  */
}

module.exports = {
  find,
  findById,
  findSteps,
  add,
  addStep,
}
