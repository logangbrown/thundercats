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

        /// <summary>
        /// Returns if the current user is an instructor. Otherwise returns null
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public bool CheckInstructor()
        {
            User user = HttpContext.Session.GetObjectFromJson<User>("user");
            
            if (user.isInstructor == true)
            {
                return true;
            }
            else
            {
                return false;
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

            //Check if user already exists
            if (DataAccess.GetUser(user.username) != null)
            {
                return null;
            }

            //put the User in the Database
            DataAccess.AddUser(user);



            //Store Session information for this user using Username
            HttpContext.Session.SetObjectAsJson("user", user);

            return Ok();
        }

        /// <summary>
        /// Allows a user to log in. Returns a 200 if successful, null otherwise
        /// </summary>
        /// <param name="json"></param>
        /// <returns></returns>
        [HttpPost]
        public IActionResult LoginUser([FromBody]Object json)
        {
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

        }

        /// <summary>
        /// Add a course. Returns the course ID
        /// </summary>
        /// <param name="json"></param>
        /// <returns></returns>
        [HttpPost]
        public IActionResult AddCourse([FromBody]Object json)
        {
            String CourseID = null;
            String JsonString = json.ToString();

            Course course = JsonConvert.DeserializeObject<Course>(JsonString);

            User user = HttpContext.Session.GetObjectFromJson<User>("user");

            if (user.isInstructor == true)
            {
                CourseID = DataAccess.AddCourse(user._id.ToString());
                return Ok(CourseID);

            }

            return null;

        }


        /// <summary>
        /// Return a course based on the ID. Returns a course if successful null otherwise
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public IActionResult GetCourse([FromBody]Object json)
        {
            String JsonString = json.ToString();

            Course course = JsonConvert.DeserializeObject<Course>(JsonString);


            //Check database for Course based on ID
            Course DBCourse = DataAccess.GetDetailedCourse(course._id);

            //return null if we dont have a user
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



            return Ok();
        }

        /// <summary>
        /// Get a list of all the courses
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public IActionResult Courses()
        { 
            List<Course> allCourses = DataAccess.GetCourses();

            return Ok(allCourses);
        }

        /// <summary>
        /// Creates a project given a project object. Returns the project ID
        /// </summary>
        /// <param name="json"></param>
        /// <returns></returns>
        [HttpPost]
        public IActionResult CreateProject([FromBody]Object json)
        {
            String JsonString = json.ToString();

            Course course = JsonConvert.DeserializeObject<Course>(JsonString);


            String DBProjectID = DataAccess.AddProject(course._id);

            return Ok(DBProjectID);
        }

        /// <summary>
        /// Return a Project based on the ID. Returns a Project if successful 204 otherwise
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public IActionResult Project([FromBody]Object json)
        {
            String JsonString = json.ToString();

            Project project = JsonConvert.DeserializeObject<Project>(JsonString);

            //Check database for Project based on ID
           Project DBProject = DataAccess.GetProject(project._id);

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
