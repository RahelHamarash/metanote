'use strict'

const BaseModel = use('MongooseModel')

/**
 * @class Notebookd
 */
class Notebook extends BaseModel {
  /**
   * Notebook's schema
   */
  static get schema () {
    return {

      notebook_title:{type:String},
      notes:[{note_title:{type:String} , blocks:{type:String} ,unique:{ type:String}}]}
  }
}

module.exports = Notebook.buildModel('Notebook')
