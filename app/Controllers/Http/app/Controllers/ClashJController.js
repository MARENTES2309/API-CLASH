'use strict'

const User = use('App/Models/User');
const Client = require('node-rest-client').Client;
const tokenClash = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjdiZjNlMzk1LTFkNzUtNGM0Mi1hYTUwLWJmZDk2MGI0MDk5NSIsImlhdCI6MTU3MDIwMjYzNywic3ViIjoiZGV2ZWxvcGVyL2E0MjgwY2RkLTY2OWEtNTJjYi1lMzdhLTk1ZTY0NWI2MTk0NiIsInNjb3BlcyI6WyJyb3lhbGUiXSwibGltaXRzIjpbeyJ0aWVyIjoiZGV2ZWxvcGVyL3NpbHZlciIsInR5cGUiOiJ0aHJvdHRsaW5nIn0seyJjaWRycyI6WyIxODcuMTg4LjE5MS4xMDMiXSwidHlwZSI6ImNsaWVudCJ9XX0.DQuiUapeT3LabAPCo_gEcCwJwUPe_E44BWaYcVrIKJTfsuUyyQ95jsmjkAd07JnDdMwTiKl6hcA2z2PRQ2HInQ';
class ClashJController {

    async login ({request,response, auth }) {
        let objeto = request.all();
        try {
            const token = await auth.attempt(objeto. email,objeto.password);
            return response.status(201).json(token);
          } catch (error) {
              return response.status(401).json({mensaje:'info no confirmada',error:error});
          }
      }

    async registro({request,response}){
        let user=new User();
        let objeto=request.all();
 
        user.username    = objeto.username;
        user.email       = objeto.email;
        user.password    = objeto.password;
 
        try {
         let data = await user.save();
         if (data) {
             return response.status(201).json(user);
         }
        } catch (error){
            return response.status(400).json({mensaje:'informacion equivocada',error:error});
 
        }
     }

     async logout ({auth,response,request}){
             
        try{
            // const req = await request.all()
            const apiToken = await auth.user;
            await auth.authenticator('api').revokeTokens([apiToken])                
                return response.status(201).json({message:"La sesion se ha cerrado"})
        }   
        catch(error){
            return response.status(400).json({mensaje:"Datos no validos",error:error})
        } 
    }

    async buscarClan({ request, response }) {

        const clanTag = await request.all();

        let args = {
            data: {  },
            headers: { "Content-Type": "application/json", "Authorization": "Bearer " + tokenClash }
        };

        let client = new Client();

        let obj = function () {
            return new Promise(function (resolve, reject) {
                client.get(`https://api.clashroyale.com/v1/clans?name=${clanTag.NombreClan}`, args, function (data, res) {
                    resolve(data);
                })
            });
        };

        let result = await obj();
        return response.status(200).json(result);
    }

    async perfil({ request, response }) {

        const memberTag = await request.all();

        let args = {
            data: { },
            headers: { "Content-Type": "application/json", "Authorization": "Bearer " + tokenClash }
        };

        let client = new Client();

        let obj = function () {
            return new Promise(function (resolve, reject) {
                client.get(`https://api.clashroyale.com/v1/players/%23${memberTag.memberTag}`, args, function (data, res) {
                    resolve(data);
                })
            });
        };

        let result = await obj();
        return response.status(200).json(result);
    }

    async sigcofre({ request, response }) {

        const memberTag = await request.all();

        let args = {
            data: { },
            headers: { "Content-Type": "application/json", "Authorization": "Bearer " + tokenClash }
        };

        let client = new Client();

        let obj = function () {
            return new Promise(function (resolve, reject) {
                client.get(`https://api.clashroyale.com/v1/players/%23${memberTag.memberTag}/upcomingchests`, args, function (data, res) {
                    resolve(data);
                })
            });
        };

        let result = await obj();
        return response.status(200).json(result);
    }

    async cartas({ response }) {

        let args = {
            data: { },
            headers: { "Content-Type": "application/json", "Authorization": "Bearer " + tokenClash }
        };

        let client = new Client();

        let obj = function () {
            return new Promise(function (resolve, reject) {
                client.get(`https://api.clashroyale.com/v1/cards`, args, function (data, res) {
                    resolve(data);
                })
            });
        };

        let result = await obj();
        return response.status(200).json(result);
    }
}

module.exports = ClashJController
