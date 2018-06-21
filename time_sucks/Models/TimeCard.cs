using System;

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
        public string desc { get; set; }
    }
}
