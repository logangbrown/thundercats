using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace time_sucks.Models
{
    public class CourseUser
    {
        public int UserID { get; set; }
        public int CourseID { get; set; }
        public bool IsActive { get; set; }
    }
}
