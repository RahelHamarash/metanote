'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */


const Route = use('Route')

Route.on('/').render('welcome')
//notebooks operations
Route.get('/notebooks','NotebookController.showNotebooks')
Route.post('/notebooks','NotebookController.storeNotebook')
//notes operations
Route.get('/notebooks/:id/notes','NotebookController.showNotes')
Route.post('/notebooks/:id/notes','NotebookController.storeNote')
//note operations
Route.get('/notebooks/:notebook_id/notes/:note_id/show','NotebookController.showNote')
Route.put('/notebooks/:notebook_id/notes/:note_id','NotebookController.updateNote')
