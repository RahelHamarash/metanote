'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with notebooks
 */
const Notebook = use('App/Models/Notebook')
let uniqid = require('uniqid');

class NotebookController {
  /**
   * Show a list of all notebooks.
   * GET notebooks
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async showNotebooks ({ request, response, view }) {

    const notebooks = await Notebook.find({})
    const notebooksExcluded = notebooks.map(notebook => {

      return { notebook_title:notebook.notebook_title , _id:notebook._id , notes:notebook.notes.map(note => {

        return {note_title:note.note_title , _id:note._id}
      }) }
    }) 

  
    response.json(notebooksExcluded)
  }
  

  /**
   * Create/save a new notebook.
   * POST notebooks
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async storeNotebook ({ request, response }) {

    const req = request.only(['notebook_title'])
    const notebook = new Notebook({

      notebook_title:req.notebook_title,
      notes:[]              
    }
  )

    await notebook.save()
    response.json({

      _id:notebook._id,
      notebook_title:notebook.notebook_title
    })
  }
  

  /**
   * store note.
   * PUT or PATCH notebooks/:id/notes
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */


  async storeNote({params,request,response}){

    const req = request.only(['note_title'])
    const id = params.id
    const unique = uniqid() 

    const notebook = await Notebook.findOneAndUpdate({_id:id},{$push:{notes:{note_title:req.note_title , blocks:[],unique:unique}}},{new:true})
    const note = notebook.notes.filter(note => {

      return note.unique === unique 
    })[0]

    response.json({_id:note._id , note_title:note.note_title})  

  }

  /**
   * Display a single notebook.
   * GET notebooks/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async showNotes({ params, request, response, view }) {

    const notebook = await Notebook.findById(params.id)

    const notes = notebook.notes.map(note => {

      return {_id:note._id , note_title:note.note_title , blocks:note.blocks}
    })
    response.json({

 
      _id:notebook._id,
      notebook_title:notebook.notebook_title,
      notes:notes
    })
  }

  async showNote({ params, request, response, view }) {

    const {notebook_id , note_id} = params

    const notebook = await Notebook.findById(notebook_id)
    const note = notebook.notes.filter(note => {

      return note._id == note_id
    })[0]

    response.json({
      
      _id:notebook._id,
      notebook_title:notebook.notebook_title,
      note:{

        _id:note._id,
        note_title:note.note_title,
        blocks:note.blocks
      }
      
    })
    
  }

  /**
   * Render a form to update an existing notebook.
   * GET notebooks/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */

  /**
   * Update notebook details.
   * PUT or PATCH notebooks/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async updateNote ({ params, request, response }) {

    const blocks = request.only("blocks").blocks
    const {notebook_id,note_id} = params
    await Notebook.updateOne({_id:notebook_id },{$set:{"notes.$[note].blocks":blocks}},{arrayFilters:[{'note._id':note_id}],new:true})
    response.json({

      status:true
    })

  }

  /**
   * Delete a notebook with id.
   * DELETE notebooks/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
}

module.exports = NotebookController
