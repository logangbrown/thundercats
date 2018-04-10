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
using time_sucks.Session;

namespace time_sucks.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        //[HttpGet]
        //public string Hello()
        //{
        //    MongoGateway dbGateway = new MongoGateway();

        //    //var collection = dbGateway.Users;
        //    //var list = collection.Find(_ => true).ToList();
        //    //return Newtonsoft.Json.JsonConvert.SerializeObject(list);



        //    //var list = DataAccess.GetUserList();
        //    //return Newtonsoft.Json.JsonConvert.SerializeObject(list);


        //    return Newtonsoft.Json.JsonConvert.SerializeObject(DataAccess.GetUser("Sky"));




        //    // return "Hello World";
        //}

        /// <summary>
        /// Returns the session for a given User
        /// </summary>
        /// <param name="username"></param>
        /// <returns></returns>
        [HttpGet]
        public User CheckSession()
        {
            User user = HttpContext.Session.GetObjectFromJson<User>("user");
            if (user != null)
            {
                return user;
            }
            else
            {
                return null;
            }

        }

        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }

        /// <summary>
        /// Registers a User, returns a 200 status code if successful
        /// </summary>
        /// <param name="json"></param>
        /// <returns></returns>
        [HttpPost]
        public IActionResult RegisterUser([FromBody]Object json)
        {
            String JsonString = json.ToString();
            User user = JsonConvert.DeserializeObject<User>(JsonString);

            //TODO: Add database information here and put the User in it

<<<<<<< HEAD
            DataAccess.AddUser(user);
=======

            //Store Session information for this user using Username
            HttpContext.Session.SetObjectAsJson(user.UserName, user);
>>>>>>> 4f260656f8a0221edd0c8404c3c3bda429994bdc

            return Ok();
        }

        [HttpPost]
        public IActionResult LoginUser([FromBody]Object json)
        {
            Dictionary<String, String> dict = new Dictionary<string, string>();
            String JsonString = json.ToString();
            //Username and Password must be here, everything else can be empty
            User user = JsonConvert.DeserializeObject<User>(JsonString);

            //Check database for User and create a session


            /*
             * Query the database here
             * 
             *  User dbUser = DataAccess.GetUser(user.UserName);
             *  
             *  if(dbUser != null)
             *  {
             *      if (user.UserName == dbUser.UserName && user.Password == dbUser.Password)
             *      {
             *          We found a user! Send them to the Dashboard and save their Session
             *      }
             *  }
             * 
             */
<<<<<<< HEAD

            HttpContext.Session.SetString("blah", "test");
            String asdf = HttpContext.Session.GetString("blah");
=======
            //HttpContext.Session.SetString("blah", "test");
            //String asdf = HttpContext.Session.GetString("blah");
            //return Ok();

            /*
             * This will be a test to determine if sessions are working, 
             * first, last, instructor
             */
            if (user.UserName == "zedop")
            {
                //  HttpContext.Session.Set("blah", dict);
                HttpContext.Session.SetObjectAsJson("zedop", user);

            }

            HttpContext.Session.SetObjectAsJson("user", user);

            User fdsa = HttpContext.Session.GetObjectFromJson<User>("zedop");
            string ID = HttpContext.Session.Id;

            //test to determine if session being removed correctly
            //   HttpContext.Session.Remove("zedop");
            // User blah = HttpContext.Session.GetObjectFromJson<User>("zedop");

>>>>>>> 4f260656f8a0221edd0c8404c3c3bda429994bdc
            return Ok();
            //Send object back instead of status code?
            //return fdsa;

        }

        /**
         * Create a logout method here that eliminates the session if a user logs out
         */
    }
}
