using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace time_sucks.Models
{
    public class TimeCard
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public int TimeID { get; set; }
        public int Hours { get; set; }
        public DateTime In { get; set; }
        public DateTime Out { get; set; }
        public bool IsEdited { get; set; }
        public DateTime CreatedOn { get; set; }
    }
}
