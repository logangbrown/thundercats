using System;
using System.Collections.Generic;
using System.Diagnostics;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using time_sucks.Models;
using time_sucks.Session;
using System.Text;
using System.Security.Cryptography;


namespace time_sucks.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }

        public IActionResult Index()
        {
            return View();
        }
        #region Helper Functions
        /// <summary>
        /// Returns a hashed version of the passed password
        /// </summary>
        /// <returns></returns>
        public static string GenerateHash(string password)
        {
            SHA256 sha256 = SHA256Managed.Create();
            byte[] bytes = Encoding.UTF8.GetBytes(password);
            byte[] hash = sha256.ComputeHash(bytes);
            return Convert.ToBase64String(hash);
        }

        /// <summary>
        /// Returns the courseID for the passed groupID
        /// </summary>
        /// <returns></returns>
        public int GetCourseForGroup(int groupID)
        {
            return DBHelper.GetCourseForGroup(groupID);
        }

        /// <summary>
        /// Returns the currently logged in user's userID.
        /// </summary>
        /// <returns></returns>
        public int GetUserID()
        {
            User user = HttpContext.Session.GetObjectFromJson<User>("user");

            if (user != null)
            {
                return user.userID;
            }

            return 0;
        }

        /// <summary>
        /// Returns the currently logged in user's type. Otherwise returns null character.
        /// </summary>
        /// <returns></returns>
        public char GetUserType()
        {
            User user = HttpContext.Session.GetObjectFromJson<User>("user");

            if (user != null)
            {
                return user.type;
            }

            return '\0'; //Null character literal
        }
        /// <summary>
        /// Returns true if the currently logged in user is an Admin
        /// </summary>
        /// <returns></returns>
        public bool IsAdmin()
        {
            User user = HttpContext.Session.GetObjectFromJson<User>("user");

            if (user != null)
            {
                return user.type == 'A';
            }

            return false;
        }

        /// <summary>
        /// Returns true if the logged in user is the instructor for the passed courseID
        /// </summary>
        /// <returns></returns>
        public bool IsInstructorForCourse(int courseID)
        {
            User user = HttpContext.Session.GetObjectFromJson<User>("user");

            if (user != null)
            {
                return user.userID == DBHelper.GetInstructorForCourse(courseID);
            }

            return false;
        }

        /// <summary>
        /// Returns true if the logged in user is a student for the passed courseID
        /// </summary>
        /// <returns></returns>
        public bool IsStudentInCourse(int courseID)
        {
            User user = HttpContext.Session.GetObjectFromJson<User>("user");

            if (user != null)
            {
                return DBHelper.UserIsInCourse(courseID, user.userID);
            }

            return false;
        }

        /// <summary>
        /// Returns true if the user is already in a group
        /// </summary>
        /// <returns></returns>
        public bool IsStudentInGroup(int groupID)
        {
            User user = HttpContext.Session.GetObjectFromJson<User>("user");

            if (user != null)
            {
                return DBHelper.IsUserInGroup(user.userID, groupID);
            }
            return false;
        }

        /// <summary>
        /// Returns true if the user is already in a group
        /// </summary>
        /// <returns></returns>
        public bool IsStudentInGroupForProject(int projectID)
        {
            User user = HttpContext.Session.GetObjectFromJson<User>("user");

            if (user != null)
            {
                return DBHelper.IsUserInGroupForProject(user.userID, projectID);
            }
            return false;
        }
        #endregion

        #region Endpoints
        /// <summary>
        /// Add a course. Returns the course ID
        /// </summary>
        /// <param name="json"></param>
        /// <returns></returns>
        [HttpPost]
        public IActionResult AddCourse([FromBody]Object json)
        {
            String JsonString = json.ToString();
            Course course = new Course();
            User user = JsonConvert.DeserializeObject<User>(JsonString);

            if (GetUserType() == 'I' || IsAdmin())
            {
                course.instructorName = user.firstName + " " + user.lastName;
                course.instructorID = user.userID;
                course.courseID = (int)DBHelper.CreateCourse(course);
                return Ok(course.courseID);
            }
            return null;
        }

        [HttpPost]
        public IActionResult ChangePassword([FromBody]Object json)
        {
            String JsonString = json.ToString();
            User user = JsonConvert.DeserializeObject<User>(JsonString);
            user.password = GenerateHash(user.password);
            user.newPassword = GenerateHash(user.newPassword);

            if (IsAdmin())
            {
                if (DBHelper.ChangePasswordA(user)) return Ok();
                return StatusCode(500); //Query failed
            }
            else if (user.userID == GetUserID())
            {
                if (DBHelper.ChangePassword(user)) return Ok();
                return StatusCode(500); //Query failed
            }
            return Unauthorized(); //Not an Admin or the current user, Unathorized (401)
        }

        /// <summary>
        /// Updates the passed user in the database
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public IActionResult ChangeUser([FromBody]Object json)
        {
            String JsonString = json.ToString();
            User user = JsonConvert.DeserializeObject<User>(JsonString);
            if (user.username == null || user.username.Length < 1)
            {
                return StatusCode(400); //Didn't pass a valid username, Bad Request (400)
            }
            user.username = user.username.ToLower();
            User checkUser = DBHelper.GetUser(user.username);
            if (checkUser != null && checkUser.userID != user.userID)
            {
                return StatusCode(403); //Username already exists, Forbidden (403)
            }

            if (IsAdmin())
            {
                if (DBHelper.ChangeUserA(user)) return Ok();
                return StatusCode(500); //Query failed
            }
            else if (user.userID == GetUserID())
            {
                if (DBHelper.ChangeUser(user)) return Ok();
                return StatusCode(500); //Query failed
            }
            return Unauthorized(); //Not an Admin or the current user, Unauthorized (401)
        }

        /// <summary>
        /// Returns the logged in user if there is one.
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

        public IActionResult CreateGroup([FromBody]Object json)
        {
            String JsonString = json.ToString();

            Group group = new Group();
            Project project = JsonConvert.DeserializeObject<Project>(JsonString);

            if (IsAdmin() || IsInstructorForCourse(project.CourseID) || IsStudentInCourse(project.CourseID))
            {
                if (GetUserType() == 'S' && !IsStudentInGroupForProject(project.projectID))
                {
                    group.groupID = (int)DBHelper.CreateGroup(project.projectID);
                    DBHelper.JoinGroup(GetUserID(), group.groupID);
                }
                else
                {
                    group.groupID = (int)DBHelper.CreateGroup(project.projectID);
                }
                return Ok(group.groupID);
            }
            return null;
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
        /// Deletes the passed user and course association
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public IActionResult DeleteUserCourse([FromBody]Object json)
        {
            String JsonString = json.ToString();
            uCourse uCourse = JsonConvert.DeserializeObject<uCourse>(JsonString);
            if (IsAdmin() || IsInstructorForCourse(uCourse.courseID))
            {
                if (DBHelper.DeleteUserCourse(uCourse.userID, uCourse.courseID)) return Ok();
                return StatusCode(500); //Query failed
            }

            return Unauthorized(); //Not an Admin or the Instructor for the course, Unauthorized (401)
        }

        /// <summary>
        /// Get a course and its projects and users
        /// </summary>
        /// <param name="json"></param>
        /// <returns></returns>
        [HttpPost]
        public IActionResult GetCourse([FromBody]Object json)
        {
            String JsonString = json.ToString();
            Course course = JsonConvert.DeserializeObject<Course>(JsonString);

            Course retreivedCourse = DBHelper.GetCourse(course.courseID);

            return Ok(retreivedCourse);
        }

        /// <summary>
        /// Get a list of all the courses
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public IActionResult GetCourses()
        {
            List<Course> allCourses = DBHelper.GetCourses();
            return Ok(allCourses);
        }

        /// <summary>
        ///
        /// </summary>
        /// <param name="userID"></param>
        /// <returns></returns>
        [HttpPost]
        public IActionResult GetGroup([FromBody]Object json)
        {
            String JsonString = json.ToString();
            String requestedGroupStr = JsonConvert.DeserializeObject<String>(JsonString);
            Group requestedGroup = new Group();
            requestedGroup.groupID = Int32.Parse(requestedGroupStr);

            //Make sure that the user is part of the groups course
            if (IsStudentInCourse(GetCourseForGroup(requestedGroup.groupID)) || IsAdmin())
            {
                requestedGroup = DBHelper.GetGroup(requestedGroup.groupID);
                return Ok(requestedGroup);
            }

            return NoContent();
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
                User dbUser = DBHelper.GetUserByID(sentUser.userID);
                return Ok(dbUser);
            }
            else
            {
                return NoContent();
            }
        }

        /// <summary>
        /// Returns all users in the system after verifying access.
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public IActionResult GetUsers()
        {
            User user = HttpContext.Session.GetObjectFromJson<User>("user");

            //checks if user is admin
            if (IsAdmin())
            {
                List<User> users = DBHelper.GetUsers();
                return Ok(users);
            }

            return NoContent();


        }

        [HttpPost]
        public IActionResult JoinCourse([FromBody]Object json)
        {
            String JsonString = json.ToString();

            User user = HttpContext.Session.GetObjectFromJson<User>("user");
            Course course = JsonConvert.DeserializeObject<Course>(JsonString);

            if (DBHelper.JoinCourse(user.userID, course.courseID)) return Ok();
            return StatusCode(500); //Query failed

        }

        [HttpPost]
        public IActionResult JoinGroup([FromBody]Object json)
        {
            String JsonString = json.ToString();
            uGroups uGroups = JsonConvert.DeserializeObject<uGroups>(JsonString);

            User user = HttpContext.Session.GetObjectFromJson<User>("user");

            //TODO We need to make sure that the user isn't in any groups on the project as well
            if (IsStudentInGroup(uGroups.groupID)) return Unauthorized();

            if (IsStudentInCourse(GetCourseForGroup(uGroups.groupID)))
            {
                //TODO define DBHelper.JoinGroup()
                long groupID = DBHelper.JoinGroup(user.userID, uGroups.groupID);
                if (groupID > 0) return Ok(groupID);
                return StatusCode(500); //Query failed
            }

            return Unauthorized(); //User not in Course
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
            if (DBHelper.GetUser(user.username) != null)
            {
                user.password = GenerateHash(user.password);
                DBUser = DBHelper.GetUser(user.username, user.password);
            }
            else
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

            if (user.username.ToLower() == DBUser.username)
            {
                // We found a user! Send them to the Dashboard and save their Session
                HttpContext.Session.SetObjectAsJson("user", DBUser);
                return Ok();
            }
            return null;
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
            if (DBHelper.GetUser(user.username) != null)
            {
                return NoContent();
            }

            user.password = GenerateHash(user.password);

            //put the User in the Database, set the userID to be the returned value
            user.userID = (int)DBHelper.AddUser(user);

            //If the userID is 0, the query must have failed throw an error to the front end
            if (user.userID == 0) return Error();

            //Store Session information for this user using Username
            HttpContext.Session.SetObjectAsJson("user", user);

            return Ok();
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

            if (IsAdmin() || IsInstructorForCourse(course.courseID))
            {
                if (DBHelper.SaveCourse(course)) return Ok();
                return StatusCode(500); //Query failed
            }
            return Unauthorized(); //Not an Admin or the Instructor for the course, Unauthorized (401)
        }

        /// <summary>
        /// Updates a Group name.
        /// </summary>
        /// <param name="json"></param>
        /// <returns></returns>
        [HttpPost]
        public IActionResult SaveGroup([FromBody]Object json)
        {
            String JsonString = json.ToString();

            Group group = JsonConvert.DeserializeObject<Group>(JsonString);
            Course course = JsonConvert.DeserializeObject<Course>(JsonString);

            if (IsAdmin() || IsInstructorForCourse(course.courseID))
            {
                if (DBHelper.SaveGroup(group)) return Ok();
                return StatusCode(500); // Query failed
            }
            return Unauthorized(); // Not an Admin or the Instructor for the course, Unauthorized (401)
        }

        //}
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
            Course course = JsonConvert.DeserializeObject<Course>(JsonString);

            if (IsAdmin() || IsInstructorForCourse(course.courseID))
            {
                if (DBHelper.SaveProject(project)) return Ok();
                return StatusCode(500); // Query failed
            }
            return Unauthorized(); // Not an Admin or the Instructor for the course, Unauthorized (401)
        }

        [HttpPost]
        public IActionResult SaveTime([FromBody]Object json)
        {
            String JsonString = json.ToString();

            User user = HttpContext.Session.GetObjectFromJson<User>("user");
            TimeCard timeCards = JsonConvert.DeserializeObject<TimeCard>(JsonString);

            if (IsAdmin() || user.userID == timeCards.userID)
            {
               if (DBHelper.SaveTime(timeCards)) return Ok();
                return StatusCode(500);
            }
            return Unauthorized();


        }
        ///// <summary>
        ///// Return a course based on the ID. Returns a course if successful null otherwise
        ///// </summary>
        ///// <returns></returns>
        //[HttpPost]
        //public IActionResult GetCourse([FromBody]Object json)
        //{
        //    String JsonString = json.ToString();

        //    Course course = JsonConvert.DeserializeObject<Course>(JsonString);


        //    //Check database for Course based on ID
        //    //Course DBCourse = DataAccess.GetDetailedCourse(course._id);
        //    Course DBCourse = null;

        //    //return null if we dont have a user
        //    if (DBCourse == null)
        //        return null;

        //    return Ok(DBCourse);
        #endregion
    }
}
