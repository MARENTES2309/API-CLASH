'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})


Route.group(() => {
  Route.post('registro', '/app/Controllers/ClashJController.registro');
  Route.post('login', '/app/Controllers/ClashJController.login');
  Route.post('logout', '/app/Controllers/ClashJController.logout').middleware(['auth:api']);
  Route.post('buscarClan', '/app/Controllers/ClashJController.buscarClan').middleware(['auth:api']);
  Route.post('perfil', '/app/Controllers/ClashJController.perfil').middleware(['auth:api']);
  Route.post('sigcofre', '/app/Controllers/ClashJController.sigcofre').middleware(['auth:api']);
  Route.post('cartas', '/app/Controllers/ClashJController.cartas').middleware(['auth:api']);
}).prefix('api/clash');