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
        public int timeID { get; set; }
        public int hours { get; set; }
        public DateTime timeIn { get; set; }
        public DateTime timeOut { get; set; }
        public bool isEdited { get; set; }
        public DateTime CreatedOn { get; set; }
    }
}
