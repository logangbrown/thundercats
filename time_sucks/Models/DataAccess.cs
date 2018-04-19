using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace time_sucks.Models
{
    public static class DataAccess
    {
        #region UserRequests
        public static List<User> GetUserList()
        {
            MongoGateway dbGateway = new MongoGateway();
            
            var userCollection = dbGateway.Users;
            // collection.InsertOne(document);
            var list = userCollection.Find(_ => true).ToList();
            return list;

        }

        public static User GetUser(string username)
        {
            MongoGateway dbGateway = new MongoGateway();

            var filter = Builders<User>.Filter.Eq("username", username);

            User user = dbGateway.Users.Find(filter).FirstOrDefault();

            return user;

         }


            public static void AddUser(User user)
        {
            MongoGateway dbGateway = new MongoGateway();
            var userCollection = dbGateway.Users;

            userCollection.InsertOne(user);
           // var id = newUser._id;

        }
        #endregion


        #region CourseRequests
        public static string AddCourse( Course course ) // add course with passed course object
        {
            MongoGateway dbGateway = new MongoGateway();

            var courseCollection = dbGateway.Courses;
            var fullCollection = dbGateway.FullCollection;


            //var newCourse = course;

            courseCollection.InsertOne(course);
            var id = course._id;


            fullCollection.InsertOne(course);
            return id;

        }

        public static string AddCourse(String name, String instID) // add course with passed name and Instructor ID
        {
            MongoGateway dbGateway = new MongoGateway();

            var courseCollection = dbGateway.Courses;
            var fullCollection = dbGateway.FullCollection;
            // var newCourse = course;
            Course newCourse = new Course(name, instID);


            courseCollection.InsertOne(newCourse);
            var id = newCourse._id;

            fullCollection.InsertOne(newCourse);
            return id;

        }

        public static string AddCourse(String instID) // add course with only instructor ID passed.
        {
            MongoGateway dbGateway = new MongoGateway();

            var courseCollection = dbGateway.Courses;
            var fullCollection = dbGateway.FullCollection;
            // var newCourse = course;
            Course newCourse = new Course(instID);


            courseCollection.InsertOne(newCourse);
            var id = newCourse._id;

            fullCollection.InsertOne(newCourse);
            return id;

        }

        //public static string AddCourse()
        //{
        //    MongoGateway dbGateway = new MongoGateway();

        //    var courseCollection = dbGateway.Courses;
        //    var fullCollection = dbGateway.FullCollection;
        //    Course newCourse = new Course();


        //    courseCollection.InsertOne(newCourse);
        //    var id = newCourse._id;

        //    var colCourse = new Course
        //    {
        //        _id = id
        //    };

        //    fullCollection.InsertOne(colCourse);
        //    return id;

        //}

        public static List<Course> GetCourses()
        {
            MongoGateway dbGateway = new MongoGateway();
            var collection = dbGateway.Courses;
            var list = collection.Find(_ => true).ToList();
            return list;
        }



        public static Course GetDetailedCourse(String id) //Build course object to return
        { 
            MongoGateway dbGateway = new MongoGateway();
            var collection = dbGateway.FullCollection;
            var courseCollection = dbGateway.Courses;
            var projectCollection = dbGateway.Projects;
            var groupCollection = dbGateway.Groups;
            var userCollection = dbGateway.Users;
            var timeCollection = dbGateway.TimeCards;

            /*
             * Get the full collection (nested arrays with coures information) and create course object
             */

            var colFilter = Builders<Course>.Filter.Eq("_id", id);
            Course fullCourse = collection.Find(colFilter).FirstOrDefault();

            /*
             * Get the seperate single course collection (e.g. professorID) and add detailed course information to COURSE object.
             */
           
            var courseFilter = Builders<Course>.Filter.Eq("_id", id);
            Course course = courseCollection.Find(courseFilter).FirstOrDefault();

            fullCourse.instructorID = course.instructorID;
            fullCourse.isActive = course.isActive;
            fullCourse.name = course.name;



            /*
            * Get Project Collection and add details
            */

            foreach (User users in fullCourse.Users) // Loop through projects list, get project details, fill project list item
            {
                var userIdFilter = Builders<User>.Filter.Eq("_id", users._id);
                User user = userCollection.Find(userIdFilter).FirstOrDefault();
                users.firstName = user.firstName;
                users.lastName = user.lastName;
                users.isActive = user.isActive;
                users.username = user.username;

            }
                /*
                * Get Project Collection and add details
                */

                foreach (Project projects in fullCourse.Projects) // Loop through projects list, get project details, fill project list item
            {
                var projIdFilter = Builders<Project>.Filter.Eq("_id", projects._id);
                Project project = projectCollection.Find(projIdFilter).FirstOrDefault();
                projects.isActive = project.isActive;
                projects.name = project.name;

                    /*
                    * Get group Collection and add dteails
                    */
                    
                    foreach (Group groups in projects.groups) // Loop through groups list, get group details, fill group list item
                    {
                        var groupIdFilter = Builders<Group>.Filter.Eq("_id", groups._id);
                        Group group = groupCollection.Find(groupIdFilter).FirstOrDefault();
                        groups.name = group.name;
                        groups.isActive = group.isActive;

                            /*
                            * Get user Collection and add dteails
                            */
                           
                            foreach (User users in groups.users) // Loop through User list, get User details, fill user list item
                            {
                                var userIdFilter = Builders<User>.Filter.Eq("_id", users._id);
                                User user = userCollection.Find(userIdFilter).FirstOrDefault();
                                users.firstName = user.firstName;
                                users.lastName = user.lastName;
                                users.username = user.username;

                                    /*
                                    * Get timecard Collection and add dteails
                                    */
                                    foreach (TimeCard timecards in users.TimeCards) // Loop through timecard list, get card details, fill card list item
                                    {
                                        var timeIdFilter = Builders<TimeCard>.Filter.Eq("_id", users._id);
                                        TimeCard timecard = timeCollection.Find(timeIdFilter).FirstOrDefault();
                                        timecards.CreatedOn = timecard.CreatedOn;
                                        timecards.hours = timecard.hours;
                                        timecards.timeIn = timecard.timeIn;
                                        timecards.timeOut = timecard.timeOut;
                                        timecards.isEdited = timecard.isEdited;
                                    }

                    }

                }

            }
            return fullCourse;
    
        }

        public static List<Course> GetDetailedCoursesList() //Build course list to return
        {
            MongoGateway dbGateway = new MongoGateway();
            var collection = dbGateway.FullCollection;
            List<Course> fullCourses = collection.Find(_ => true).ToList();
            var courseCollection = dbGateway.Courses;
            var projectCollection = dbGateway.Projects;
            var groupCollection = dbGateway.Groups;
            var userCollection = dbGateway.Users;
            var timeCollection = dbGateway.TimeCards;


            foreach (Course courses in fullCourses) // Loop through courses list, get course details, fill course list item
            {
                var courseFilter = Builders<Course>.Filter.Eq("_id", courses._id);
                Course course = courseCollection.Find(courseFilter).FirstOrDefault();
                courses.instructorID = course.instructorID;
                courses.isActive = course.isActive;
                courses.name = course.name;

                foreach (User users in courses.Users) // Loop through projects list, get project details, fill project list item
                {
                    var userIdFilter = Builders<User>.Filter.Eq("_id", users._id);
                    User user = userCollection.Find(userIdFilter).FirstOrDefault();
                    users.firstName = user.firstName;
                    users.lastName = user.lastName;
                    users.isActive = user.isActive;
                    users.username = user.username;

                }

                /*
                * Get Project Collection and add details
                */

                foreach (Project projects in courses.Projects) // Loop through projects list, get project details, fill project list item
                {
                    var projIdFilter = Builders<Project>.Filter.Eq("_id", projects._id);
                    Project project = projectCollection.Find(projIdFilter).FirstOrDefault();
                    projects.isActive = project.isActive;
                    projects.name = project.name;

                    /*
                    * Get group Collection and add dteails
                    */

                    foreach (Group groups in projects.groups) // Loop through groups list, get group details, fill group list item
                    {
                        var groupIdFilter = Builders<Group>.Filter.Eq("_id", groups._id);
                        Group group = groupCollection.Find(groupIdFilter).FirstOrDefault();
                        groups.name = group.name;
                        groups.isActive = group.isActive;

                        /*
                        * Get user Collection and add dteails
                        */

                        foreach (User users in groups.users) // Loop through User list, get User details, fill user list item
                        {
                            var userIdFilter = Builders<User>.Filter.Eq("_id", users._id);
                            User user = userCollection.Find(userIdFilter).FirstOrDefault();
                            users.firstName = user.firstName;
                            users.lastName = user.lastName;
                            users.username = user.username;

                            /*
                            * Get timecard Collection and add dteails
                            */
                            foreach (TimeCard timecards in users.TimeCards) // Loop through timecard list, get card details, fill card list item
                            {
                                var timeIdFilter = Builders<TimeCard>.Filter.Eq("_id", users._id);
                                TimeCard timecard = timeCollection.Find(timeIdFilter).FirstOrDefault();
                                timecards.CreatedOn = timecard.CreatedOn;
                                timecards.hours = timecard.hours;
                                timecards.timeIn = timecard.timeIn;
                                timecards.timeOut = timecard.timeOut;
                                timecards.isEdited = timecard.isEdited;
                            } // end time

                        }// end users

                    }// end groups

                } // end projets
            }// end courses
            return fullCourses;

        }

        public static void UpdateCourse(Course course)
        {
            MongoGateway dbGateway = new MongoGateway();
            var courseCollection = dbGateway.Courses;

            var filter = Builders<Course>.Filter.Eq("_id", course._id);
            var update = Builders<Course>.Update.Set("name", course.name).Set("isActive", course.isActive).Set("isInstructor", course.instructorID);
            courseCollection.UpdateOne(filter, update);

        }
        #endregion

        #region ProjectRegion

        public static string AddProject(String courseID) // add projet with only a course ID
        {
            MongoGateway dbGateway = new MongoGateway();

            var projectCollection = dbGateway.Projects;
            var collection = dbGateway.FullCollection;


            Project project = new Project();

            projectCollection.InsertOne(project);
            var id = project._id;

           
            var filter = Builders<Course>.Filter.Eq("_id", courseID);
            var update = Builders<Course>.Update.Push("Projects", project);
            collection.UpdateOne(filter, update);

            return id;

        }

        public static string AddProject(String courseID, Project project) // add projeect with course ID and project object
        {
            MongoGateway dbGateway = new MongoGateway();

            var projectCollection = dbGateway.Projects;
            var collection = dbGateway.FullCollection;

            
            projectCollection.InsertOne(project);
            var id = project._id;

            var courseProject = new Project
            {
                _id = id,
            };
            var filter = Builders<Course>.Filter.Eq("_id", courseID);
            var update = Builders<Course>.Update.Push("Projects", courseProject);
            collection.UpdateOne(filter, update);

            return id;

        }

        public static void UpdateProject(Project project)
        {
            MongoGateway dbGateway = new MongoGateway();
            var projectCollection = dbGateway.Projects;

            var filter = Builders<Project>.Filter.Eq("_id", project._id);
            var update = Builders<Project>.Update.Set("name", project.name).Set("isActive", project.isActive).Set("groups", project.groups);
            projectCollection.UpdateOne(filter, update);
   
        }


        public static List<Project> GetCourseProjects(string courseID)
        {

            Course course = GetDetailedCourse(courseID);
            List<Project> courseProjects = new List<Project>(); ;

            foreach (Project project in course.Projects)
            {
                courseProjects.Add(project);
            }

             return courseProjects;
        }

        public static Project GetProject(string projectID)
        {

            //Project project = GetDetailedCourse(projectID);
            //Project courseProject = new List<Project>();

            MongoGateway dbGateway = new MongoGateway();

            var filter = Builders<Project>.Filter.Eq("_id", projectID);

            Project project = dbGateway.Projects.Find(filter).FirstOrDefault();

            return project;
        }




        public static void GetUserProjectsList(String userID)
        {
            List<Course> courses = GetDetailedCoursesList();
            List<Project> usersProjects = new List<Project>(); 

            foreach (Course course in courses)
            {
                foreach (Project project in course.Projects)
                {
                    foreach (Group group in project.groups)
                    {
                        foreach (User user in group.users)
                        {
                            if (user._id == userID)
                            {
                                usersProjects.Add(project);
                                break;
                            }

                        }
                    }
                }
            }
        }
        #endregion
    }
}
// Insert Course
// Get Courses
// 


// Insert Project
// Get Projects of Course
// Update Projects





