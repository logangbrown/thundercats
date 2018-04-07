using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using Newtonsoft.Json;
using time_sucks.Models;

namespace time_sucks.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public string Hello()
        {
            MongoGateway dbGateway = new MongoGateway();

            //var collection = dbGateway.Users;
            //var list = collection.Find(_ => true).ToList();
            //return Newtonsoft.Json.JsonConvert.SerializeObject(list);



            //var list = DataAccess.GetUserList();
            //return Newtonsoft.Json.JsonConvert.SerializeObject(list);

          
           return Newtonsoft.Json.JsonConvert.SerializeObject(DataAccess.GetUser("Sky"));

            


            // return "Hello World";
        }

        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }

        [HttpPost]
        public IActionResult RegisterUser([FromBody]Object json)
        {
            String JsonString = json.ToString();
            User user = JsonConvert.DeserializeObject<User>(JsonString);

            //TODO: Add database information here and put the User in it
            return Ok();
        }

        [HttpPost]
        public IActionResult LoginUser([FromBody]Object json)
        {
            String JsonString = json.ToString();
            //Username and Password must be here, everything else can be empty
            User user = JsonConvert.DeserializeObject<User>(JsonString);

            //Check database for User and create a session

            /*
             * Query the database here
             * 
             * 
             * If (User.username == db.user && User.password == db.password)
             * {
             *      We found a user! Send them to the Dashboard and save their Session
             * }
             */
            HttpContext.Session.SetString("blah", "test");
            String asdf = HttpContext.Session.GetString("blah");
            return Ok();
        }

        /**
         * Create a logout method here that eliminates the session if a user logs out
         */
    }
}
