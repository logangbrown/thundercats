using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Driver;
using MongoDB.Bson;
using MongoDB.Driver.Linq;
using MongoDB.Bson.Serialization;
using System.Security.Authentication;

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

                //var client = new MongoClient();
                //_database = client.GetDatabase("ProjectManagement");

                string connectionString = @"mongodb://badass:mWIhFC1OjRSOldacJyIoha1WSL8SSrGFwTM18nzKRw6zBy3G0jbY5oySJMm26M8ZNKUG8WwaRbjrZDANOBRppA==@badass.documents.azure.com:10255/?ssl=true&replicaSet=globaldb";
                MongoClientSettings settings = MongoClientSettings.FromUrl( new MongoUrl(connectionString) );
                settings.SslSettings = new SslSettings() { EnabledSslProtocols = SslProtocols.Tls12 };
                var mongoClient = new MongoClient(settings);

                _database = mongoClient.GetDatabase("ProjectManagement"); // NEW

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



