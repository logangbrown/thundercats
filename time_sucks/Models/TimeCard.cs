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
        public int timeslotID { get; set; }
        public double hours { get; set; }
        public DateTime timeIn { get; set; }
        public DateTime timeOut { get; set; }
        public bool isEdited { get; set; }
        public DateTime createdOn { get; set; }
        public int userID { get; set; }
        public int groupID { get; set; }
    }
}
