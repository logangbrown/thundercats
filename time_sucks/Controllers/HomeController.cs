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

        [HttpGet]
        public string Hello()
        {
            MongoGateway dbGateway = new MongoGateway();

            //var collection = dbGateway.Users;
            //var list = collection.Find(_ => true).ToList();
            //return Newtonsoft.Json.JsonConvert.SerializeObject(list);



            //var list = DataAccess.GetUserList();
            //return Newtonsoft.Json.JsonConvert.SerializeObject(list);


            return Newtonsoft.Json.JsonConvert.SerializeObject(DataAccess.GetUser("asdf"));




            // return "Hello World";
        }

        /// <summary>
        /// Returns the session for a given User. Otherwise returns null
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



            //put the User in the Database
            DataAccess.AddUser(user);

            //Check if user already exists?


            //Store Session information for this user using Username
            HttpContext.Session.SetObjectAsJson("user", user);

            return Ok();
        }

        [HttpPost]
        public IActionResult LoginUser([FromBody]Object json)
        {
         //   Dictionary<String, String> dict = new Dictionary<string, string>();
            String JsonString = json.ToString();
            //Username and Password must be here, everything else can be empty
            User user = JsonConvert.DeserializeObject<User>(JsonString);

            //Check database for User and create a session
            /*
             * Query the database here
             */
            User DBUser = JsonConvert.DeserializeObject<User>(Newtonsoft.Json.JsonConvert.SerializeObject(DataAccess.GetUser(user.username)));

            //return 404 if we dont have a user
            if (DBUser == null)
                return null; 



            if (user.username == DBUser.username && user.password == DBUser.password)
            {
                // We found a user! Send them to the Dashboard and save their Session
                HttpContext.Session.SetObjectAsJson("user", DBUser);
                return Ok();

            }

            return null;
            //HttpContext.Session.SetString("blah", "test");
            //String asdf = HttpContext.Session.GetString("blah");
            //return Ok();

            /*
             * This will be a test to determine if sessions are working, 
             * first, last, instructor
             */
            //if (user.UserName == "zedop")
            //{
            //    //  HttpContext.Session.Set("blah", dict);
            //    HttpContext.Session.SetObjectAsJson("zedop", user);

            //}



            //test to determine if session being removed correctly
            //   HttpContext.Session.Remove("zedop");
            // User blah = HttpContext.Session.GetObjectFromJson<User>("zedop");

            //Send object back instead of status code?
            //return fdsa;

        }

        /// <summary>
        /// Return a course based on the ID. Returns a course if successful 204 otherwise
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public IActionResult GetCourse([FromBody]Object json)
        {
            String JsonString = json.ToString();

            Course course = JsonConvert.DeserializeObject<Course>(JsonString);


            //Check database for Course based on ID
            Course DBCourse = DataAccess.GetDetailedCourse(course._id);

            //return 404 if we dont have a user
            if (DBCourse == null)
                return null;

            return Ok(DBCourse);

        }

        /// <summary>
        /// Updates a Course name
        /// </summary>
        /// <param name="json"></param>
        /// <returns></returns>
        [HttpPost]
        public IActionResult SaveCourse([FromBody]Object json)
        {
            String JsonString = json.ToString();

            Course course = JsonConvert.DeserializeObject<Course>(JsonString);


            //Send ID and course name to the DB
            DataAccess.UpdateCourse(course);



            //what will i get back?
            return Ok();
        }

        /// <summary>
        /// Return a Project based on the ID. Returns a Project if successful 204 otherwise
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public IActionResult Project([FromBody]Object json)
        {
            String JsonString = json.ToString();

            Project project = JsonConvert.DeserializeObject<Project>(JsonString);

            //Check database for Project based on ID
           Project DBProject = DataAccess.GetCourseProjects(project._id);

            //return 404 if we dont have a user
            if (DBProject == null)
                return null;

            return Ok(DBProject);

        }
        

        /// <summary>
        /// Update a Project name.
        /// </summary>
        /// <param name="json"></param>
        /// <returns></returns>
        [HttpPost]
        public IActionResult SaveProject([FromBody]Object json)
        {
            String JsonString = json.ToString();

            Project project = JsonConvert.DeserializeObject<Project>(JsonString);

            //Send DB ID and name
            DataAccess.UpdateProject(project);

            //What do I get back?
            return Ok();

        }


        /// <summary>
        /// Returns OK if a users session succesfully ended. 204 otherwise
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public IActionResult Logout()
        {
            HttpContext.Session.DestroySession<User>("user");
            //HttpContext.Session.Clear();

            User user = HttpContext.Session.GetObjectFromJson<User>("user");
            if (user == null)
            {
                return Ok();
            }
            else
            {
                return null;
            }

        }

    }
}
