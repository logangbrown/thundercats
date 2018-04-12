using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace time_sucks.Models
{
    public class CourseUser
    {
        public int userID { get; set; }
        public int courseID { get; set; }
        public bool isActive { get; set; }
    }
}
