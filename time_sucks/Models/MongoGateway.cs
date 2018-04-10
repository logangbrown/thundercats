using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Driver;
using MongoDB.Bson;
using MongoDB.Driver.Linq;
using MongoDB.Bson.Serialization;

namespace time_sucks.Models
{
    public class MongoGateway
    {


        //  public static string ConnectionString { get; set; }
        //public static string DatabaseName { get; set; }
        // public static bool IsSSL { get; set; }

        private IMongoDatabase _database { get; }

        public MongoGateway()
        {
            try
            {

                var client = new MongoClient();
                _database = client.GetDatabase("ProjectManagement");
                //MongoClientSettings settings = MongoClientSettings.FromUrl(new MongoUrl(ConnectionString));
                //if (IsSSL) // SSL connection to hosted db
                //{
                //    settings.SslSettings = new SslSettings { EnabledSslProtocols = System.Security.Authentication.SslProtocols.Tls12 };
                //}

                //var mongoClient = new MongoClient(settings);
                //_database = mongoClient.GetDatabase(DatabaseName);

                ////MongoClient client = new MongoClient(ConnectionString);
                ////MongoServerAddress server = client.GetServer();
                ////MongoDatabase database = server.GetDatabase("Test");
                ////MongoCollection symbolcollection = database.GetCollection<Symbol>("Symbols");


                // ConnectionString = "mongodb://localhost";
                //BsonClassMap.RegisterClassMap<User>();

                // _database = client.GetDatabase(DatabaseName);
                //var database = client.GetDatabase("timetables");
                //var collection = database.GetCollection<User>("User");
                //List<User> userList = collection.Find(_ => true).ToList();

            }
            catch (Exception ex)
            {
                throw new Exception("Can not access to db server.", ex);
            }
        }
        //<BsonDocument>
        public IMongoCollection<User> Users
        {
            get
            {
                return _database.GetCollection<User>("Users");
            }
        }

        public IMongoCollection<Course> Courses
        {
            get
            {
                return _database.GetCollection<Course>("Courses");
            }
        }

        public IMongoCollection<Course> FullCollection
        {
            get
            {
                return _database.GetCollection<Course>("Collection");
            }
        }



        public IMongoCollection<Project> Projects
        {
            get
            {
                return _database.GetCollection<Project>("Projects");
            }
        }


        public IMongoCollection<Group> Groups
        {
            get
            {
                return _database.GetCollection<Group>("Groups");
            }
        }

        public IMongoCollection<TimeCard> TimeCards
        {
            get
            {
                return _database.GetCollection<TimeCard>("TimeCards");
            }
        }

    }

}



