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

        public static User GetUser(string userName)
        {
            MongoGateway dbGateway = new MongoGateway();

            var filter = Builders<User>.Filter.Eq("UserName", userName);

            User user = dbGateway.Users.Find(filter).FirstOrDefault();

            return user;
            
        }


        public static void AddUser(User user)
        {
            MongoGateway dbGateway = new MongoGateway();
            var userCollection = dbGateway.Users;

            //var document = new BsonDocument
            //{
            //    { "UserName", "MongoDB" },
            //    { "PW", "password" },
            //    { "First", "Mongo"  },
            //    { "Last", "Database" },
            //    { "IsProf", true }
            //};

            //var newUser = new User
            //{
            //    UserName = user.UserName,
            //    FirstName = user.FirstName,
            //    LastName = user.LastName,
            //    Password = user.Password,
            //    IsInstructor = user.IsInstructor
            //};
            userCollection.InsertOne(user);
           // var id = newUser._id;

        }
        #endregion


        #region CourseRequests
        public static void AddCourse(Course course)
        {
            MongoGateway dbGateway = new MongoGateway();

            var courseCollection = dbGateway.Courses;
            var fullCollection = dbGateway.FullCollection;
            var newCourse = course;
 
            courseCollection.InsertOne(newCourse);
            var id = newCourse._id;

            var colCourse = new Course
            {
                _id = id
            };

            fullCollection.InsertOne(colCourse);

        }

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

            fullCourse.InstructorID = course.InstructorID;
            fullCourse.IsActive = course.IsActive;
            fullCourse.Name = course.Name;


            /*
            * Get Project Collection and add details
            */
           
            foreach (Project projects in fullCourse.Projects) // Loop through projects list, get project details, fill project list item
            {
                var projIdFilter = Builders<Project>.Filter.Eq("_id", projects._id);
                Project project = projectCollection.Find(projIdFilter).FirstOrDefault();
                projects.IsActive = project.IsActive;
                projects.Name = project.Name;

                    /*
                    * Get group Collection and add dteails
                    */
                    
                    foreach (Group groups in projects.Groups) // Loop through groups list, get group details, fill group list item
                    {
                        var groupIdFilter = Builders<Group>.Filter.Eq("_id", groups._id);
                        Group group = groupCollection.Find(groupIdFilter).FirstOrDefault();
                        groups.Name = group.Name;
                        groups.IsActive = group.IsActive;

                            /*
                            * Get user Collection and add dteails
                            */
                           
                            foreach (User users in groups.Users) // Loop through User list, get User details, fill user list item
                            {
                                var userIdFilter = Builders<User>.Filter.Eq("_id", users._id);
                                User user = userCollection.Find(userIdFilter).FirstOrDefault();
                                users.FirstName = user.FirstName;
                                users.LastName = user.LastName;
                                users.UserName = user.UserName;

                                    /*
                                    * Get timecard Collection and add dteails
                                    */
                                    foreach (TimeCard timecards in users.TimeCards) // Loop through timecard list, get card details, fill card list item
                                    {
                                        var timeIdFilter = Builders<TimeCard>.Filter.Eq("_id", users._id);
                                        TimeCard timecard = timeCollection.Find(timeIdFilter).FirstOrDefault();
                                        timecards.CreatedOn = timecard.CreatedOn;
                                        timecards.Hours = timecard.Hours;
                                        timecards.In = timecard.In;
                                        timecards.Out = timecard.Out;
                                        timecards.IsEdited = timecard.IsEdited;
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
                courses.InstructorID = course.InstructorID;
                courses.IsActive = course.IsActive;
                courses.Name = course.Name;

                /*
                * Get Project Collection and add details
                */

                foreach (Project projects in courses.Projects) // Loop through projects list, get project details, fill project list item
                {
                    var projIdFilter = Builders<Project>.Filter.Eq("_id", projects._id);
                    Project project = projectCollection.Find(projIdFilter).FirstOrDefault();
                    projects.IsActive = project.IsActive;
                    projects.Name = project.Name;

                    /*
                    * Get group Collection and add dteails
                    */

                    foreach (Group groups in projects.Groups) // Loop through groups list, get group details, fill group list item
                    {
                        var groupIdFilter = Builders<Group>.Filter.Eq("_id", groups._id);
                        Group group = groupCollection.Find(groupIdFilter).FirstOrDefault();
                        groups.Name = group.Name;
                        groups.IsActive = group.IsActive;

                        /*
                        * Get user Collection and add dteails
                        */

                        foreach (User users in groups.Users) // Loop through User list, get User details, fill user list item
                        {
                            var userIdFilter = Builders<User>.Filter.Eq("_id", users._id);
                            User user = userCollection.Find(userIdFilter).FirstOrDefault();
                            users.FirstName = user.FirstName;
                            users.LastName = user.LastName;
                            users.UserName = user.UserName;

                            /*
                            * Get timecard Collection and add dteails
                            */
                            foreach (TimeCard timecards in users.TimeCards) // Loop through timecard list, get card details, fill card list item
                            {
                                var timeIdFilter = Builders<TimeCard>.Filter.Eq("_id", users._id);
                                TimeCard timecard = timeCollection.Find(timeIdFilter).FirstOrDefault();
                                timecards.CreatedOn = timecard.CreatedOn;
                                timecards.Hours = timecard.Hours;
                                timecards.In = timecard.In;
                                timecards.Out = timecard.Out;
                                timecards.IsEdited = timecard.IsEdited;
                            } // end time

                        }// end users

                    }// end groups

                } // end projets
            }// end courses
            return fullCourses;

        }
        #endregion

        public static void AddProject(String courseID, Project project)
        {
            MongoGateway dbGateway = new MongoGateway();

            var projectCollection = dbGateway.Projects;


            var newProject = new Project
            {
                Name = project.Name,
                IsActive = project.IsActive

            };
            projectCollection.InsertOne(newProject);
            var id = newProject._id;

       

            var courseProject = new Project
            {
                _id = id,
            };
            var collection = dbGateway.FullCollection;


            var filter = Builders<Course>.Filter.Eq("_id", courseID);
            var update = Builders<Course>.Update.Push("Projects", courseProject);
            collection.UpdateOne(filter, update);

        }

        public static void GetUserProjectsList(String userID)
        {
            List<Course> courses = GetDetailedCoursesList();
            List<Project> usersProjects = new List<Project>(); ;

            foreach(Course course in courses)
            {
                foreach (Project project in course.Projects)
                {
                    foreach (Group group in project.Groups)
                    {
                        foreach (User user in group.Users)
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

    }
}
