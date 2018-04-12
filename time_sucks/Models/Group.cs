using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace time_sucks.Models
{
    public class Group
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string _id { get; set; }

        public string name { get; set; }

        public bool isActive { get; set; }

       public List<User> users { get; set; }

        //public int projectID { get; set; }
    }
}
