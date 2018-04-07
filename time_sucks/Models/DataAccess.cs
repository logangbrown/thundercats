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

        public static List<User> GetUserList()
        {
            MongoGateway dbGateway = new MongoGateway();
            //var document = new BsonDocument
            //{
            //    { "UserName", "MongoDB" },
            //    { "PW", "password" },
            //    { "First", "Mongo"  },
            //    { "Last", "Database" },
            //    { "IsProf", true }
            //};
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

            //User user = dbGateway.Users.Find(filter).ToJson<User>();
            // collection.InsertOne(document);
            //var list = userCollection.Find(_ => true).ToList();
            
        }

        //public static string GetUserjson() // Returns users as json string
        //{
        //    MongoGateway dbGateway = new MongoGateway();

        //    var collection = dbGateway.Users;

        //    var list = collection.Find(_ => true).ToList();

        //    return Newtonsoft.Json.JsonConvert.SerializeObject(list);
        //}

        public static void AddUser(User user)
        {
            MongoGateway dbGateway = new MongoGateway();
            var userCollection = dbGateway.Users;

            //var document = new BsonDocument
            //{
            //    { "UserName", "MongoDB" },
            //    { "Password", "password" },
            //    { "FirstName", "Mongo"  },
            //    { "LastName", "Database" },
            //    { "IsInstructor", true }
            //};

            // collection.InsertOne(document);

            var newUser = new User
            {
                UserName = user.UserName,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Password = user.Password,
                IsInstructor = user.IsInstructor
            };
            userCollection.InsertOne(newUser);
            var id = newUser._id;

        }

        public static void AddCourse(Course course)
        {
            MongoGateway dbGateway = new MongoGateway();

            var courseCollection = dbGateway.Courses;
            var fullCollection = dbGateway.CollectionOfCourses;

            var newCourse = new Course
            {
                InstructorID = course.InstructorID,
                IsActive = course.IsActive,
                Name = course.Name
            };
            courseCollection.InsertOne(newCourse);
            var id = newCourse._id;

            var colCourse = new Course
            {
                _id = id
            };

            fullCollection.InsertOne(colCourse);

        }

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
            var collection = dbGateway.CollectionOfCourses;

            //var filter = Builders<BsonDocument>.Filter.Eq("_id", courseID);
            //var update = Builders<BsonDocument>.Update.Push("Projects", courseProject);
            var filter = Builders<Course>.Filter.Eq("_id", courseID);
            var update = Builders<Course>.Update.Push("Projects", courseProject);
            collection.UpdateOne(filter, update);

                //var filter = Builders<myObject>
                // .Filter.Eq(e => e.Name, "name");

                //var update = Builders<myObject>.Update
                //        .Push<String>(e => e.MyArray, myArrayField);

                //await collection.FindOneAndUpdateAsync(filter, update);

                //MyCollection.Update(Query.EQ("_id", MyObject.Id),
                //        Update.PushWrapped("MyArray", myArrayField)
        }

    }
}
