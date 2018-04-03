using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace time_sucks.Models
{
    public class Time
    {
        public int TimeID { get; set; }
        public int UserID { get; set; }
        public int GroupID { get; set; }
        public int Hours { get; set; }
        public DateTime In { get; set; }
        public DateTime Out { get; set; }
        public bool IsEdited { get; set; }
        public DateTime CreatedOn { get; set; }


        
    }
}
