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

        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
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



        //    return Newtonsoft.Json.JsonConvert.SerializeObject(DataAccess.GetUser("asdf"));




        //    // return "Hello World";
        //}


        #region REST Endpoints
        /// <summary>
        /// Returns the session for a given User. Otherwise returns null
        /// </summary>
        /// <param name="username"></param>
        /// <returns></returns>
        [HttpGet]
        public IActionResult CheckSession()
        {
            User user = HttpContext.Session.GetObjectFromJson<User>("user");
            if (user != null)
            {
                return Ok(user);
            }
            else
            {
                return Unauthorized(); //Unauthorized (401) if there isn't a user in the session
            }
        }

        /// <summary>
        /// Returns the currently logged in user's type. Otherwise returns null character
        /// </summary>
        /// <returns></returns>
        public char getPermission()
        {
            User user = HttpContext.Session.GetObjectFromJson<User>("user");

            if(user != null)
            {
                return user.type;
            }

            return '\0'; //Null character literal
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
            if (DBHelper.getUser(user.username) != null)
            {
                return NoContent();
            }

            //put the User in the Database, set the userID to be the returned value
            user.userID = (int)DBHelper.addUser(user);

            //If the userID is 0, the query must have failed throw an error to the front end
            if (user.userID == 0) return Error();

            //Store Session information for this user using Username
            HttpContext.Session.SetObjectAsJson("user", user);

            return Ok();
        }
        
        

        [HttpGet]
        public IActionResult GetUsers()
        {
            User user = HttpContext.Session.GetObjectFromJson<User>("user");

            //checks if user is admin
            if(getPermission() == 'A')
            {
                List<User> users = DBHelper.getUsers();
                return Ok(users);
            }

            return NoContent();

       
        }

        /// <summary>
        /// Allows a user to log in. Returns an OK (200) if successful, No Content (204) if the
        /// username doesn't exist, and Unauthorized (401) if the password is incorrect
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

            //Check if the user exists
            User DBUser = null;
            if(DBHelper.getUser(user.username) != null)
            {
                DBUser = DBHelper.getUser(user.username, user.password);
            } else
            {
                //return No Content (204) if there isn't a user
                return NoContent();
            }

            //return Unauthorized (401) if the password is wrong
            if (DBUser == null)
                return Unauthorized();

            //return Forbidden (403) if the user's account isn't active
            if (!DBUser.isActive)
                return StatusCode(403);

            if (user.username == DBUser.username)
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
            int CourseID = 0;
            String JsonString = json.ToString();

            Course course = JsonConvert.DeserializeObject<Course>(JsonString);

            User user = HttpContext.Session.GetObjectFromJson<User>("user");

            if (user.type == 'I' || user.type == 'A')
            {
                //TODO
                //CourseID = DataAccess.AddCourse(user.userID.ToString());
                CourseID = 0;
                return Ok(CourseID);

            }

            return null;

        }

        [HttpPost]
        public IActionResult ChangeUser([FromBody]Object json)
        {
            String JsonString = json.ToString();
            User user = JsonConvert.DeserializeObject<User>(JsonString);
            if (getPermission() == 'A')
            {
                DBHelper.changeUser(user);
                return Ok();
            }
            return NoContent();
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
            //Course DBCourse = DataAccess.GetDetailedCourse(course._id);
            Course DBCourse = null;

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
            //TODO
            //DataAccess.UpdateCourse(course);



            return Ok();
        }
        
        [HttpPost]
        public IActionResult DeleteUserCourse([FromBody]Object json)
        {
            String JsonString = json.ToString();
            uCourse uCourse = JsonConvert.DeserializeObject<uCourse>(JsonString);
            if (getPermission() == 'A')
            {
                DBHelper.deleteUserCourse(uCourse.userID, uCourse.courseID);
                return Ok();
            }

            return NoContent();
        }

        /// <summary>
        /// Get a list of all the courses
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public IActionResult GetCourses()
        {
            //TODO
            //List<Course> allCourses = DataAccess.GetCourses();
            List<Course> allCourses = null;

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

            //TODO
            //String DBProjectID = DataAccess.AddProject(course._id);
            int DBProjectID = 0;

            return Ok(DBProjectID);
        }

        /// <summary>
        /// Return a Project based on the ID. Returns a Project if successful 204 otherwise
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public IActionResult GetProject([FromBody]Object json)
        {
            String JsonString = json.ToString();

            Project project = JsonConvert.DeserializeObject<Project>(JsonString);

            //Check database for Project based on ID
            //TODO
            //Project DBProject = DataAccess.GetProject(project._id);
            Project DBProject = null;

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
            //TODO
            //DataAccess.UpdateProject(project);

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

        /// <summary>
        /// Returns OK if admmin or ID's match
        /// </summary>
        /// <param name="userID"></param>
        /// <returns></returns>
        [HttpPost]
        public IActionResult GetUser([FromBody]Object json)
        {
            String JsonString = json.ToString();
            User sentUser = JsonConvert.DeserializeObject<User>(JsonString);
            User currentUser = HttpContext.Session.GetObjectFromJson<User>("user");
            if (currentUser.type == 'A' || currentUser.userID == sentUser.userID)
            {
                User dbUser = DBHelper.getUserByID(sentUser.userID);
                return Ok(dbUser);
            }
            else
            {
                return NoContent();
            }
        }
        #endregion

    }
}
